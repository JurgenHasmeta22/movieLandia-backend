import { FastifyRequest, FastifyReply } from 'fastify';
import userModel from '../../models/user.model';
import { User } from '@prisma/client';
import HttpStatusCode from '../../utils/httpStatusCodes';

interface GetUsersQuery {
    sortBy?: string;
    ascOrDesc?: 'asc' | 'desc';
    page?: string;
    pageSize?: string;
    userName?: string;
    filterValue?: string;
    filterName?: string;
    filterOperator?: '>' | '=' | '<';
}

const userController = {
    async getUsers(request: FastifyRequest<{ Querystring: GetUsersQuery }>, reply: FastifyReply) {
        const { sortBy, ascOrDesc, page, pageSize, userName, filterValue, filterName, filterOperator } = request.query;

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
                reply.status(HttpStatusCode.OK).send(users);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'User not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const userId = Number(request.params.id);

        try {
            const user = await userModel.getUserById(userId);

            if (user) {
                reply.status(HttpStatusCode.OK).send(user);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'User not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getUserByTitle(request: FastifyRequest<{ Params: { title: string } }>, reply: FastifyReply) {
        const title = request.params.title
            .split('')
            .map((char) => (char === '-' ? ' ' : char))
            .join('');
        try {
            const user = await userModel.getUserByUsername(title);

            if (user) {
                reply.status(HttpStatusCode.OK).send(user);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'User not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async updateUserById(request: FastifyRequest<{ Params: { id: string }; Body: User }>, reply: FastifyReply) {
        const userBodyParams = request.body;
        const { id } = request.params;

        try {
            const user: User | null = await userModel.updateUserById(userBodyParams, id);

            if (user) {
                reply.status(HttpStatusCode.OK).send(user);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'User not updated' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async deleteUserById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const idParam = Number(request.params.id);

        try {
            const result = await userModel.deleteUserById(idParam);

            if (result) {
                reply.status(HttpStatusCode.OK).send({
                    msg: 'User deleted successfully',
                });
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'User not deleted' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async searchUsersByTitle(
        request: FastifyRequest<{ Querystring: { title: string; page?: string } }>,
        reply: FastifyReply,
    ) {
        const { title, page } = request.query;

        try {
            const users = await userModel.searchUsersByUsername(String(title), Number(page));

            if (users) {
                reply.status(HttpStatusCode.OK).send(users);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Users not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async bookmarkSerie(request: FastifyRequest<{ Body: { userId: number; serieId: number } }>, reply: FastifyReply) {
        const { userId, serieId } = request.body;

        try {
            const updatedUser = await userModel.addFavoriteSerieToUser(userId, serieId);

            if (updatedUser) {
                reply.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'User with new serie not added' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async bookmarkMovie(request: FastifyRequest<{ Body: { movieId: number; userId: number } }>, reply: FastifyReply) {
        const { movieId, userId } = request.body;

        try {
            const updatedUser = await userModel.addFavoriteMovieToUser(userId, movieId);

            if (updatedUser) {
                reply.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Favorite movie not added' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async unBookmarkMovie(request: FastifyRequest<{ Body: { movieId: number; userId: number } }>, reply: FastifyReply) {
        const { movieId, userId } = request.body;

        try {
            const updatedUser = await userModel.removeFavoriteMovieToUser(userId, movieId);

            if (updatedUser) {
                reply.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Favorite movie not deleted' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async unBookmarkSerie(request: FastifyRequest<{ Body: { serieId: number; userId: number } }>, reply: FastifyReply) {
        const { serieId, userId } = request.body;

        try {
            const updatedUser = await userModel.removeFavoriteSerieToUser(userId, serieId);

            if (updatedUser) {
                reply.status(HttpStatusCode.OK).send(updatedUser);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Favorite serie not deleted' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addReviewMovie(
        request: FastifyRequest<{ Body: { content: string; rating: number; userId: number; movieId: number } }>,
        reply: FastifyReply,
    ) {
        const { content, rating, userId, movieId } = request.body;
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
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addReviewSerie(
        request: FastifyRequest<{ Body: { content: string; rating: number; userId: number; serieId: number } }>,
        reply: FastifyReply,
    ) {
        const { content, rating, userId, serieId } = request.body;
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
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async updateReviewMovie(
        request: FastifyRequest<{ Body: { content: string; rating: number; userId: number; movieId: number } }>,
        reply: FastifyReply,
    ) {
        const { content, rating, userId, movieId } = request.body;
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
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async updateReviewSerie(
        request: FastifyRequest<{ Body: { content: string; rating: number; userId: number; serieId: number } }>,
        reply: FastifyReply,
    ) {
        const { content, rating, userId, serieId } = request.body;
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
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeReviewMovie(
        request: FastifyRequest<{ Body: { userId: number; movieId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, movieId } = request.body;

        try {
            const result = await userModel.removeReviewMovie({
                userId,
                movieId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeReviewSerie(
        request: FastifyRequest<{ Body: { userId: number; serieId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, serieId } = request.body;

        try {
            const result = await userModel.removeReviewSerie({
                userId,
                serieId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addUpvoteMovieReview(
        request: FastifyRequest<{ Body: { userId: number; movieId: number; movieReviewId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, movieId, movieReviewId } = request.body;

        try {
            const result = await userModel.addUpvoteMovieReview({
                userId,
                movieId,
                movieReviewId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addUpvoteSerieReview(
        request: FastifyRequest<{ Body: { userId: number; serieId: number; serieReviewId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, serieId, serieReviewId } = request.body;

        try {
            const result = await userModel.addUpvoteSerieReview({
                userId,
                serieId,
                serieReviewId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeUpvoteMovieReview(
        request: FastifyRequest<{ Body: { userId: number; movieId: number; movieReviewId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, movieId, movieReviewId } = request.body;

        try {
            const result = await userModel.removeUpvoteMovieReview({
                userId,
                movieId,
                movieReviewId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeUpvoteSerieReview(
        request: FastifyRequest<{ Body: { userId: number; serieId: number; serieReviewId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, serieId, serieReviewId } = request.body;

        try {
            const result = await userModel.removeUpvoteSerieReview({
                userId,
                serieId,
                serieReviewId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addDownvoteMovieReview(
        request: FastifyRequest<{ Body: { userId: number; movieId: number; movieReviewId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, movieId, movieReviewId } = request.body;

        try {
            const result = await userModel.addDownvoteMovieReview({
                userId,
                movieId,
                movieReviewId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addDownvoteSerieReview(
        request: FastifyRequest<{ Body: { userId: number; serieId: number; serieReviewId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, serieId, serieReviewId } = request.body;

        try {
            const result = await userModel.addDownvoteSerieReview({
                userId,
                serieId,
                serieReviewId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeDownvoteMovieReview(
        request: FastifyRequest<{ Body: { userId: number; movieId: number; movieReviewId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, movieId, movieReviewId } = request.body;

        try {
            const result = await userModel.removeDownvoteMovieReview({
                userId,
                movieId,
                movieReviewId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async removeDownvoteSerieReview(
        request: FastifyRequest<{ Body: { userId: number; serieId: number; serieReviewId: number } }>,
        reply: FastifyReply,
    ) {
        const { userId, serieId, serieReviewId } = request.body;

        try {
            const result = await userModel.removeDownvoteSerieReview({
                userId,
                serieId,
                serieReviewId,
            });

            if (result) {
                reply.status(HttpStatusCode.OK).send(result);
            } else {
                reply.status(HttpStatusCode.OK).send(result); // This line might need correction based on logic
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default userController;
