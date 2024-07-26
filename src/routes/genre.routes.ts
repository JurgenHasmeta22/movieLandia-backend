import { FastifyPluginAsync } from 'fastify';
import genreController from '../controllers/genre.controller';

const genreRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/genres', {
        handler: genreController.genresPageView,
    });

    fastify.get('/genres/:name', {
        handler: genreController.genrePageView,
    });
};

export default genreRoutes;
