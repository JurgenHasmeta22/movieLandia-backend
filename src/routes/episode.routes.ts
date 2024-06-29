import fp from 'fastify-plugin';
import episodeController from '../controllers/REST/episode.controller';
import {
    episodeSchemaUpdate,
    episodeSchemaPost,
    episodeQuerySchema,
    episodeIdParamSchema,
    episodeTitleParamSchema,
} from '../schemas/episode.schema';
import { FastifyPluginAsync } from 'fastify';

const episodeRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/getEpisodes', {
        schema: { querystring: episodeQuerySchema },
        handler: episodeController.getEpisodes,
    });

    fastify.get('/getEpisodeById/:id', {
        schema: { params: episodeIdParamSchema },
        handler: episodeController.getEpisodeById,
    });

    fastify.get('/getEpisodeByTitle/:title', {
        schema: { params: episodeTitleParamSchema },
        handler: episodeController.getEpisodeByTitle,
    });

    fastify.delete('/deleteEpisodeById/:id', {
        schema: { params: episodeIdParamSchema },
        handler: episodeController.deleteEpisodeById,
    });

    fastify.patch('/updateEpisodeById/:id', {
        schema: { params: episodeIdParamSchema, body: episodeSchemaUpdate },
        handler: episodeController.updateEpisodeById,
    });

    fastify.put('/updateEpisodeById/:id', {
        schema: { params: episodeIdParamSchema, body: episodeSchemaPost },
        handler: episodeController.updateEpisodeById,
    });

    fastify.post('/addEpisode', {
        schema: { body: episodeSchemaPost },
        handler: episodeController.addEpisode,
    });

    fastify.get('/searchEpisodesByTitle', episodeController.searchEpisodesByTitle);
};

export default fp(episodeRoutes);
