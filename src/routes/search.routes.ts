import { FastifyPluginAsync } from 'fastify';
import searchController from '../controllers/search.controller';

const searchRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/search', {
        handler: searchController.searchPageView,
    });
};

export default searchRoutes;
