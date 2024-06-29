import { FastifyPluginAsync } from 'fastify';
import userController from '../controllers/REST/user.controller';
import {
    userSchemaUpdate,
    userSchemaPost,
    userQuerySchema,
    userIdParamSchema,
    userUserNameParamSchema,
} from '../schemas/user.schema';
import { userMovieFavoriteSchema } from '../schemas/userMovieFavorite.schema';
import { userSerieFavoriteSchema } from '../schemas/userSerie.schema';
import { movieReviewSchema } from '../schemas/movieReview.schema';
import { serieReviewSchema } from '../schemas/serieReview.schema';
import { upvoteMovieSchema } from '../schemas/upvoteMovie.schema';
import { upvoteSerieSchema } from '../schemas/upvoteSerie.schema';
import { downvoteMovieSchema } from '../schemas/downvoteMovie.schema';
import { downvoteSerieSchema } from '../schemas/downvoteSerie.schema';

const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/getUsers', { schema: { querystring: userQuerySchema } }, async (request: any, reply) => {
        try {
            const users = await userController.getUsers(request, reply);
            reply.send(users);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.get('/getUserById/:id', { schema: { params: userIdParamSchema } }, async (request: any, reply) => {
        try {
            const user = await userController.getUserById(request, reply);
            reply.send(user);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.get('/getUserByTitle/:userName', { schema: { params: userUserNameParamSchema } }, async (request: any, reply) => {
        try {
            const user = await userController.getUserByTitle(request, reply);
            reply.send(user);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.delete('/deleteUserById/:id', { schema: { params: userIdParamSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.deleteUserById(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.patch('/updateUserById/:id', { schema: { params: userIdParamSchema, body: userSchemaUpdate } }, async (request: any, reply) => {
        try {
            const user = await userController.updateUserById(request, reply);
            reply.send(user);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.put('/updateUserById/:id', { schema: { params: userIdParamSchema, body: userSchemaPost } }, async (request: any, reply) => {
        try {
            const user = await userController.updateUserById(request, reply);
            reply.send(user);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.get('/searchUsersByTitle', { schema: { querystring: userQuerySchema } }, async (request: any, reply) => {
        try {
            const users = await userController.searchUsersByTitle(request, reply);
            reply.send(users);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/bookmarkMovie', { schema: { body: userMovieFavoriteSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.bookmarkMovie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/bookmarkSerie', { schema: { body: userSerieFavoriteSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.bookmarkSerie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/unBookmarkMovie', { schema: { body: userMovieFavoriteSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.unBookmarkMovie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/unBookmarkSerie', { schema: { body: userSerieFavoriteSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.unBookmarkSerie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/addReviewMovie', { schema: { body: movieReviewSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.addReviewMovie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/addReviewSerie', { schema: { body: serieReviewSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.addReviewSerie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/updateReviewMovie', { schema: { body: movieReviewSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.updateReviewMovie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/updateReviewSerie', { schema: { body: serieReviewSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.updateReviewSerie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/removeReviewMovie', { schema: { body: movieReviewSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.removeReviewMovie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/removeReviewSerie', { schema: { body: serieReviewSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.removeReviewSerie(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/addUpvoteMovieReview', { schema: { body: upvoteMovieSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.addUpvoteMovieReview(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/addUpvoteSerieReview', { schema: { body: upvoteSerieSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.addUpvoteSerieReview(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/removeUpvoteMovieReview', { schema: { body: upvoteMovieSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.removeUpvoteMovieReview(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/removeUpvoteSerieReview', { schema: { body: upvoteSerieSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.removeUpvoteSerieReview(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/addDownvoteMovieReview', { schema: { body: downvoteMovieSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.addDownvoteMovieReview(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/addDownvoteSerieReview', { schema: { body: downvoteSerieSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.addDownvoteSerieReview(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/removeDownvoteMovieReview', { schema: { body: downvoteMovieSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.removeDownvoteMovieReview(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });

    fastify.post('/removeDownvoteSerieReview', { schema: { body: downvoteSerieSchema } }, async (request: any, reply) => {
        try {
            const result = await userController.removeDownvoteSerieReview(request, reply);
            reply.send(result);
        } catch (error) {
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });
};

export default userRoutes;
