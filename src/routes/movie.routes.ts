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
import { latestMoviesSchema } from '../schemas/latestMovies.schema';

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

    fastify.get('/searchMoviesByTitle', {
        schema: movieTitleParamSchema,
        handler: movieController.searchMoviesByTitle,
    });

    fastify.get('/getRelatedMovies', {
        schema: movieTitleParamSchema,
        handler: movieController.getRelatedMovies,
    });
    
    fastify.get('/getLatestMovies', {
        schema: latestMoviesSchema,
        handler: movieController.getLatestMovies,
    });
};

export default fp(movieRoutes);
