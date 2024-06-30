import fp from 'fastify-plugin';
import movieController from '../controllers/REST/movie.controller';
import {
    movieSchemaUpdate,
    movieSchemaPost,
    movieQuerySchema,
    movieIdParamSchema,
    movieTitleParamSchema,
    movieSchemaPut,
} from '../schemas/movie.schema';
import { FastifyPluginAsync } from 'fastify';

const movieRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/getMovies', {
        schema: movieQuerySchema,
        handler: movieController.getMovies,
    });

    fastify.get('/getMovieById/:id', {
        schema: movieIdParamSchema,
        handler: movieController.getMovieById,
    });

    fastify.get('/getMovieByTitle/:title', {
        schema: movieTitleParamSchema,
        handler: movieController.getMovieByTitle,
    });

    fastify.delete('/deleteMovieById/:id', {
        schema: movieIdParamSchema,
        handler: movieController.deleteMovieById,
    });

    fastify.patch('/updateMovieById/:id', {
        schema: movieSchemaUpdate,
        handler: movieController.updateMovieById,
    });

    fastify.put('/updateMovieById/:id', {
        schema: movieSchemaPut,
        handler: movieController.updateMovieById,
    });

    fastify.post('/addMovie', {
        schema: movieSchemaPost,
        handler: movieController.addMovie,
    });

    fastify.get('/searchMoviesByTitle', movieController.searchMoviesByTitle);
    fastify.get('/getLatestMovies', movieController.getLatestMovies);
    fastify.get('/getRelatedMovies', movieController.getRelatedMovies);
};

export default fp(movieRoutes);
