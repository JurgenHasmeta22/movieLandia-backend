import { FastifyPluginAsync } from 'fastify';
import serieController from '../controllers/serie.controller';

const serieRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/series', {
        handler: serieController.seriesPageView,
    });

    fastify.get('/series/:title', {
        handler: serieController.seriePageView,
    });
};

export default serieRoutes;
