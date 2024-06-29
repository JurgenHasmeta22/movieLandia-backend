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
        schema: episodeQuerySchema,
        // preHandler: validateMiddleware,
        handler: episodeController.getEpisodes,
    });

    fastify.get('/getEpisodeById/:id', {
        schema: episodeIdParamSchema,
        // preHandler: validateMiddleware,
        handler: episodeController.getEpisodeById,
    });

    fastify.get('/getEpisodeByTitle/:title', {
        schema: episodeTitleParamSchema,
        // preHandler: validateMiddleware,
        handler: episodeController.getEpisodeByTitle,
    });

    fastify.delete('/deleteEpisodeById/:id', {
        schema: episodeIdParamSchema,
        // preHandler: validateMiddleware,
        handler: episodeController.deleteEpisodeById,
    });

    fastify.patch('/updateEpisodeById/:id', {
        schema: episodeIdParamSchema,
        episodeSchemaUpdate,
        // preHandler: validateMiddleware,
        handler: episodeController.updateEpisodeById,
    });

    fastify.put('/updateEpisodeById/:id', {
        schema: episodeIdParamSchema,
        episodeSchemaPost,
        // preHandler: validateMiddleware,
        handler: episodeController.updateEpisodeById,
    });

    fastify.post('/addEpisode', {
        schema: episodeSchemaPost, 
        // preHandler: validateMiddleware,
        handler: episodeController.addEpisode,
    });

    fastify.get('/searchEpisodesByTitle', episodeController.searchEpisodesByTitle);
}

export default fp(episodeRoutes);
