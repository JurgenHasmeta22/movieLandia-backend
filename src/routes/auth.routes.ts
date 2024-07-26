import { FastifyPluginAsync } from 'fastify';
import authController from '../controllers/auth.controller';
import trackLastPageMiddleware from '../middlewares/trackLastPage.middleware';

const authRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/login', {
        handler: authController.loginPageView,
    });

    fastify.post('/login', {
        preHandler: trackLastPageMiddleware,
        handler: authController.loginPost,
    });

    fastify.get('/register', {
        handler: authController.registerPageView,
    });

    fastify.post('/register', {
        handler: authController.registerPost,
    });

    fastify.post('/logout', {
        handler: authController.logout,
    });
};

export default authRoutes;
