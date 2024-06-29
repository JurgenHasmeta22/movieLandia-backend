import fp from 'fastify-plugin';
import genreController from '../controllers/REST/genre.controller';
import {
    genreSchemaPost,
    genreSchemaUpdate,
    genreQuerySchema,
    genreIdParamSchema,
    genreNameParamSchema,
} from '../schemas/genre.schema';
import { FastifyPluginAsync } from 'fastify';

const genreRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/getGenres', {
        schema: {
            querystring: genreQuerySchema,
        },
        handler: genreController.getGenres,
    });

    fastify.get('/getGenreById/:id', {
        schema: {
            params: genreIdParamSchema,
        },
        handler: genreController.getGenreById,
    });

    fastify.get('/getGenreByName/:name', {
        schema: {
            params: genreNameParamSchema,
        },
        handler: genreController.getGenreByName,
    });

    fastify.delete('/deleteGenreById/:id', {
        schema: {
            params: genreIdParamSchema,
        },
        handler: genreController.deleteGenreById,
    });

    fastify.put('/updateGenreById/:id', {
        schema: {
            params: genreIdParamSchema,
            body: genreSchemaPost,
        },
        handler: genreController.updateGenreById,
    });

    fastify.patch('/updateGenreById/:id', {
        schema: {
            params: genreIdParamSchema,
            body: genreSchemaUpdate,
        },
        handler: genreController.updateGenreById,
    });

    fastify.post('/addGenre', {
        schema: {
            body: genreSchemaPost,
        },
        handler: genreController.addGenre,
    });

    fastify.get('/searchGenresByTitle', genreController.searchGenresByName);
};

export default fp(genreRoutes);
