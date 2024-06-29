import fp from 'fastify-plugin';
import serieController from '../controllers/REST/serie.controller';
import {
    serieSchemaUpdate,
    serieSchemaPost,
    serieQuerySchema,
    serieIdParamSchema,
    serieTitleParamSchema,
} from '../schemas/serie.schema';
import { seasonSerieSchema } from '../schemas/seasonSerie.schema';

async function serieRoutes(fastify: any, options: any) {
    fastify.get('/getSeries', {
        schema: {
            querystring: serieQuerySchema,
        },
        // preHandler: validateMiddleware,
        handler: serieController.getSeries,
    });

    fastify.get('/getSerieById/:id', {
        schema: {
            params: serieIdParamSchema,
        },
        // preHandler: validateMiddleware,
        handler: serieController.getSerieById,
    });

    fastify.get('/getSerieByTitle/:title', {
        schema: {
            params: serieTitleParamSchema,
        },
        // preHandler: validateMiddleware,
        handler: serieController.getSerieByTitle,
    });

    fastify.delete('/deleteSerieById/:id', {
        schema: {
            params: serieIdParamSchema,
        },
        // preHandler: validateMiddleware,
        handler: serieController.deleteSerieById,
    });

    fastify.patch('/updateSerieById/:id', {
        schema: {
            params: serieIdParamSchema,
            body: serieSchemaUpdate,
        },
        // preHandler: validateMiddleware,
        handler: serieController.updateSerieById,
    });

    fastify.put('/updateSerieById/:id', {
        schema: {
            params: serieIdParamSchema,
            body: serieSchemaPost,
        },
        // preHandler: validateMiddleware,
        handler: serieController.updateSerieById,
    });

    fastify.post('/addSerie', {
        schema: {
            body: serieSchemaPost,
        },
        // preHandler: validateMiddleware,
        handler: serieController.addSerie,
    });

    fastify.get('/searchSeriesByTitle', serieController.searchSeriesByTitle);
    fastify.get('/getLatestSeries', serieController.getLatestSeries);
    fastify.get('/getRelatedSeries', serieController.getRelatedSeries);

    fastify.post('/addSeasonToSerie', {
        schema: {
            body: seasonSerieSchema,
        },
        // preHandler: validateMiddleware,
        handler: serieController.addSeasonToSerie,
    });
}

export default fp(serieRoutes);
