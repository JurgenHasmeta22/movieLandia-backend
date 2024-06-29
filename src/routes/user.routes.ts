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
    fastify.get('/getUsers', {
        schema: { querystring: userQuerySchema },
        handler: userController.getUsers,
    });

    fastify.get('/getUserById/:id', {
        schema: { params: userIdParamSchema },
        handler: userController.getUserById,
    });

    fastify.get('/getUserByTitle/:userName', {
        schema: { params: userUserNameParamSchema },
        handler: userController.getUserByTitle,
    });

    fastify.delete('/deleteUserById/:id', {
        schema: { params: userIdParamSchema },
        handler: userController.deleteUserById,
    });

    fastify.patch('/updateUserById/:id', {
        schema: {
            params: userIdParamSchema,
            body: userSchemaPost,
        },
        handler: userController.updateUserById,
    });

    fastify.put('/updateUserById/:id', {
        schema: {
            params: userIdParamSchema,
            body: userSchemaUpdate,
        },
        handler: userController.updateUserById,
    });

    fastify.get('/searchUsersByTitle', {
        schema: { querystring: userQuerySchema },
        handler: userController.searchUsersByTitle,
    });

    fastify.post('/bookmarkMovie', {
        schema: { body: userMovieFavoriteSchema },
        handler: userController.bookmarkMovie,
    });

    fastify.post('/bookmarkSerie', {
        schema: { body: userSerieFavoriteSchema },
        handler: userController.bookmarkSerie,
    });

    fastify.post('/unBookmarkMovie', {
        schema: { body: userMovieFavoriteSchema },
        handler: userController.unBookmarkMovie,
    });

    fastify.post('/unBookmarkSerie', {
        schema: { body: userSerieFavoriteSchema },
        handler: userController.unBookmarkSerie,
    });

    fastify.post('/addReviewMovie', {
        schema: { body: movieReviewSchema },
        handler: userController.addReviewMovie,
    });

    fastify.post('/addReviewSerie', {
        schema: { body: serieReviewSchema },
        handler: userController.addReviewSerie,
    });

    fastify.post('/updateReviewMovie', {
        schema: { body: movieReviewSchema },
        handler: userController.updateReviewMovie,
    });

    fastify.post('/updateReviewSerie', {
        schema: { body: serieReviewSchema },
        handler: userController.updateReviewSerie,
    });

    fastify.post('/removeReviewMovie', {
        schema: { body: movieReviewSchema },
        handler: userController.removeReviewMovie,
    });

    fastify.post('/removeReviewSerie', {
        schema: { body: serieReviewSchema },
        handler: userController.removeReviewSerie,
    });

    fastify.post('/addUpvoteMovieReview', {
        schema: { body: upvoteMovieSchema },
        handler: userController.addUpvoteMovieReview,
    });

    fastify.post('/addUpvoteSerieReview', {
        schema: { body: upvoteSerieSchema },
        handler: userController.addUpvoteSerieReview,
    });

    fastify.post('/removeUpvoteMovieReview', {
        schema: { body: upvoteMovieSchema },
        handler: userController.removeUpvoteMovieReview,
    });

    fastify.post('/removeUpvoteSerieReview', {
        schema: { body: upvoteSerieSchema },
        handler: userController.removeUpvoteSerieReview,
    });

    fastify.post('/addDownvoteMovieReview', {
        schema: { body: downvoteMovieSchema },
        handler: userController.addDownvoteMovieReview,
    });

    fastify.post('/addDownvoteSerieReview', {
        schema: { body: downvoteSerieSchema },
        handler: userController.addDownvoteSerieReview,
    });

    fastify.post('/removeDownvoteMovieReview', {
        schema: { body: downvoteMovieSchema },
        handler: userController.removeDownvoteMovieReview,
    });

    fastify.post('/removeDownvoteSerieReview', {
        schema: { body: downvoteSerieSchema },
        handler: userController.removeDownvoteSerieReview,
    });
};

export default userRoutes;
