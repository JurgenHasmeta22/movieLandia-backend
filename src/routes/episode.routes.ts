import fp from 'fastify-plugin';
import episodeController from '../controllers/REST/episode.controller';
import {
    episodeSchemaUpdate,
    episodeSchemaPost,
    episodeQuerySchema,
    episodeIdParamSchema,
    episodeTitleParamSchema,
    episodeSchemaPut,
} from '../schemas/episode.schema';
import { FastifyPluginAsync } from 'fastify';

const episodeRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/getEpisodes', {
        schema: episodeQuerySchema,
        handler: episodeController.getEpisodes,
    });

    fastify.get('/getEpisodeById/:id', {
        schema: episodeIdParamSchema,
        handler: episodeController.getEpisodeById,
    });

    fastify.get('/getEpisodeByTitle/:title', {
        schema: episodeTitleParamSchema,
        handler: episodeController.getEpisodeByTitle,
    });

    fastify.delete('/deleteEpisodeById/:id', {
        schema: episodeIdParamSchema,
        handler: episodeController.deleteEpisodeById,
    });

    fastify.patch('/updateEpisodeById/:id', {
        schema: episodeSchemaUpdate,
        handler: episodeController.updateEpisodeById,
    });

    fastify.put('/updateEpisodeById/:id', {
        schema: episodeSchemaPut,
        handler: episodeController.updateEpisodeById,
    });

    fastify.post('/addEpisode', {
        schema: episodeSchemaPost,
        handler: episodeController.addEpisode,
    });

    fastify.get('/searchEpisodesByTitle', episodeController.searchEpisodesByTitle);
};

export default fp(episodeRoutes);
