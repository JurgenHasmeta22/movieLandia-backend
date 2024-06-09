import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { User } from '@prisma/client';
import HttpStatusCode from '../utils/httpStatusCodes';

class UserController {
    private userService: typeof UserService;

    constructor(userService: typeof UserService) {
        this.userService = userService;
    }

    // #region "CRUD"
    public async getUsers(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, userName, filterValue, filterName, filterOperator } = req.query;

        try {
            const users = await this.userService.getUsers({
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
    }

    public async getUserById(req: Request, res: Response) {
        const userId = Number(req.params.id);

        try {
            const user = await this.userService.getUserById(userId);

            if (user) {
                res.status(HttpStatusCode.OK).send(user);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'User not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async getUserByTitle(req: Request, res: Response) {
        const title = req.params.title
            .split('')
            .map((char) => (char === '-' ? ' ' : char))
            .join('');
        try {
            const user = await this.userService.getUserByUsername(title);

            if (user) {
                res.status(HttpStatusCode.OK).send(user);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'User not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async updateUserById(req: Request, res: Response) {
        const userBodyParams = req.body;
        const { id } = req.params;

        try {
            const user: User | null = await this.userService.updateUserById(userBodyParams, id);

            if (user) {
                res.status(HttpStatusCode.OK).send(user);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async deleteUserById(req: Request, res: Response) {
        const idParam = Number(req.params.id);

        try {
            const result = await this.userService.deleteUserById(idParam);

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
    }

    public async searchUsersByTitle(req: Request, res: Response) {
        const { title, page } = req.query;

        try {
            const users = await this.userService.searchUsersByUsername(String(title), Number(page));

            if (users) {
                res.status(HttpStatusCode.OK).send(users);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Users not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }
    // #endregion

    // #region "Bookmarks"
    public async bookmarkSerie(req: Request, res: Response) {
        const { userId, serieId } = req.body;

        try {
            const updatedUser = await this.userService.addFavoriteSerieToUser(userId, serieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User with new serie not added' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async bookmarkMovie(req: Request, res: Response) {
        const { movieId, userId } = req.body;

        try {
            const updatedUser = await this.userService.addFavoriteMovieToUser(userId, movieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Favorite movie not added' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async unBookmarkMovie(req: Request, res: Response) {
        const { movieId, userId } = req.body;

        try {
            const updatedUser = await this.userService.removeFavoriteMovieToUser(userId, movieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Favorite movie not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async unBookmarkSerie(req: Request, res: Response) {
        const { serieId, userId } = req.body;

        try {
            const updatedUser = await this.userService.removeFavoriteSerieToUser(userId, serieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Favorite serie not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }
    // #endregion

    // #region "Reviews"
    public async addReviewMovie(req: Request, res: Response) {
        const { content, rating, userId, movieId } = req.body;
        const createdAt = new Date();

        try {
            const result = await this.userService.addReviewMovie({
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
    }

    public async addReviewSerie(req: Request, res: Response) {
        const { content, rating, userId, serieId } = req.body;
        const createdAt = new Date();

        try {
            const result = await this.userService.addReviewSerie({
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
    }

    public async updateReviewMovie(req: Request, res: Response) {
        const { content, rating, userId, movieId } = req.body;
        const updatedAt = new Date();

        try {
            const result = await this.userService.updateReviewMovie({
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
    }

    public async updateReviewSerie(req: Request, res: Response) {
        const { content, rating, userId, serieId } = req.body;
        const updatedAt = new Date();

        try {
            const result = await this.userService.updateReviewSerie({
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
    }

    public async removeReviewMovie(req: Request, res: Response) {
        const { userId, movieId } = req.body;

        try {
            const result = await this.userService.removeReviewMovie({
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
    }

    public async removeReviewSerie(req: Request, res: Response) {
        const { userId, serieId } = req.body;

        try {
            const result = await this.userService.removeReviewSerie({
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
    }
    // #endregion

    // #region "upvotes, downvotes"
    public async addUpvoteMovieReview(req: Request, res: Response) {
        const { userId, movieId, movieReviewId } = req.body;

        try {
            const result = await this.userService.addUpvoteMovieReview({
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
    }

    public async addUpvoteSerieReview(req: Request, res: Response) {
        const { userId, serieId, serieReviewId } = req.body;

        try {
            const result = await this.userService.addUpvoteSerieReview({
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
    }

    public async removeUpvoteMovieReview(req: Request, res: Response) {
        const { userId, movieId, movieReviewId } = req.body;

        try {
            const result = await this.userService.removeUpvoteMovieReview({
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
    }

    public async removeUpvoteSerieReview(req: Request, res: Response) {
        const { userId, serieId, serieReviewId } = req.body;

        try {
            const result = await this.userService.removeUpvoteSerieReview({
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
    }

    public async addDownvoteMovieReview(req: Request, res: Response) {
        const { userId, movieId, movieReviewId } = req.body;

        try {
            const result = await this.userService.addDownvoteMovieReview({
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
    }

    public async addDownvoteSerieReview(req: Request, res: Response) {
        const { userId, serieId, serieReviewId } = req.body;

        try {
            const result = await this.userService.addDownvoteSerieReview({
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
    }

    public async removeDownvoteMovieReview(req: Request, res: Response) {
        const { userId, movieId, movieReviewId } = req.body;

        try {
            const result = await this.userService.removeDownvoteMovieReview({
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
    }

    public async removeDownvoteSerieReview(req: Request, res: Response) {
        const { userId, serieId, serieReviewId } = req.body;

        try {
            const result = await this.userService.removeDownvoteSerieReview({
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
    }
    // #endregion
}

export default new UserController(UserService);
