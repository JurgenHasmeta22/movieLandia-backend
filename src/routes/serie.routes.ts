import fp from 'fastify-plugin';
import serieController from '../controllers/REST/serie.controller';
import {
    serieSchemaUpdate,
    serieSchemaPost,
    serieQuerySchema,
    serieIdParamSchema,
    serieTitleParamSchema,
    serieSchemaPut,
} from '../schemas/serie.schema';
import { seasonSerieSchema } from '../schemas/seasonSerie.schema';
import { FastifyPluginAsync } from 'fastify';

const serieRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/getSeries', {
        schema: serieQuerySchema,
        handler: serieController.getSeries,
    });

    fastify.get('/getSerieById/:id', {
        schema: serieIdParamSchema,
        handler: serieController.getSerieById,
    });

    fastify.get('/getSerieByTitle/:title', {
        schema: serieTitleParamSchema,
        handler: serieController.getSerieByTitle,
    });

    fastify.delete('/deleteSerieById/:id', {
        schema: serieIdParamSchema,
        handler: serieController.deleteSerieById,
    });

    fastify.patch('/updateSerieById/:id', {
        schema: serieSchemaUpdate,
        handler: serieController.updateSerieById,
    });

    fastify.put('/updateSerieById/:id', {
        schema: serieSchemaPut,
        handler: serieController.updateSerieById,
    });

    fastify.post('/addSerie', {
        schema: serieSchemaPost,
        handler: serieController.addSerie,
    });

    fastify.get('/searchSeriesByTitle', serieController.searchSeriesByTitle);
    fastify.get('/getLatestSeries', serieController.getLatestSeries);
    fastify.get('/getRelatedSeries', serieController.getRelatedSeries);

    fastify.post('/addSeasonToSerie', {
        schema: seasonSerieSchema,
        handler: serieController.addSeasonToSerie,
    });
};

export default fp(serieRoutes);
