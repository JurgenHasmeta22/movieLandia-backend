import { FastifyPluginAsync } from 'fastify';
import authController from '../controllers/views/authView.controller';
import homeController from '../controllers/views/homeView.controller';
import movieController from '../controllers/views/movieView.controller';
import serieController from '../controllers/views/serieView.controller';
import genreController from '../controllers/views/genreView.controller';
import searchController from '../controllers/views/searchView.controller';
import trackLastPageMiddleware from '../middlewares/trackLastPage.middleware';
import { viewSchema } from '../schemas/view.schema';

const viewRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/', {
        schema: viewSchema,
        handler: homeController.homeView,
    });

    fastify.get('/login', {
        schema: viewSchema,
        handler: authController.loginView,
    });

    fastify.post('/login', {
        schema: viewSchema,
        preHandler: trackLastPageMiddleware,
        handler: authController.loginPost,
    });

    fastify.get('/register', {
        schema: viewSchema,
        handler: authController.registerView,
    });

    fastify.post('/register', {
        schema: viewSchema,
        handler: authController.registerPost,
    });

    fastify.post('/logout', {
        schema: viewSchema,
        handler: authController.logout,
    });

    fastify.get('/search', {
        schema: viewSchema,
        handler: searchController.searchView,
    });

    fastify.get('/genres', {
        schema: viewSchema,
        handler: genreController.genresView,
    });

    fastify.get('/genres/:name', {
        schema: viewSchema,
        handler: genreController.genreView,
    });

    fastify.get('/movies', {
        schema: viewSchema,
        handler: movieController.moviesView,
    });

    fastify.get('/movies/:title', {
        schema: viewSchema,
        handler: movieController.movieView,
    });

    fastify.get('/series', {
        schema: viewSchema,
        handler: serieController.seriesView,
    });

    fastify.get('/series/:title', {
        schema: viewSchema,
        handler: serieController.serieView,
    });
};

export default viewRoutes;
