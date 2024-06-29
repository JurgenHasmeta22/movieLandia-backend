import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
// import { options as swaggerOptions } from './utils/swagger'; // Adjusted import name for clarity
import movieRoutes from './routes/movie.routes';
import episodeRoutes from './routes/episode.routes';
import genreRoutes from './routes/genre.routes';
import serieRoutes from './routes/serie.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import viewsRoutes from './routes/views.routes';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import path from 'path';
import 'dotenv/config';
import fastifySession from '@fastify/session';
import fastifyFlash from '@fastify/flash';
import fastifyCookie from '@fastify/cookie';
import ejs from 'ejs';

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const createServer = async () => {
    const server = fastify({ logger: true });

    server.register(fastifyCors);

    await server.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'Movielandia24',
                description: 'API documentation',
                version: '1.0.0',
            },
        },
    });
    await server.register(require('@fastify/swagger-ui'), {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false,
        },
        uiHooks: {
            onRequest: function (next: any) {
                next();
            },
            preHandler: function (next: any) {
                next();
            },
        },
        staticCSP: true,
        transformStaticCSP: (header: any) => header,
        transformSpecification: (swaggerObject: any) => {
            return swaggerObject;
        },
        transformSpecificationClone: true,
    });

    server.register(fastifyStatic, {
        root: path.join(__dirname, 'public'),
    });

    server.register(fastifyView, {
        engine: {
            ejs,
        },
        root: path.join(__dirname, 'views'),
        layout: 'layouts/MainLayout.ejs',
        propertyName: 'render',
    });

    server.register(fastifyCookie);
    server.register(fastifySession, {
        secret: process.env.MY_SECRET || 'defaultSecret',
        cookie: { secure: false },
    });
    server.register(fastifyFlash);
    server.register(require('@fastify/formbody'));

    server.register(viewsRoutes);
    server.register(authRoutes);
    server.register(movieRoutes);
    server.register(serieRoutes);
    server.register(genreRoutes);
    server.register(episodeRoutes);
    server.register(userRoutes);

    server.setErrorHandler((error, request, reply) => {
        server.log.error(error);
        reply.status(500).send({ error: 'Internal Server Error' });
    });

    return server;
};

export default createServer;
