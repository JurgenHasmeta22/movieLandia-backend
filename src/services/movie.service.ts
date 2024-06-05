import { Movie, Prisma } from '@prisma/client';
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

const movieService = {
    async getMovies({
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

        const moviesWithGenres = await prisma.movie.findMany({
            where: filters,
            include: { genres: { select: { genre: true } } },
            orderBy: orderByObject,
            skip,
            take,
        });

        const movies = moviesWithGenres.map((movie) => {
            const { genres, ...properties } = movie;
            const simplifiedGenres = genres.map((genre) => genre.genre);
            return { ...properties, genres: simplifiedGenres };
        });

        const moviesCount = await prisma.movie.count();

        if (movies) {
            return { movies, count: moviesCount };
        } else {
            return null;
        }
    },
    async getMovieById(movieId: number): Promise<Movie | null> {
        const result = await prisma.movie.findFirst({
            where: { id: movieId },
            include: { genres: { select: { genre: true } }, cast: { select: { actor: true } } },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },
    async getMovieByTitle(title: string, queryParams: any): Promise<Movie | any | null> {
        const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage, userId } = queryParams;
        const skip = page ? (page - 1) * 5 : 0;
        const take = 5;
        const orderByObject: any = {};

        if (sortBy && ascOrDesc) {
            orderByObject[sortBy] = ascOrDesc;
        } else {
            orderByObject['createdAt'] = 'desc';
        }

        const movie = await prisma.movie.findFirst({
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
            const totalReviews = await prisma.movieReview.count({
                where: { movieId: movie.id },
            });

            const ratings = await prisma.movieReview.findMany({
                where: { movieId: movie.id },
                select: { rating: true },
            });

            const totalRating = ratings.reduce((sum, review) => sum + review?.rating!, 0);
            const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;

            if (userId) {
                for (const review of movie.reviews) {
                    const existingUpvote = await prisma.upvoteMovie.findFirst({
                        where: {
                            AND: [{ userId }, { movieId: movie.id }, { movieReviewId: review.id }],
                        },
                    });

                    const existingDownvote = await prisma.downvoteMovie.findFirst({
                        where: {
                            AND: [{ userId }, { movieId: movie.id }, { movieReviewId: review.id }],
                        },
                    });

                    // @ts-ignore
                    review.isUpvoted = !!existingUpvote;
                    // @ts-ignore
                    review.isDownvoted = !!existingDownvote;
                }
            }

            return {
                ...movie,
                averageRating,
                totalReviews,
            };
        } else {
            return null;
        }
    },
    async getLatestMovies(): Promise<Movie[] | null> {
        const result = await prisma.movie.findMany({
            orderBy: {
                releaseYear: 'desc',
            },
            take: 10,
            include: { genres: { select: { genre: true } } },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },
    async updateMovieById(movieParam: Prisma.MovieUpdateInput, id: string): Promise<Movie | null> {
        const movie: Movie | null = await prisma.movie.findUnique({
            where: { id: Number(id) },
        });

        if (movie) {
            const movieUpdated = await prisma.movie.update({
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
    },
    async addMovie(movieParam: Prisma.MovieCreateInput): Promise<Movie | null> {
        const movieCreated = await prisma.movie.create({
            data: movieParam,
            include: { genres: { select: { genre: true } }, cast: { select: { actor: true } } },
        });

        if (movieCreated) {
            return movieCreated;
        } else {
            return null;
        }
    },
    async deleteMovieById(id: number): Promise<string | null> {
        const movie: Movie | null = await prisma.movie.findUnique({
            where: { id },
        });

        if (movie) {
            const result = await prisma.movie.delete({
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
    },
    async searchMoviesByTitle(title: string, queryParams: any): Promise<any | null> {
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

        const movies = await prisma.movie.findMany(query);
        const count = await prisma.movie.count({
            where: {
                title: { contains: title },
            },
        });

        if (movies) {
            return { movies, count };
        } else {
            return null;
        }
    },
};

export default movieService;
