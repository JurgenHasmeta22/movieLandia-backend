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

const server = fastify({ logger: true });

server.register(fastifyCors);
server.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'API documentation',
      version: '1.0.0',
    },
  },
});
// server.register(fastifySwaggerUI, {
//   routePrefix: '/api-docs',
//   swaggerOptions: {
//     url: '/swagger.json',
//   },
//   uiConfig: {
//     docExpansion: 'full',
//     deepLinking: false,
//   },
//   exposeRoute: true,
// });
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/',
});
server.register(fastifyView, {
  engine: {
    ejs,
  },
  root: path.join(__dirname, 'views'),
  layout: 'layouts/MainLayout.ejs',
});

server.register(fastifyCookie);
server.register(fastifySession, {
  secret: process.env.MY_SECRET || 'defaultSecret', // Ensure to use environment variables securely
  cookie: { secure: false }, // Review this setting carefully for production
  saveUninitialized: false, // Not required in Fastify
  resave: false, // Not required in Fastify
});
server.register(fastifyFlash);

// Register routes
// server.register(viewsRoutes);
server.register(authRoutes);
server.register(movieRoutes);
server.register(serieRoutes);
server.register(genreRoutes);
server.register(episodeRoutes);
server.register(userRoutes);

// Error handling
server.setErrorHandler((error, request, reply) => {
  server.log.error(error);
  reply.status(500).send({ error: 'Internal Server Error' });
});

// Start server
const start = async () => {
  try {
    await server.listen(4000);
    server.log.info(`Server up: http://localhost:4000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
