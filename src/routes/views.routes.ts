import { FastifyPluginAsync } from 'fastify';
import authController from '../controllers/views/authView.controller';
import homeController from '../controllers/views/homeView.controller';
import movieController from '../controllers/views/movieView.controller';
import serieController from '../controllers/views/serieView.controller';
import genreController from '../controllers/views/genreView.controller';
import searchController from '../controllers/views/searchView.controller';
import trackLastPageMiddleware from '../middlewares/trackLastPage.middleware';

const viewRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', {
        handler: homeController.homeView,
    });

    fastify.get('/login', {
        handler: authController.loginView,
    });

    fastify.post('/login', {
        preHandler: trackLastPageMiddleware,
        handler: authController.loginPost,
    });

    fastify.get('/register', {
        handler: authController.registerView,
    });

    fastify.post('/register', {
        handler: authController.registerPost,
    });

    fastify.post('/logout', {
        handler: authController.logout,
    });

    fastify.get('/search', {
        handler: searchController.searchView,
    });

    fastify.get('/genres', {
        handler: genreController.genresView,
    });

    fastify.get('/genres/:name', {
        handler: genreController.genreView,
    });

    fastify.get('/movies', {
        handler: movieController.moviesView,
    });

    fastify.get('/movies/:title', {
        handler: movieController.movieView,
    });

    fastify.get('/series', {
        handler: serieController.seriesView,
    });

    fastify.get('/series/:title', {
        handler: serieController.serieView,
    });
};

export default viewRoutes;
