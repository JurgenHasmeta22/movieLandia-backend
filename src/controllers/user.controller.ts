import { Request, Response } from 'express';
import userService from '../services/user.service';
import { User } from '@prisma/client';
import HttpStatusCode from '../utils/httpStatusCodes';

const userController = {
    async getUsers(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, userName, filterValue, filterName, filterOperator } = req.query;

        try {
            const users = await userService.getUsers({
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
            const user = await userService.getUserById(userId);

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
            const user = await userService.getUserByUsername(title);

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
            const user: User | null = await userService.updateUserById(userBodyParams, id);

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
            const result = await userService.deleteUserById(idParam);

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
            const users = await userService.searchUsersByUsername(String(title), Number(page));

            if (users) {
                res.status(HttpStatusCode.OK).send(users);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Users not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    // #region "Bookmarks"
    async bookmarkSeason(req: Request, res: Response) {
        const { userId, seasonId } = req.body;

        try {
            const updatedUser = await userService.addFavoriteSeasonToUser(userId, seasonId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User with new season not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async bookmarkSerie(req: Request, res: Response) {
        const { userId, serieId } = req.body;

        try {
            const updatedUser = await userService.addFavoriteSerieToUser(userId, serieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User with new serie not added' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async bookmarkEpisode(req: Request, res: Response) {
        const { userId, episodeId } = req.body;

        try {
            const updatedUser = await userService.addFavoriteEpisodeToUser(userId, episodeId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User with new episode not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async bookmarkGenre(req: Request, res: Response) {
        const { userId, genreId } = req.body;

        try {
            const updatedUser = await userService.addFavoriteGenreToUser(userId, genreId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User with new genre not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async bookmarkMovie(req: Request, res: Response) {
        const { movieId, userId } = req.body;

        try {
            const updatedUser = await userService.addFavoriteMovieToUser(userId, movieId);

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
            const updatedUser = await userService.removeFavoriteMovieToUser(userId, movieId);

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
            const updatedUser = await userService.removeFavoriteSerieToUser(userId, serieId);

            if (updatedUser) {
                res.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Favorite serie not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async isSerieBookmarked(req: Request, res: Response) {
        const { serieTitle, userId } = req.body;
        const title = serieTitle
            .split('')
            .map((char: string) => (char === '-' ? ' ' : char))
            .join('');

        try {
            const result = await userService.isSerieBookmarked(userId, title);

            if (result) {
                res.status(HttpStatusCode.OK).send({ isBookmarked: true });
            } else {
                res.status(HttpStatusCode.OK).send({ isBookmarked: false });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async isMovieBookmarked(req: Request, res: Response) {
        const { movieTitle, userId } = req.body;
        const title = movieTitle
            .split('')
            .map((char: string) => (char === '-' ? ' ' : char))
            .join('');

        try {
            const result = await userService.isMovieBookmarked(userId, title);

            if (result) {
                res.status(HttpStatusCode.OK).send({ isBookmarked: true });
            } else {
                res.status(HttpStatusCode.OK).send({ isBookmarked: false });
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
            const result = await userService.addReviewMovie({
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
            const result = await userService.addReviewSerie({
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
            const result = await userService.updateReviewMovie({
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
            const result = await userService.updateReviewSerie({
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
            const result = await userService.removeReviewMovie({
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
            const result = await userService.removeReviewSerie({
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
    async isSerieReviewed(req: Request, res: Response) {
        const { serieTitle, userId } = req.body;
        const title = serieTitle
            .split('')
            .map((char: string) => (char === '-' ? ' ' : char))
            .join('');

        try {
            const result = await userService.isSerieReviewed(userId, title);

            if (result) {
                res.status(HttpStatusCode.OK).send({ isReviewed: true });
            } else {
                res.status(HttpStatusCode.OK).send({ isReviewed: false });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async isMovieReviewed(req: Request, res: Response) {
        const { movieTitle, userId } = req.body;
        const title = movieTitle
            .split('')
            .map((char: string) => (char === '-' ? ' ' : char))
            .join('');

        try {
            const result = await userService.isMovieReviewed(userId, title);

            if (result) {
                res.status(HttpStatusCode.OK).send({ isReviewed: true });
            } else {
                res.status(HttpStatusCode.OK).send({ isReviewed: false });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    // #endregion
};

export default userController;
