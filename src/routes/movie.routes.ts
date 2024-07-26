import { FastifyPluginAsync } from 'fastify';
import movieController from '../controllers/movie.controller';

const movieRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.get('/movies', {
        handler: movieController.moviesPageView,
    });

    fastify.get('/movies/:title', {
        handler: movieController.moviePageView,
    });
};

export default movieRoutes;
