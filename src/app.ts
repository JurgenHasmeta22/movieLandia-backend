// #region "Imports"
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
import fastifyJwt from '@fastify/jwt';
// #endregion

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
const server = fastify({ logger: true });

server.register(fastifyCors);
server.register(require('@fastify/formbody'));

// #region "Swagger config"
server.register(require('@fastify/swagger'), {
    swagger: {
        info: {
            title: 'Movies API',
            version: '1.0.0',
            description: 'Movies API',
        },
        host: 'localhost:4000',
        schemes: ['http'],
        consumes: ['application/json, multipart/form-data'],
        produces: ['application/json, text/html'],
    },
});
server.register(require('@fastify/swagger-ui'), {
    routePrefix: '/api-docs',
    uiConfig: {
        docExpansion: 'none',
        deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    transformSpecification: (swaggerObject: any) => swaggerObject,
    transformSpecificationClone: true,
});
// #endregion

// #region "Views, public, cookie, sessions config, flash"
server.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
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
server.register(fastifyJwt, {
    secret: process.env.MY_SECRET || 'defaultSecret',
});
server.register(fastifyFlash);
// #endregion

// #region "Routes"
server.register(viewsRoutes);
server.register(authRoutes);
server.register(movieRoutes);
server.register(serieRoutes);
server.register(genreRoutes);
server.register(episodeRoutes);
server.register(userRoutes);
// #endregion

// #region "Auth decorators"
server.decorate('createToken', function (id: number) {
    const token = server.jwt.sign({ id: id }, { expiresIn: '1d' });

    if (token) {
        return token;
    } else {
        return null;
    }
});

server.decorate('getUserFromToken', async function (token: string) {
    try {
        const data: any = server.jwt.verify(token);
        const user = await prisma.user.findUnique({
            where: { id: data.id },
            include: {
                favMovies: { include: { movie: true } },
                favSeries: { include: { serie: true } },
                movieReviews: { include: { movie: true } },
                serieReviews: { include: { serie: true } },
                upvotedMovies: { include: { movieReview: true, movie: true } },
                downvotedMovies: { include: { movieReview: true, movie: true } },
                upvotedSeries: { include: { serieReview: true, serie: true } },
                downvotedSeries: { include: { serieReview: true, serie: true } },
            },
        });

        return user || null;
    } catch (error) {
        if (error) {
            return null;
        } else {
            throw error;
        }
    }
});
// #endregion

const start = async () => {
    try {
        await server.listen({ port: 4000 });
        // @ts-ignore
        server.swagger();
        server.log.info('Server up: http://localhost:4000');
    } catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();
