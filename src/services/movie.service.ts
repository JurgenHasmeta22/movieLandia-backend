import { Movie, Prisma, PrismaClient } from '@prisma/client';
import { prisma } from '../app';

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

    public async getMovies({
        sortBy,
        ascOrDesc,
        perPage,
        page,
        title,
        filterValue,
        filterNameString,
        filterOperatorString,
    }: MovieServiceParams): Promise<any | null> {
        const filters: any = {};
        const skip = perPage ? (page ? (page - 1) * perPage : 0) : page ? (page - 1) * 10 : 0;
        const take = perPage || 10;

        if (title) filters.title = { contains: title };

        if (filterValue !== undefined && filterNameString && filterOperatorString) {
            const operator = filterOperatorString === '>' ? 'gt' : filterOperatorString === '<' ? 'lt' : 'equals';
            filters[filterNameString] = { [operator]: filterValue };
        }

        const orderByObject: any = {};

        if (sortBy && ascOrDesc) {
            orderByObject[sortBy] = ascOrDesc;
        }

        const moviesWithGenres = await this.prisma.movie.findMany({
            where: filters,
            include: { genres: { select: { genre: true } } },
            orderBy: orderByObject,
            skip,
            take,
        });

        const movieIds = moviesWithGenres.map((movie: Movie) => movie.id);

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

        type RatingsMap = {
            [key: number]: {
                averageRating: number;
                totalReviews: number;
            };
        };

        const movieRatingsMap: RatingsMap = movieRatings.reduce((map, rating) => {
            map[rating.movieId] = {
                averageRating: rating._avg.rating || 0,
                totalReviews: rating._count.rating,
            };

            return map;
        }, {} as RatingsMap);

        const movies = moviesWithGenres.map((movie) => {
            const { genres, ...properties } = movie;
            const simplifiedGenres = genres.map((genre) => genre.genre);
            const ratingsInfo = movieRatingsMap[movie.id] || { averageRating: 0, totalReviews: 0 };

            return { ...properties, genres: simplifiedGenres, ...ratingsInfo };
        });

        const moviesCount = await this.prisma.movie.count();

        if (movies) {
            return { movies, count: moviesCount };
        } else {
            return null;
        }
    }

    public async getMovieById(movieId: number): Promise<Movie | null> {
        const result = await this.prisma.movie.findFirst({
            where: { id: movieId },
            include: { genres: { select: { genre: true } }, cast: { select: { actor: true } } },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async getMovieByTitle(title: string, queryParams: any): Promise<Movie | any | null> {
        const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage, userId } = queryParams;
        const skip = page ? (page - 1) * 5 : 0;
        const take = 5;
        const orderByObject: any = {};

        if (sortBy && ascOrDesc) {
            orderByObject[sortBy] = ascOrDesc;
        } else {
            orderByObject['createdAt'] = 'desc';
        }

        const movie = await this.prisma.movie.findFirst({
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
                    orderBy: orderByObject,
                    skip: skip,
                    take: take,
                },
            },
        });

        if (movie) {
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

                    // @ts-ignore
                    review.isUpvoted = !!existingUpvote;
                    // @ts-ignore
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
        } else {
            return null;
        }
    }

    public async getLatestMovies(): Promise<Movie[] | null> {
        const moviesWithGenres = await this.prisma.movie.findMany({
            orderBy: {
                releaseYear: 'desc',
            },
            take: 10,
            include: { genres: { select: { genre: true } } },
        });

        const movieIds = moviesWithGenres.map((movie) => movie.id);

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

        type RatingsMap = {
            [key: number]: {
                averageRating: number;
                totalReviews: number;
            };
        };

        const movieRatingsMap: RatingsMap = movieRatings.reduce((map, rating) => {
            map[rating.movieId] = {
                averageRating: rating._avg.rating || 0,
                totalReviews: rating._count.rating,
            };

            return map;
        }, {} as RatingsMap);

        const movies = moviesWithGenres.map((movie) => {
            const { genres, ...properties } = movie;
            const simplifiedGenres = genres.map((genre) => genre.genre);
            const ratingsInfo = movieRatingsMap[movie.id] || { averageRating: 0, totalReviews: 0 };

            return { ...properties, genres: simplifiedGenres, ...ratingsInfo };
        });

        if (movies) {
            return movies;
        } else {
            return null;
        }
    }

    public async getRelatedMovies(title: string): Promise<Movie[] | null> {
        const movie = await this.prisma.movie.findFirst({
            where: { title },
        });

        const movieGenres = await this.prisma.movieGenre.findMany({
            where: { movieId: movie?.id },
            select: { genreId: true },
        });

        if (!movieGenres.length) {
            return null;
        }

        const genreIds = movieGenres.map((mg) => mg.genreId);
        const relatedMovieIdsByGenre = await this.prisma.movieGenre.findMany({
            where: {
                genreId: { in: genreIds },
                movieId: { not: movie?.id },
            },
            distinct: ['movieId'],
            select: { movieId: true },
        });

        const relatedMovieIds = relatedMovieIdsByGenre.map((rm) => rm.movieId);

        if (!relatedMovieIds.length) {
            return null;
        }

        const relatedMovies = await this.prisma.movie.findMany({
            where: { id: { in: relatedMovieIds } },
            include: { genres: { select: { genre: true } } },
        });

        const movieRatings = await this.prisma.movieReview.groupBy({
            by: ['movieId'],
            where: { movieId: { in: relatedMovieIds } },
            _avg: { rating: true },
            _count: { rating: true },
        });

        const ratingsMap = movieRatings.reduce(
            (acc, rating) => {
                acc[rating.movieId] = {
                    averageRating: rating._avg.rating || 0,
                    totalReviews: rating._count.rating,
                };

                return acc;
            },
            {} as { [key: number]: { averageRating: number; totalReviews: number } },
        );

        const movies = relatedMovies.map((relatedMovie) => {
            const { genres, ...movieDetails } = relatedMovie;
            const simplifiedGenres = genres.map((genre) => genre.genre);
            const ratingsInfo = ratingsMap[relatedMovie.id] || { averageRating: 0, totalReviews: 0 };

            return { ...movieDetails, genres: simplifiedGenres, ...ratingsInfo };
        });

        return movies.length > 0 ? movies : null;
    }

    public async updateMovieById(movieParam: Prisma.MovieUpdateInput, id: string): Promise<Movie | null> {
        const movie: Movie | null = await this.prisma.movie.findUnique({
            where: { id: Number(id) },
        });

        if (movie) {
            const movieUpdated = await this.prisma.movie.update({
                where: { id: Number(id) },
                data: movieParam,
                include: { genres: { select: { genre: true } }, cast: { select: { actor: true } } },
            });

            if (movieUpdated) {
                return movieUpdated;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async addMovie(movieParam: Prisma.MovieCreateInput): Promise<Movie | null> {
        const movieCreated = await this.prisma.movie.create({
            data: movieParam,
            include: { genres: { select: { genre: true } }, cast: { select: { actor: true } } },
        });

        if (movieCreated) {
            return movieCreated;
        } else {
            return null;
        }
    }

    public async deleteMovieById(id: number): Promise<string | null> {
        const movie: Movie | null = await this.prisma.movie.findUnique({
            where: { id },
        });

        if (movie) {
            const result = await this.prisma.movie.delete({
                where: { id },
            });

            if (result) {
                return 'Movie deleted successfully';
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async searchMoviesByTitle(title: string, queryParams: any): Promise<any | null> {
        const { page, ascOrDesc, sortBy } = queryParams;
        const orderByObject: any = {};

        if (sortBy && ascOrDesc) {
            orderByObject[sortBy] = ascOrDesc;
        }

        const query = {
            where: {
                title: { contains: title },
            },
            include: { genres: { select: { genre: true } } },
            orderBy: orderByObject,
            skip: page ? (page - 1) * 10 : 0,
            take: 10,
        };

        const movies = await this.prisma.movie.findMany(query);
        const movieIds = movies.map((movie: Movie) => movie.id);

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

        type RatingsMap = {
            [key: number]: {
                averageRating: number;
                totalReviews: number;
            };
        };

        const movieRatingsMap: RatingsMap = movieRatings.reduce((map, rating) => {
            map[rating.movieId] = {
                averageRating: rating._avg.rating || 0,
                totalReviews: rating._count.rating,
            };

            return map;
        }, {} as RatingsMap);

        const moviesFinal = movies.map((movie: any) => {
            const { genres, ...properties } = movie;
            const simplifiedGenres = genres.map((genre: any) => genre.genre);
            const ratingsInfo = movieRatingsMap[movie.id] || { averageRating: 0, totalReviews: 0 };

            return { ...properties, genres: simplifiedGenres, ...ratingsInfo };
        });
        const count = await this.prisma.movie.count({
            where: {
                title: { contains: title },
            },
        });

        if (movies) {
            return { movies: moviesFinal, count };
        } else {
            return null;
        }
    }
}

export default new MovieService(prisma);
