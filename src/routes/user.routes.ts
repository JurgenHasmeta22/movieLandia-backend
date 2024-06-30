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
        schema: userQuerySchema,
        handler: userController.getUsers,
    });

    fastify.get('/getUserById/:id', {
        schema: userIdParamSchema,
        handler: userController.getUserById,
    });

    fastify.get('/getUserByTitle/:userName', {
        schema: userUserNameParamSchema,
        handler: userController.getUserByTitle,
    });

    fastify.delete('/deleteUserById/:id', {
        schema: userIdParamSchema,
        handler: userController.deleteUserById,
    });

    fastify.patch('/updateUserById/:id', {
        schema: userSchemaPost,

        handler: userController.updateUserById,
    });

    fastify.put('/updateUserById/:id', {
        schema: userSchemaUpdate,
        handler: userController.updateUserById,
    });

    fastify.get('/searchUsersByTitle', {
        schema: userQuerySchema,
        handler: userController.searchUsersByTitle,
    });

    fastify.post('/bookmarkMovie', {
        schema: userMovieFavoriteSchema,
        handler: userController.bookmarkMovie,
    });

    fastify.post('/bookmarkSerie', {
        schema: userSerieFavoriteSchema,
        handler: userController.bookmarkSerie,
    });

    fastify.post('/unBookmarkMovie', {
        schema: userMovieFavoriteSchema,
        handler: userController.unBookmarkMovie,
    });

    fastify.post('/unBookmarkSerie', {
        schema: userSerieFavoriteSchema,
        handler: userController.unBookmarkSerie,
    });

    fastify.post('/addReviewMovie', {
        schema: movieReviewSchema,
        handler: userController.addReviewMovie,
    });

    fastify.post('/addReviewSerie', {
        schema: serieReviewSchema,
        handler: userController.addReviewSerie,
    });

    fastify.post('/updateReviewMovie', {
        schema: movieReviewSchema,
        handler: userController.updateReviewMovie,
    });

    fastify.post('/updateReviewSerie', {
        schema: serieReviewSchema,
        handler: userController.updateReviewSerie,
    });

    fastify.post('/removeReviewMovie', {
        schema: movieReviewSchema,
        handler: userController.removeReviewMovie,
    });

    fastify.post('/removeReviewSerie', {
        schema: serieReviewSchema,
        handler: userController.removeReviewSerie,
    });

    fastify.post('/addUpvoteMovieReview', {
        schema: upvoteMovieSchema,
        handler: userController.addUpvoteMovieReview,
    });

    fastify.post('/addUpvoteSerieReview', {
        schema: upvoteSerieSchema,
        handler: userController.addUpvoteSerieReview,
    });

    fastify.post('/removeUpvoteMovieReview', {
        schema: upvoteMovieSchema,
        handler: userController.removeUpvoteMovieReview,
    });

    fastify.post('/removeUpvoteSerieReview', {
        schema: upvoteSerieSchema,
        handler: userController.removeUpvoteSerieReview,
    });

    fastify.post('/addDownvoteMovieReview', {
        schema: downvoteMovieSchema,
        handler: userController.addDownvoteMovieReview,
    });

    fastify.post('/addDownvoteSerieReview', {
        schema: downvoteSerieSchema,
        handler: userController.addDownvoteSerieReview,
    });

    fastify.post('/removeDownvoteMovieReview', {
        schema: downvoteMovieSchema,
        handler: userController.removeDownvoteMovieReview,
    });

    fastify.post('/removeDownvoteSerieReview', {
        schema: downvoteSerieSchema,
        handler: userController.removeDownvoteSerieReview,
    });
};

export default userRoutes;
