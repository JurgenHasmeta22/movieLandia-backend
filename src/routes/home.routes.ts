import { FastifyPluginAsync } from 'fastify';
import homeController from '../controllers/home.controller';

const viewRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', {
        handler: homeController.homePageView,
    });
};

export default viewRoutes;
