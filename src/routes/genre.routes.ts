import fp from 'fastify-plugin';
import genreController from '../controllers/REST/genre.controller';
import {
    genreSchemaPost,
    genreSchemaUpdate,
    genreQuerySchema,
    genreIdParamSchema,
    genreNameParamSchema,
    genreSchemaPut,
} from '../schemas/genre.schema';
import { FastifyPluginAsync } from 'fastify';

const genreRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/getGenres', {
        schema: genreQuerySchema,
        handler: genreController.getGenres,
    });

    fastify.get('/getGenreById/:id', {
        schema: genreIdParamSchema,
        handler: genreController.getGenreById,
    });

    fastify.get('/getGenreByName/:name', {
        schema: genreNameParamSchema,
        handler: genreController.getGenreByName,
    });

    fastify.delete('/deleteGenreById/:id', {
        schema: genreIdParamSchema,
        handler: genreController.deleteGenreById,
    });

    fastify.put('/updateGenreById/:id', {
        schema: genreSchemaPut,
        handler: genreController.updateGenreById,
    });

    fastify.patch('/updateGenreById/:id', {
        schema: genreSchemaUpdate,
        handler: genreController.updateGenreById,
    });

    fastify.post('/addGenre', {
        schema: genreSchemaPost,
        handler: genreController.addGenre,
    });

    fastify.get('/searchGenresByTitle', { schema: genreNameParamSchema, handler: genreController.searchGenresByName });
};

export default fp(genreRoutes);
