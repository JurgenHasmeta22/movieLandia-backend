import fp from 'fastify-plugin';
import authController from '../controllers/REST/auth.controller';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

async function authRoutes(fastify: any, options: any) {
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
}

export default fp(authRoutes);
