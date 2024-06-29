import fp from 'fastify-plugin';
import movieController from '../controllers/REST/movie.controller';
import {
    movieSchemaUpdate,
    movieSchemaPost,
    movieQuerySchema,
    movieIdParamSchema,
    movieTitleParamSchema,
} from '../schemas/movie.schema';
// import validateMiddleware from '../middlewares/validate.middleware';

async function movieRoutes(fastify: any, options: any) {
    fastify.get('/getMovies', {
        schema: movieQuerySchema,
        // preHandler: fastify.validateMiddleware,
        handler: movieController.getMovies,
    });

    fastify.get('/getMovieById/:id', {
        schema: movieIdParamSchema,
        // preHandler: validateMiddleware,
        handler: movieController.getMovieById,
    });

    fastify.get('/getMovieByTitle/:title', {
        schema: movieTitleParamSchema,
        // preHandler: validateMiddleware,
        handler: movieController.getMovieByTitle,
    });

    fastify.delete('/deleteMovieById/:id', {
        schema: movieIdParamSchema,
        // preHandler: validateMiddleware,
        handler: movieController.deleteMovieById,
    });

    fastify.patch('/updateMovieById/:id', {
        schema: {
            movieIdParamSchema,
            movieSchemaUpdate,
        },
        // preHandler: validateMiddleware,
        handler: movieController.updateMovieById,
    });

    fastify.put('/updateMovieById/:id', {
        schema: {
            movieIdParamSchema,
            movieSchemaPost,
        },
        // preHandler: validateMiddleware,
        handler: movieController.updateMovieById,
    });

    fastify.post('/addMovie', {
        schema: movieSchemaPost,
        // preHandler: validateMiddleware,
        handler: movieController.addMovie,
    });

    fastify.get('/searchMoviesByTitle', movieController.searchMoviesByTitle);
    fastify.get('/getLatestMovies', movieController.getLatestMovies);
    fastify.get('/getRelatedMovies', movieController.getRelatedMovies);
}

export default fp(movieRoutes);
