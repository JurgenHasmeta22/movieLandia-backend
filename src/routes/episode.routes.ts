import fp from 'fastify-plugin';
import episodeController from '../controllers/REST/episode.controller';
import {
    episodeSchemaUpdate,
    episodeSchemaPost,
    episodeQuerySchema,
    episodeIdParamSchema,
    episodeTitleParamSchema,
} from '../schemas/episode.schema';

async function episodeRoutes(fastify: any, options: any) {
    fastify.get('/getEpisodes', {
        schema: {
            querystring: episodeQuerySchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: episodeController.getEpisodes,
    });

    fastify.get('/getEpisodeById/:id', {
        schema: {
            params: episodeIdParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: episodeController.getEpisodeById,
    });

    fastify.get('/getEpisodeByTitle/:title', {
        schema: {
            params: episodeTitleParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: episodeController.getEpisodeByTitle,
    });

    fastify.delete('/deleteEpisodeById/:id', {
        schema: {
            params: episodeIdParamSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: episodeController.deleteEpisodeById,
    });

    fastify.patch('/updateEpisodeById/:id', {
        schema: {
            params: episodeIdParamSchema,
            body: episodeSchemaUpdate,
        },
        preHandler: fastify.validateMiddleware,
        handler: episodeController.updateEpisodeById,
    });

    fastify.put('/updateEpisodeById/:id', {
        schema: {
            params: episodeIdParamSchema,
            body: episodeSchemaPost,
        },
        preHandler: fastify.validateMiddleware,
        handler: episodeController.updateEpisodeById,
    });

    fastify.post('/addEpisode', {
        schema: {
            body: episodeSchemaPost,
        },
        preHandler: fastify.validateMiddleware,
        handler: episodeController.addEpisode,
    });

    fastify.get('/searchEpisodesByTitle', episodeController.searchEpisodesByTitle);
}

export default fp(episodeRoutes);
