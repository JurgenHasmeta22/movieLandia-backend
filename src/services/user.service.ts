import { Prisma, PrismaClient, User } from '@prisma/client';
import { prisma } from '../config/prisma.config';

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

class UserService {
    private prisma: PrismaClient;

    constructor(prismaInstance: typeof prisma) {
        this.prisma = prismaInstance;
    }

    // #region "CRUD"
    public async getUsers({
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

        const users = await this.prisma.user.findMany({
            where: filters,
            orderBy: orderByObject,
            skip,
            take,
        });

        const count = await this.prisma.user.count();

        if (users) {
            return { rows: users, count };
        } else {
            return null;
        }
    }

    public async getUserById(userId: number): Promise<User | null> {
        const result = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async getUserByUsername(username: string): Promise<User | null> {
        const result = await this.prisma.user.findFirst({
            where: { userName: username },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async updateUserById(userParam: Prisma.UserUpdateInput, id: string): Promise<User | null> {
        const result = await this.prisma.user.update({
            where: { id: Number(id) },
            data: userParam,
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    }

    public async deleteUserById(id: number): Promise<string | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (user) {
            await this.prisma.user.delete({
                where: { id },
            });
            return 'User deleted successfully';
        } else {
            return null;
        }
    }

    public async searchUsersByUsername(username: string, page: number): Promise<User[] | null> {
        const result = await this.prisma.user.findMany({
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
    }
    // #endregion

    // #region "Bookmarks"
    public async addFavoriteSerieToUser(userId: number, serieId: number): Promise<User | null> {
        const existingFavorite = await this.prisma.userSerieFavorite.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (existingFavorite) {
            return null;
        }

        await this.prisma.userSerieFavorite.create({
            data: { userId, serieId },
        });

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                favMovies: { include: { movie: true } },
                favSeries: { include: { serie: true } },
                movieReviews: { include: { movie: true } },
                serieReviews: { include: { serie: true } },
                upvotedMovies: { include: { movieReview: true, movie: true } },
                downvotedMovies: { include: { movieReview: true, movie: true } },
                upvotedSeries: { include: { serieReview: true, serie: true } },
                downvotedSeries: { include: { serieReview: true, serie: true } },
            },
        });

        if (user) {
            return user;
        } else {
            return null;
        }
    }

    public async addFavoriteMovieToUser(userId: number, movieId: number): Promise<User | null> {
        const existingFavorite = await this.prisma.userMovieFavorite.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (existingFavorite) {
            return null;
        }

        await this.prisma.userMovieFavorite.create({
            data: { userId, movieId },
        });

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                favMovies: { include: { movie: true } },
                favSeries: { include: { serie: true } },
                movieReviews: { include: { movie: true } },
                serieReviews: { include: { serie: true } },
                upvotedMovies: { include: { movieReview: true, movie: true } },
                downvotedMovies: { include: { movieReview: true, movie: true } },
                upvotedSeries: { include: { serieReview: true, serie: true } },
                downvotedSeries: { include: { serieReview: true, serie: true } },
            },
        });

        if (user) {
            return user;
        } else {
            return null;
        }
    }

    public async removeFavoriteMovieToUser(userId: number, movieId: number): Promise<User | null> {
        const existingFavorite = await this.prisma.userMovieFavorite.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (existingFavorite) {
            await this.prisma.userMovieFavorite.delete({
                where: { id: existingFavorite.id },
            });

            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    favMovies: { include: { movie: true } },
                    favSeries: { include: { serie: true } },
                    movieReviews: { include: { movie: true } },
                    serieReviews: { include: { serie: true } },
                    upvotedMovies: { include: { movieReview: true, movie: true } },
                    downvotedMovies: { include: { movieReview: true, movie: true } },
                    upvotedSeries: { include: { serieReview: true, serie: true } },
                    downvotedSeries: { include: { serieReview: true, serie: true } },
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
    }

    public async removeFavoriteSerieToUser(userId: number, serieId: number): Promise<User | null> {
        const existingFavorite = await this.prisma.userSerieFavorite.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (existingFavorite) {
            await this.prisma.userSerieFavorite.delete({
                where: { id: existingFavorite.id },
            });

            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    favMovies: { include: { movie: true } },
                    favSeries: { include: { serie: true } },
                    movieReviews: { include: { movie: true } },
                    serieReviews: { include: { serie: true } },
                    upvotedMovies: { include: { movieReview: true, movie: true } },
                    downvotedMovies: { include: { movieReview: true, movie: true } },
                    upvotedSeries: { include: { serieReview: true, serie: true } },
                    downvotedSeries: { include: { serieReview: true, serie: true } },
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
    }
    // #endregion

    // #region "Reviews"
    public async addReviewMovie({ content, createdAt, rating, userId, movieId }: any): Promise<any> {
        const existingReview = await this.prisma.movieReview.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (!existingReview) {
            const reviewAdded = await this.prisma.movieReview.create({
                data: {
                    content,
                    createdAt,
                    rating,
                    userId,
                    movieId,
                },
            });

            if (reviewAdded) {
                const user = await this.prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                        favMovies: { include: { movie: true } },
                        favSeries: { include: { serie: true } },
                        movieReviews: { include: { movie: true } },
                        serieReviews: { include: { serie: true } },
                        upvotedMovies: { include: { movieReview: true, movie: true } },
                        downvotedMovies: { include: { movieReview: true, movie: true } },
                        upvotedSeries: { include: { serieReview: true, serie: true } },
                        downvotedSeries: { include: { serieReview: true, serie: true } },
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
        } else {
            return null;
        }
    }

    public async addReviewSerie({ content, createdAt, rating, userId, serieId }: any): Promise<any> {
        const existingReview = await this.prisma.serieReview.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (!existingReview) {
            const reviewAdded = await this.prisma.serieReview.create({
                data: {
                    content,
                    createdAt,
                    rating,
                    userId,
                    serieId,
                },
            });

            if (reviewAdded) {
                const user = await this.prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                        favMovies: { include: { movie: true } },
                        favSeries: { include: { serie: true } },
                        movieReviews: { include: { movie: true } },
                        serieReviews: { include: { serie: true } },
                        upvotedMovies: { include: { movieReview: true, movie: true } },
                        downvotedMovies: { include: { movieReview: true, movie: true } },
                        upvotedSeries: { include: { serieReview: true, serie: true } },
                        downvotedSeries: { include: { serieReview: true, serie: true } },
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
        } else {
            return null;
        }
    }

    public async updateReviewMovie({ content, updatedAt, rating, userId, movieId }: any): Promise<any> {
        const existingReview = await this.prisma.movieReview.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (existingReview) {
            const reviewUpdated = await this.prisma.movieReview.update({
                data: {
                    content,
                    updatedAt,
                    rating,
                    userId,
                    movieId,
                },
                where: {
                    id: existingReview.id,
                },
            });

            if (reviewUpdated) {
                const user = await this.prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                        favMovies: { include: { movie: true } },
                        favSeries: { include: { serie: true } },
                        movieReviews: { include: { movie: true } },
                        serieReviews: { include: { serie: true } },
                        upvotedMovies: { include: { movieReview: true, movie: true } },
                        downvotedMovies: { include: { movieReview: true, movie: true } },
                        upvotedSeries: { include: { serieReview: true, serie: true } },
                        downvotedSeries: { include: { serieReview: true, serie: true } },
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
        } else {
            return null;
        }
    }

    public async updateReviewSerie({ content, updatedAt, rating, userId, serieId }: any): Promise<any> {
        const existingReview = await this.prisma.serieReview.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (existingReview) {
            const reviewUpdated = await this.prisma.serieReview.update({
                data: {
                    content,
                    updatedAt,
                    rating,
                    userId,
                    serieId,
                },
                where: {
                    id: existingReview.id,
                },
            });

            if (reviewUpdated) {
                const user = await this.prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                        favMovies: { include: { movie: true } },
                        favSeries: { include: { serie: true } },
                        movieReviews: { include: { movie: true } },
                        serieReviews: { include: { serie: true } },
                        upvotedMovies: { include: { movieReview: true, movie: true } },
                        downvotedMovies: { include: { movieReview: true, movie: true } },
                        upvotedSeries: { include: { serieReview: true, serie: true } },
                        downvotedSeries: { include: { serieReview: true, serie: true } },
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
        } else {
            return null;
        }
    }

    public async removeReviewMovie({ userId, movieId }: any): Promise<any> {
        const existingReview = await this.prisma.movieReview.findFirst({
            where: {
                AND: [{ userId }, { movieId }],
            },
        });

        if (existingReview) {
            const result = await this.prisma.movieReview.delete({
                where: { id: existingReview.id },
            });

            if (result) {
                const user = await this.prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                        favMovies: { include: { movie: true } },
                        favSeries: { include: { serie: true } },
                        movieReviews: { include: { movie: true } },
                        serieReviews: { include: { serie: true } },
                        upvotedMovies: { include: { movieReview: true, movie: true } },
                        downvotedMovies: { include: { movieReview: true, movie: true } },
                        upvotedSeries: { include: { serieReview: true, serie: true } },
                        downvotedSeries: { include: { serieReview: true, serie: true } },
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
        } else {
            return null;
        }
    }

    public async removeReviewSerie({ userId, serieId }: any): Promise<any> {
        const existingReview = await this.prisma.serieReview.findFirst({
            where: {
                AND: [{ userId }, { serieId }],
            },
        });

        if (existingReview) {
            const result = await this.prisma.serieReview.delete({
                where: { id: existingReview.id },
            });

            if (result) {
                const user = await this.prisma.user.findUnique({
                    where: { id: userId },
                    include: {
                        favMovies: { include: { movie: true } },
                        favSeries: { include: { serie: true } },
                        movieReviews: { include: { movie: true } },
                        serieReviews: { include: { serie: true } },
                        upvotedMovies: { include: { movieReview: true, movie: true } },
                        downvotedMovies: { include: { movieReview: true, movie: true } },
                        upvotedSeries: { include: { serieReview: true, serie: true } },
                        downvotedSeries: { include: { serieReview: true, serie: true } },
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
        } else {
            return null;
        }
    }
    // #endregion

    // #region "upvotes, downvotes"
    public async addUpvoteMovieReview({ userId, movieId, movieReviewId }: any): Promise<any> {
        const existingUpvoteMovieReview = await this.prisma.upvoteMovie.findFirst({
            where: {
                AND: [{ userId }, { movieId }, { movieReviewId }],
            },
        });

        if (!existingUpvoteMovieReview) {
            const upvoteAdded = await this.prisma.upvoteMovie.create({
                data: {
                    userId,
                    movieId,
                    movieReviewId,
                },
            });

            if (upvoteAdded) {
                return upvoteAdded;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async addUpvoteSerieReview({ userId, serieId, serieReviewId }: any): Promise<any> {
        const existingUpvoteSerieReview = await this.prisma.upvoteSerie.findFirst({
            where: {
                AND: [{ userId }, { serieId }, { serieReviewId }],
            },
        });

        if (!existingUpvoteSerieReview) {
            const upvoteAdded = await this.prisma.upvoteSerie.create({
                data: {
                    userId,
                    serieId,
                    serieReviewId,
                },
            });

            if (upvoteAdded) {
                return upvoteAdded;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async removeUpvoteMovieReview({ userId, movieId, movieReviewId }: any): Promise<any> {
        const existingUpvote = await this.prisma.upvoteMovie.findFirst({
            where: {
                AND: [{ userId }, { movieReviewId }, { movieId }],
            },
        });

        if (existingUpvote) {
            const result = await this.prisma.upvoteMovie.delete({
                where: { id: existingUpvote.id },
            });

            if (result) {
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async removeUpvoteSerieReview({ userId, serieId, serieReviewId }: any): Promise<any> {
        const existingUpvote = await this.prisma.upvoteSerie.findFirst({
            where: {
                AND: [{ userId }, { serieReviewId }, { serieId }],
            },
        });

        if (existingUpvote) {
            const result = await this.prisma.upvoteSerie.delete({
                where: { id: existingUpvote.id },
            });

            if (result) {
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async addDownvoteMovieReview({ userId, movieId, movieReviewId }: any): Promise<any> {
        const existingDownvoteMovieReview = await this.prisma.downvoteMovie.findFirst({
            where: {
                AND: [{ userId }, { movieId }, { movieReviewId }],
            },
        });

        if (!existingDownvoteMovieReview) {
            const downvoteAdded = await this.prisma.downvoteMovie.create({
                data: {
                    userId,
                    movieId,
                    movieReviewId,
                },
            });

            if (downvoteAdded) {
                return downvoteAdded;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async addDownvoteSerieReview({ userId, serieId, serieReviewId }: any): Promise<any> {
        const existingDownvoteSerieReview = await this.prisma.downvoteSerie.findFirst({
            where: {
                AND: [{ userId }, { serieId }, { serieReviewId }],
            },
        });

        if (!existingDownvoteSerieReview) {
            const downvoteAdded = await this.prisma.downvoteSerie.create({
                data: {
                    userId,
                    serieId,
                    serieReviewId,
                },
            });

            if (downvoteAdded) {
                return downvoteAdded;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async removeDownvoteMovieReview({ userId, movieId, movieReviewId }: any): Promise<any> {
        const existingDownvote = await this.prisma.downvoteMovie.findFirst({
            where: {
                AND: [{ userId }, { movieReviewId }, { movieId }],
            },
        });

        if (existingDownvote) {
            const result = await this.prisma.downvoteMovie.delete({
                where: { id: existingDownvote.id },
            });

            if (result) {
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public async removeDownvoteSerieReview({ userId, serieId, serieReviewId }: any): Promise<any> {
        const existingDownvote = await this.prisma.downvoteSerie.findFirst({
            where: {
                AND: [{ userId }, { serieReviewId }, { serieId }],
            },
        });

        if (existingDownvote) {
            const result = await this.prisma.downvoteSerie.delete({
                where: { id: existingDownvote.id },
            });

            if (result) {
                return result;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
    // #endregion
}

export default new UserService(prisma);
