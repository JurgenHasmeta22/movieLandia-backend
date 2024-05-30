import { Episode, Genre, Prisma, Season, Serie, User, UserMovieFavorite } from '@prisma/client';
import { prisma } from '../app';

interface UserServiceParams {
    sortBy: string;
    ascOrDesc: 'asc' | 'desc';
    perPage: number;
    page: number;
    userName?: string | null;
    filterValue?: number | string;
    filterNameString?: string | null;
    filterOperatorString?: '>' | '=' | '<' | 'gt' | 'equals' | 'lt';
}

const userService = {
    async getUsers({
        sortBy,
        ascOrDesc,
        perPage,
        page,
        userName,
        filterValue,
        filterNameString,
        filterOperatorString,
    }: UserServiceParams): Promise<any | null> {
        const filters: Prisma.UserWhereInput = {};
        const skip = perPage ? (page ? (page - 1) * perPage : 0) : page ? (page - 1) * 20 : 0;
        const take = perPage || 20;

        if (userName) filters.userName = { contains: userName };

        if (filterValue !== undefined && filterNameString && filterOperatorString) {
            const operator = filterOperatorString === '>' ? 'gt' : filterOperatorString === '<' ? 'lt' : 'equals';
            (filters[filterNameString as keyof Prisma.UserWhereInput] as any) = { [operator]: filterValue };
        }

        const orderByObject: any = {};

        if (sortBy && ascOrDesc) {
            orderByObject[sortBy] = ascOrDesc;
        }

        const users = await prisma.user.findMany({
            where: filters,
            orderBy: orderByObject,
            skip,
            take,
        });

        const count = await prisma.user.count();

        if (users) {
            return { rows: users, count };
        } else {
            return null;
        }
    },
    async getUserById(userId: number): Promise<User | null> {
        const result = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },
    async getUserByUsername(username: string): Promise<User | null> {
        const result = await prisma.user.findFirst({
            where: { userName: username },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },
    async updateUserById(userParam: Prisma.UserUpdateInput, id: string): Promise<User | null> {
        const result = await prisma.user.update({
            where: { id: Number(id) },
            data: userParam,
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },
    async deleteUserById(id: number): Promise<string | null> {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (user) {
            await prisma.user.delete({
                where: { id },
            });
            return 'User deleted successfully';
        } else {
            return null;
        }
    },
    async searchUsersByUsername(username: string, page: number): Promise<User[] | null> {
        const result = await prisma.user.findMany({
            where: {
                userName: { contains: username },
            },
            skip: page ? (page - 1) * 20 : 0,
            take: 20,
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },

    // #region "Bookmarks"
    async addFavoriteSeasonToUser(userId: number, seasonId: number): Promise<User | null> {
        const season: Season | null = await prisma.season.findUnique({
            where: { id: Number(seasonId) },
        });

        if (season) {
            await prisma.userSeasonFavorite.update({
                where: { id: Number(seasonId) },
                data: { user: { connect: { id: userId } } },
            });

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (user) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async addFavoriteSerieToUser(userId: number, serieId: number): Promise<User | null> {
        const existingFavorite = await prisma.userSerieFavorite.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (existingFavorite) {
            return null;
        }

        await prisma.userSerieFavorite.create({
            data: { userId, serieId },
        });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                favMovies: { include: { movie: true } },
                favSeries: { include: { serie: true } },
                movieReviews: { include: { movie: true } },
                serieReviews: { include: { serie: true } },
            },
        });

        if (user) {
            return user;
        } else {
            return null;
        }
    },
    async addFavoriteGenreToUser(userId: number, genreId: number): Promise<User | null> {
        const genre: Genre | null = await prisma.genre.findUnique({
            where: { id: Number(genreId) },
        });

        if (genre) {
            await prisma.userGenreFavorite.update({
                where: { id: Number(genreId) },
                data: { user: { connect: { id: userId } } },
            });

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (user) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async addFavoriteEpisodeToUser(userId: number, episodeId: number): Promise<User | null> {
        const episode: Episode | null = await prisma.episode.findUnique({
            where: { id: Number(episodeId) },
        });

        if (episode) {
            await prisma.userEpisodeFavorite.update({
                where: { id: Number(episodeId) },
                data: { user: { connect: { id: userId } } },
            });

            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (user) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async addFavoriteMovieToUser(userId: number, movieId: number): Promise<User | null> {
        const existingFavorite = await prisma.userMovieFavorite.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (existingFavorite) {
            return null;
        }

        await prisma.userMovieFavorite.create({
            data: { userId, movieId },
        });

        const user: User | null = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                favMovies: { include: { movie: true } },
                favSeries: { include: { serie: true } },
                movieReviews: { include: { movie: true } },
                serieReviews: { include: { serie: true } },
            },
        });

        if (user) {
            return user;
        } else {
            return null;
        }
    },
    async removeFavoriteMovieToUser(userId: number, movieId: number): Promise<User | null> {
        const existingFavorite = await prisma.userMovieFavorite.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (existingFavorite) {
            await prisma.userMovieFavorite.delete({
                where: { id: existingFavorite.id },
            });

            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    favMovies: { include: { movie: true } },
                    favSeries: { include: { serie: true } },
                    movieReviews: { include: { movie: true } },
                    serieReviews: { include: { serie: true } },
                },
            });

            if (user) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async removeFavoriteSerieToUser(userId: number, serieId: number): Promise<User | null> {
        const existingFavorite = await prisma.userSerieFavorite.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (existingFavorite) {
            await prisma.userSerieFavorite.delete({
                where: { id: existingFavorite.id },
            });

            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: {
                    favMovies: { include: { movie: true } },
                    favSeries: { include: { serie: true } },
                    movieReviews: { include: { movie: true } },
                    serieReviews: { include: { serie: true } },
                },
            });

            if (user) {
                return user;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async isMovieBookmarked(userId: number, movieTitle: string): Promise<any> {
        const movie = await prisma.movie.findFirst({
            where: {
                title: movieTitle,
            },
        });

        if (movie) {
            const existingFavorite = await prisma.userMovieFavorite.findFirst({
                where: {
                    AND: [{ userId }, { movieId: movie.id }],
                },
            });

            console.log(movie);

            if (existingFavorite) {
                return true;
            } else {
                return false;
            }
        } else {
            return null;
        }
    },
    async isSerieBookmarked(userId: number, serieTitle: string): Promise<any> {
        const serie = await prisma.serie.findFirst({
            where: {
                title: serieTitle,
            },
        });

        if (serie) {
            const existingFavorite = await prisma.userSerieFavorite.findFirst({
                where: {
                    AND: [{ userId }, { serieId: serie.id }],
                },
            });

            if (existingFavorite) {
                return true;
            } else {
                return false;
            }
        } else {
            return null;
        }
    },
    // #endregion

    // #region "Reviews"
    async addReviewMovie({ content, createdAt, userId, movieId }: any): Promise<any> {
        const existingReview = await prisma.movieReview.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (!existingReview) {
            const reviewAdded = await prisma.movieReview.create({
                data: {
                    content,
                    createdAt,
                    userId,
                    movieId,
                },
            });

            if (reviewAdded) {
                return reviewAdded;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async addReviewSerie({ content, createdAt, userId, serieId }: any): Promise<any> {
        const existingReview = await prisma.serieReview.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (!existingReview) {
            const reviewAdded = await prisma.serieReview.create({
                data: {
                    content,
                    createdAt,
                    userId,
                    serieId,
                },
            });

            if (reviewAdded) {
                return reviewAdded;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async removeReviewMovie({ userId, movieId }: any): Promise<any> {
        const existingReview = await prisma.movieReview.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (existingReview) {
            const result = await prisma.movieReview.delete({
                where: { id: existingReview.id },
            });

            if (result) {
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async removeReviewSerie({ userId, serieId }: any): Promise<any> {
        const existingReview = await prisma.serieReview.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (existingReview) {
            const result = await prisma.serieReview.delete({
                where: { id: existingReview.id },
            });

            if (result) {
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    // #endregion
};

export default userService;
