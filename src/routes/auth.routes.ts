import fp from 'fastify-plugin';
import authController from '../controllers/REST/auth.controller';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { FastifyPluginAsync } from 'fastify';

const authRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post('/registerUser', {
        schema: registerSchema,
        handler: authController.signUp,
    });

    fastify.post('/loginUser', {
        schema: loginSchema,
        handler: authController.login,
    });

    fastify.get('/validateUser', {
        // preHandler: validateMiddleware,
        handler: authController.validate,
    });
};

export default fp(authRoutes);
