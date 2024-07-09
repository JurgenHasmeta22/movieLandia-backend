import { Request, Response } from 'express';
import userModel from '../../models/user.model';
import { User } from '@prisma/client';
import HttpStatusCode from '../../utils/httpStatusCodes';

const userController = {
    // #region "CRUD"
    async getUsers(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, userName, filterValue, filterName, filterOperator } = req.query;

        try {
            const users = await userModel.getUsers({
                sortBy: sortBy as string,
                ascOrDesc: ascOrDesc as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 20,
                page: Number(page),
                userName: userName as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName as string,
                filterOperatorString: filterOperator as '>' | '=' | '<',
            });

            if (users) {
                res.status(HttpStatusCode.OK).send(users);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'User not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);

        try {
            const user = await userModel.getUserById(userId);

            if (user) {
                res.status(HttpStatusCode.OK).send(user);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'User not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getUserByTitle(req: Request, res: Response) {
        const title = req.params.title
            .split('')
            .map((char) => (char === '-' ? ' ' : char))
            .join('');
        try {
            const user = await userModel.getUserByUsername(title);

            if (user) {
                res.status(HttpStatusCode.OK).send(user);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'User not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async updateUserById(req: Request, res: Response) {
        const userBodyParams = req.body;
        const { id } = req.params;

        try {
            const user: User | null = await userModel.updateUserById(userBodyParams, id);

            if (user) {
                res.status(HttpStatusCode.OK).send(user);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async deleteUserById(req: Request, res: Response) {
        const idParam = Number(req.params.id);

        try {
            const result = await userModel.deleteUserById(idParam);

            if (result) {
                res.status(HttpStatusCode.OK).send({
                    msg: 'User deleted successfully',
                });
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async searchUsersByTitle(req: Request, res: Response) {
        const { title, page } = req.query;

        try {
            const users = await userModel.searchUsersByUsername(String(title), Number(page));

            if (users) {
                res.status(HttpStatusCode.OK).send(users);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Users not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    // #endregion

    // #region "Bookmarks"
    async bookmarkSerie(req: Request, res: Response) {
        const { userId, serieId } = req.body;

        try {
            const updatedUser = await userModel.addFavoriteSerieToUser(userId, serieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User with new serie not added' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async bookmarkMovie(req: Request, res: Response) {
        const { movieId, userId } = req.body;

        try {
            const updatedUser = await userModel.addFavoriteMovieToUser(userId, movieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Favorite movie not added' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async unBookmarkMovie(req: Request, res: Response) {
        const { movieId, userId } = req.body;

        try {
            const updatedUser = await userModel.removeFavoriteMovieToUser(userId, movieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Favorite movie not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async unBookmarkSerie(req: Request, res: Response) {
        const { serieId, userId } = req.body;

        try {
            const updatedUser = await userModel.removeFavoriteSerieToUser(userId, serieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Favorite serie not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    // #endregion

    // #region "Reviews"
    async addReviewMovie(req: Request, res: Response) {
        const { content, rating, userId, movieId } = req.body;
        const createdAt = new Date();

        try {
            const result = await userModel.addReviewMovie({
                content,
                createdAt,
                rating,
                userId,
                movieId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async addReviewSerie(req: Request, res: Response) {
        const { content, rating, userId, serieId } = req.body;
        const createdAt = new Date();

        try {
            const result = await userModel.addReviewSerie({
                content,
                createdAt,
                rating,
                userId,
                serieId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async updateReviewMovie(req: Request, res: Response) {
        const { content, rating, userId, movieId } = req.body;
        const updatedAt = new Date();

        try {
            const result = await userModel.updateReviewMovie({
                content,
                updatedAt,
                rating,
                userId,
                movieId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async updateReviewSerie(req: Request, res: Response) {
        const { content, rating, userId, serieId } = req.body;
        const updatedAt = new Date();

        try {
            const result = await userModel.updateReviewSerie({
                content,
                updatedAt,
                rating,
                userId,
                serieId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeReviewMovie(req: Request, res: Response) {
        const { userId, movieId } = req.body;

        try {
            const result = await userModel.removeReviewMovie({
                userId,
                movieId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async removeReviewSerie(req: Request, res: Response) {
        const { userId, serieId } = req.body;

        try {
            const result = await userModel.removeReviewSerie({
                userId,
                serieId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    // #endregion

    // #region "upvotes, downvotes"
    async addUpvoteMovieReview(req: Request, res: Response) {
        const { userId, movieId, movieReviewId } = req.body;

        try {
            const result = await userModel.addUpvoteMovieReview({
                userId,
                movieId,
                movieReviewId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async addUpvoteSerieReview(req: Request, res: Response) {
        const { userId, serieId, serieReviewId } = req.body;

        try {
            const result = await userModel.addUpvoteSerieReview({
                userId,
                serieId,
                serieReviewId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeUpvoteMovieReview(req: Request, res: Response) {
        const { userId, movieId, movieReviewId } = req.body;

        try {
            const result = await userModel.removeUpvoteMovieReview({
                userId,
                movieId,
                movieReviewId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async removeUpvoteSerieReview(req: Request, res: Response) {
        const { userId, serieId, serieReviewId } = req.body;

        try {
            const result = await userModel.removeUpvoteSerieReview({
                userId,
                serieId,
                serieReviewId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addDownvoteMovieReview(req: Request, res: Response) {
        const { userId, movieId, movieReviewId } = req.body;

        try {
            const result = await userModel.addDownvoteMovieReview({
                userId,
                movieId,
                movieReviewId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async addDownvoteSerieReview(req: Request, res: Response) {
        const { userId, serieId, serieReviewId } = req.body;

        try {
            const result = await userModel.addDownvoteSerieReview({
                userId,
                serieId,
                serieReviewId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeDownvoteMovieReview(req: Request, res: Response) {
        const { userId, movieId, movieReviewId } = req.body;

        try {
            const result = await userModel.removeDownvoteMovieReview({
                userId,
                movieId,
                movieReviewId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async removeDownvoteSerieReview(req: Request, res: Response) {
        const { userId, serieId, serieReviewId } = req.body;

        try {
            const result = await userModel.removeDownvoteSerieReview({
                userId,
                serieId,
                serieReviewId,
            });

            if (result) {
                res.status(HttpStatusCode.OK).send(result);
            } else {
                res.status(HttpStatusCode.OK).send(result);
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    // #endregion
};

export default userController;
