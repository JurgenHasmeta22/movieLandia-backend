import { FastifyPluginAsync } from 'fastify';
import authController from '../controllers/views/authView.controller';
import homeController from '../controllers/views/homeView.controller';
import movieController from '../controllers/views/movieView.controller';
import serieController from '../controllers/views/serieView.controller';
import genreController from '../controllers/views/genreView.controller';
import searchController from '../controllers/views/searchView.controller';
import trackLastPageMiddleware from '../middlewares/trackLastPage.middleware';

const viewRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', async (request, reply) => {
        return homeController.homeView(request, reply);
    });

    fastify.get('/login', async (request, reply) => {
        return authController.loginView(request, reply);
    });

    fastify.post('/login', { preHandler: trackLastPageMiddleware }, async (request, reply) => {
        return authController.loginPost(request, reply);
    });

    fastify.get('/register', async (request, reply) => {
        return authController.registerView(request, reply);
    });

    fastify.post('/register', async (request, reply) => {
        return authController.registerPost(request, reply);
    });

    fastify.post('/logout', async (request, reply) => {
        return authController.logout(request, reply);
    });

    fastify.get('/search', async (request, reply) => {
        return searchController.searchView(request, reply);
    });

    fastify.get('/genres', async (request, reply) => {
        return genreController.genresView(request, reply);
    });

    fastify.get('/genres/:name', async (request, reply) => {
        return genreController.genreView(request, reply);
    });

    fastify.get('/movies', async (request, reply) => {
        return movieController.moviesView(request, reply);
    });

    fastify.get('/movies/:title', async (request, reply) => {
        return movieController.movieView(request, reply);
    });

    fastify.get('/series', async (request, reply) => {
        return serieController.seriesView(request, reply);
    });

    fastify.get('/series/:title', async (request, reply) => {
        return serieController.serieView(request, reply);
    });
};

export default viewRoutes;
