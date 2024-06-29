import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import movieRoutes from './routes/movie.routes';
import episodeRoutes from './routes/episode.routes';
import genreRoutes from './routes/genre.routes';
import serieRoutes from './routes/serie.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import viewsRoutes from './routes/views.routes';
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

const server = fastify({ logger: true });

server.register(fastifyCors);

server.register(require('@fastify/swagger'));
server.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
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

const start = async () => {
    try {
        await server.listen(4000);
        server.log.info('Server up: http://localhost:4000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
