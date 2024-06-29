import fp from 'fastify-plugin';
import movieController from '../controllers/REST/movie.controller';
import {
    movieSchemaUpdate,
    movieSchemaPost,
    movieQuerySchema,
    movieIdParamSchema,
    movieTitleParamSchema,
} from '../schemas/movie.schema';
import { FastifyPluginAsync } from 'fastify';

const movieRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/getMovies', {
        schema: {
            querystring: movieQuerySchema,
        },
        handler: movieController.getMovies,
    });

    fastify.get('/getMovieById/:id', {
        schema: { params: movieIdParamSchema },
        handler: movieController.getMovieById,
    });

    fastify.get('/getMovieByTitle/:title', {
        schema: { params: movieTitleParamSchema },
        handler: movieController.getMovieByTitle,
    });

    fastify.delete('/deleteMovieById/:id', {
        schema: { params: movieIdParamSchema },
        handler: movieController.deleteMovieById,
    });

    fastify.patch('/updateMovieById/:id', {
        schema: {
            params: { params: movieIdParamSchema },
            body: movieSchemaUpdate,
        },
        handler: movieController.updateMovieById,
    });

    fastify.put('/updateMovieById/:id', {
        schema: {
            params: { params: movieIdParamSchema },
            body: movieSchemaPost,
        },
        handler: movieController.updateMovieById,
    });

    fastify.post('/addMovie', {
        schema: { body: movieSchemaPost },
        handler: movieController.addMovie,
    });

    fastify.get('/searchMoviesByTitle', movieController.searchMoviesByTitle);
    fastify.get('/getLatestMovies', movieController.getLatestMovies);
    fastify.get('/getRelatedMovies', movieController.getRelatedMovies);
};

export default fp(movieRoutes);
