import fp from 'fastify-plugin';
import movieController from '../controllers/REST/movie.controller';
import {
    movieSchemaUpdate,
    movieSchemaPost,
    movieQuerySchema,
    movieIdParamSchema,
    movieTitleParamSchema,
} from '../schemas/movie.schema';

async function movieRoutes(fastify: any, options: any) {
    fastify.get('/getMovies', {
        schema: {
            querystring: movieQuerySchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: movieController.getMovies,
    });

    fastify.get('/getMovieById/:id', {
        schema: {
            params: movieIdParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: movieController.getMovieById,
    });

    fastify.get('/getMovieByTitle/:title', {
        schema: {
            params: movieTitleParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: movieController.getMovieByTitle,
    });

    fastify.delete('/deleteMovieById/:id', {
        schema: {
            params: movieIdParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: movieController.deleteMovieById,
    });

    fastify.patch('/updateMovieById/:id', {
        schema: {
            params: movieIdParamSchema,
            body: movieSchemaUpdate,
        },
        preHandler: fastify.validateMiddleware,
        handler: movieController.updateMovieById,
    });

    fastify.put('/updateMovieById/:id', {
        schema: {
            params: movieIdParamSchema,
            body: movieSchemaPost,
        },
        preHandler: fastify.validateMiddleware,
        handler: movieController.updateMovieById,
    });

    fastify.post('/addMovie', {
        schema: {
            body: movieSchemaPost,
        },
        preHandler: fastify.validateMiddleware,
        handler: movieController.addMovie,
    });

    fastify.get('/searchMoviesByTitle', movieController.searchMoviesByTitle);
    fastify.get('/getLatestMovies', movieController.getLatestMovies);
    fastify.get('/getRelatedMovies', movieController.getRelatedMovies);
}

export default fp(movieRoutes);
