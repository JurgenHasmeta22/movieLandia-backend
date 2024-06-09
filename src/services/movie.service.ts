import { Movie, Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../config/prisma.config';

interface MovieServiceParams {
    sortBy: string;
    ascOrDesc: 'asc' | 'desc';
    perPage: number;
    page: number;
    title?: string | null;
    filterValue?: number | string;
    filterNameString?: string | null;
    filterOperatorString?: '>' | '=' | '<' | 'gt' | 'equals' | 'lt';
}

class MovieService {
    private prisma: PrismaClient;

    constructor(prismaInstance: typeof prisma) {
        this.prisma = prismaInstance;
    }

    // #region "Helpers methods"
    private constructFilters({
        title,
        filterValue,
        filterNameString,
        filterOperatorString,
    }: MovieServiceParams): Prisma.MovieWhereInput {
        const filters: any = {};

        if (title) filters.title = { contains: title };

        if (filterValue !== undefined && filterNameString && filterOperatorString) {
            const operator = filterOperatorString === '>' ? 'gt' : filterOperatorString === '<' ? 'lt' : 'equals';
            filters[filterNameString] = { [operator]: filterValue };
        }

        return filters;
    }

    private constructPagination({ perPage, page }: MovieServiceParams): { skip: number; take: number } {
        const skip = perPage ? (page ? (page - 1) * perPage : 0) : page ? (page - 1) * 10 : 0;
        const take = perPage || 10;
        return { skip, take };
    }

    private constructOrderBy(sortBy: string, ascOrDesc: 'asc' | 'desc'): Prisma.MovieOrderByWithRelationInput {
        const orderBy: any = {};

        if (sortBy && ascOrDesc) {
            orderBy[sortBy] = ascOrDesc;
        }

        return orderBy;
    }

    private async getMovieRatings(
        movieIds: number[],
    ): Promise<Record<number, { averageRating: number; totalReviews: number }>> {
        const movieRatings = await this.prisma.movieReview.groupBy({
            by: ['movieId'],
            where: { movieId: { in: movieIds } },
            _avg: {
                rating: true,
            },
            _count: {
                rating: true,
            },
        });

        return movieRatings.reduce(
            (map, rating) => {
                map[rating.movieId] = {
                    averageRating: rating._avg.rating || 0,
                    totalReviews: rating._count.rating,
                };
                return map;
            },
            {} as Record<number, { averageRating: number; totalReviews: number }>,
        );
    }

    private mapMovieWithRatings(
        movie: any,
        ratingsMap: Record<number, { averageRating: number; totalReviews: number }>,
    ) {
        const { genres, ...properties } = movie;
        const simplifiedGenres = genres.map((genre: any) => genre.genre);
        const ratingsInfo = ratingsMap[movie.id] || { averageRating: 0, totalReviews: 0 };
        return { ...properties, genres: simplifiedGenres, ...ratingsInfo };
    }
    // #endregion

    // #region "Service methods"
    /**
     * Get a list of movies with optional filters, sorting, and pagination.
     * @param params - Parameters for filtering, sorting, and pagination.
     * @returns A list of movies with their genres and ratings.
     */
    public async getMovies(params: MovieServiceParams): Promise<{ movies: any[]; count: number } | null> {
        try {
            const filters = this.constructFilters(params);
            const { skip, take } = this.constructPagination(params);
            const orderBy = this.constructOrderBy(params.sortBy, params.ascOrDesc);

            const moviesWithGenres = await this.prisma.movie.findMany({
                where: filters,
                include: { genres: { select: { genre: true } } },
                orderBy,
                skip,
                take,
            });

            const movieRatings = await this.getMovieRatings(moviesWithGenres.map((movie) => movie.id));

            const movies = moviesWithGenres.map((movie) => this.mapMovieWithRatings(movie, movieRatings));
            const moviesCount = await this.prisma.movie.count();

            return { movies, count: moviesCount };
        } catch (error) {
            console.error('Error fetching movies:', error);
            return null;
        }
    }

    public async getMovieById(movieId: number): Promise<Movie | null> {
        try {
            const result = await this.prisma.movie.findFirst({
                where: { id: movieId },
                include: { genres: { select: { genre: true } }, cast: { select: { actor: true } } },
            });

            return result || null;
        } catch (error) {
            console.error('Error fetching movie by ID:', error);
            return null;
        }
    }

    public async getMovieByTitle(title: string, queryParams: any): Promise<Movie | any | null> {
        try {
            const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage, userId } = queryParams;
            const skip = page ? (page - 1) * 5 : 0;
            const take = 5;
            const orderBy = this.constructOrderBy(sortBy || 'createdAt', ascOrDesc || 'desc');

            const movie: any = await this.prisma.movie.findFirst({
                where: { title },
                include: {
                    genres: { select: { genre: true } },
                    reviews: {
                        include: {
                            user: true,
                            upvotes: {
                                take: upvotesPage ? upvotesPage * 5 : 5,
                                select: { user: true },
                            },
                            downvotes: {
                                take: downvotesPage ? downvotesPage * 5 : 5,
                                select: { user: true },
                            },
                            _count: {
                                select: {
                                    upvotes: true,
                                    downvotes: true,
                                },
                            },
                        },
                        orderBy,
                        skip,
                        take,
                    },
                },
            });

            if (!movie) return null;

            const totalReviews = await this.prisma.movieReview.count({
                where: { movieId: movie.id },
            });

            const ratings = await this.prisma.movieReview.findMany({
                where: { movieId: movie.id },
                select: { rating: true },
            });

            const totalRating = ratings.reduce((sum, review) => sum + review?.rating!, 0);
            const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

            let isBookmarked = false;
            let isReviewed = false;

            if (userId) {
                for (const review of movie.reviews) {
                    const existingUpvote = await this.prisma.upvoteMovie.findFirst({
                        where: {
                            AND: [{ userId }, { movieId: movie.id }, { movieReviewId: review.id }],
                        },
                    });

                    const existingDownvote = await this.prisma.downvoteMovie.findFirst({
                        where: {
                            AND: [{ userId }, { movieId: movie.id }, { movieReviewId: review.id }],
                        },
                    });

                    review.isUpvoted = !!existingUpvote;
                    review.isDownvoted = !!existingDownvote;
                }

                const existingFavorite = await this.prisma.userMovieFavorite.findFirst({
                    where: {
                        AND: [{ userId }, { movieId: movie.id }],
                    },
                });
                isBookmarked = !!existingFavorite;

                const existingReview = await this.prisma.movieReview.findFirst({
                    where: {
                        AND: [{ userId }, { movieId: movie.id }],
                    },
                });
                isReviewed = !!existingReview;
            }

            return {
                ...movie,
                averageRating,
                totalReviews,
                ...(userId && { isBookmarked, isReviewed }),
            };
        } catch (error) {
            console.error('Error fetching movie by title:', error);
            return null;
        }
    }

    public async getLatestMovies(): Promise<Movie[] | null> {
        try {
            const moviesWithGenres = await this.prisma.movie.findMany({
                orderBy: {
                    releaseYear: 'desc',
                },
                take: 10,
                include: { genres: { select: { genre: true } } },
            });

            const movieRatings = await this.getMovieRatings(moviesWithGenres.map((movie) => movie.id));

            const movies = moviesWithGenres.map((movie) => this.mapMovieWithRatings(movie, movieRatings));

            return movies || null;
        } catch (error) {
            console.error('Error fetching latest movies:', error);
            return null;
        }
    }

    public async getRelatedMovies(title: string): Promise<Movie[] | null> {
        try {
            const movie = await this.prisma.movie.findFirst({
                where: { title },
            });

            if (!movie) return null;

            const movieGenres = await this.prisma.movieGenre.findMany({
                where: { movieId: movie.id },
                select: { genreId: true },
            });

            if (!movieGenres.length) return null;

            const genreIds = movieGenres.map((mg) => mg.genreId);
            const relatedMovieIdsByGenre = await this.prisma.movieGenre.findMany({
                where: {
                    genreId: { in: genreIds },
                    movieId: { not: movie.id },
                },
                distinct: ['movieId'],
                select: { movieId: true },
            });

            if (!relatedMovieIdsByGenre.length) return null;

            const relatedMovieIds = relatedMovieIdsByGenre.map((rm) => rm.movieId);
            const relatedMovies = await this.prisma.movie.findMany({
                where: { id: { in: relatedMovieIds } },
                include: { genres: { select: { genre: true } } },
            });

            const movieRatings = await this.getMovieRatings(relatedMovieIds);
            const movies = relatedMovies.map((relatedMovie) => this.mapMovieWithRatings(relatedMovie, movieRatings));

            return movies.length > 0 ? movies : null;
        } catch (error) {
            console.error('Error fetching related movies:', error);
            return null;
        }
    }

    public async updateMovieById(movieParam: Prisma.MovieUpdateInput, id: string): Promise<Movie | null> {
        try {
            const movie = await this.prisma.movie.findUnique({
                where: { id: Number(id) },
            });

            if (!movie) return null;

            const movieUpdated = await this.prisma.movie.update({
                where: { id: Number(id) },
                data: movieParam,
                include: { genres: { select: { genre: true } }, cast: { select: { actor: true } } },
            });

            return movieUpdated || null;
        } catch (error) {
            console.error('Error updating movie:', error);
            return null;
        }
    }

    public async addMovie(movieParam: Prisma.MovieCreateInput): Promise<Movie | null> {
        try {
            const movieCreated = await this.prisma.movie.create({
                data: movieParam,
                include: { genres: { select: { genre: true } }, cast: { select: { actor: true } } },
            });

            return movieCreated || null;
        } catch (error) {
            console.error('Error adding movie:', error);
            return null;
        }
    }

    public async deleteMovieById(id: number): Promise<string | null> {
        try {
            const movie = await this.prisma.movie.findUnique({
                where: { id },
            });

            if (!movie) return null;

            const result = await this.prisma.movie.delete({
                where: { id },
            });

            return result ? 'Movie deleted successfully' : null;
        } catch (error) {
            console.error('Error deleting movie:', error);
            return null;
        }
    }

    public async searchMoviesByTitle(
        title: string,
        queryParams: any,
    ): Promise<{ movies: any[]; count: number } | null> {
        try {
            const { page, ascOrDesc, sortBy } = queryParams;
            const orderBy = this.constructOrderBy(sortBy, ascOrDesc);

            const movies = await this.prisma.movie.findMany({
                where: {
                    title: { contains: title },
                },
                include: { genres: { select: { genre: true } } },
                orderBy,
                skip: page ? (page - 1) * 10 : 0,
                take: 10,
            });

            const movieRatings = await this.getMovieRatings(movies.map((movie) => movie.id));
            const moviesFinal = movies.map((movie) => this.mapMovieWithRatings(movie, movieRatings));

            const count = await this.prisma.movie.count({
                where: {
                    title: { contains: title },
                },
            });

            return { movies: moviesFinal, count };
        } catch (error) {
            console.error('Error searching movies by title:', error);
            return null;
        }
    }
    // #endregion
}

export default new MovieService(prisma);
