import fp from 'fastify-plugin';
import authController from '../controllers/REST/auth.controller';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

async function authRoutes(fastify: any, options: any) {
    fastify.post('/registerUser', {
        schema: {
            body: registerSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: authController.signUp,
    });

    fastify.post('/loginUser', {
        schema: {
            body: loginSchema,
        },
        preHandler: fastify.validateMiddleware,
        handler: authController.login,
    });

    fastify.get('/validateUser', {
        preHandler: fastify.authMiddleware,
        handler: authController.validate,
    });
}

export default fp(authRoutes);
