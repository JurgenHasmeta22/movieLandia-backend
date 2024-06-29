import fp from 'fastify-plugin';
import genreController from '../controllers/REST/genre.controller';
import {
    genreSchemaPost,
    genreSchemaUpdate,
    genreQuerySchema,
    genreIdParamSchema,
    genreNameParamSchema,
} from '../schemas/genre.schema';

async function genreRoutes(fastify: any, options: any) {
    fastify.get('/getGenres', {
        schema: {
            querystring: genreQuerySchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: genreController.getGenres,
    });

    fastify.get('/getGenreById/:id', {
        schema: {
            params: genreIdParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: genreController.getGenreById,
    });

    fastify.get('/getGenreByName/:name', {
        schema: {
            params: genreNameParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: genreController.getGenreByName,
    });

    fastify.delete('/deleteGenreById/:id', {
        schema: {
            params: genreIdParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: genreController.deleteGenreById,
    });

    fastify.put('/updateGenreById/:id', {
        schema: {
            params: genreIdParamSchema,
            body: genreSchemaPost,
        },
        preHandler: fastify.validateMiddleware,
        handler: genreController.updateGenreById,
    });

    fastify.patch('/updateGenreById/:id', {
        schema: {
            params: genreIdParamSchema,
            body: genreSchemaUpdate,
        },
        preHandler: fastify.validateMiddleware,
        handler: genreController.updateGenreById,
    });

    fastify.post('/addGenre', {
        schema: {
            body: genreSchemaPost,
        },
        preHandler: fastify.validateMiddleware,
        handler: genreController.addGenre,
    });

    fastify.get('/searchGenresByTitle', genreController.searchGenresByName);
}

export default fp(genreRoutes);
