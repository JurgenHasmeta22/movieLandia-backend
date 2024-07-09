import express from 'express';
import authController from '../controllers/auth.controller';
import homeController from '../controllers/home.controller';
import movieController from '../controllers/movie.controller';
import serieController from '../controllers/serie.controller';
import genreController from '../controllers/genre.controller';
import searchController from '../controllers/search.controller';
import { trackLastPageMiddleware } from '../middlewares/trackLastPage.middleware';

const router = express.Router();

router.get('/', homeController.homeView);

router.get('/login', authController.loginView);
router.post('/login', trackLastPageMiddleware, authController.loginPost);
router.get('/register', authController.registerView);
router.post('/register', authController.registerPost);
router.post('/logout', authController.logout);

router.get('/search', searchController.searchView);
router.get('/genres', genreController.genresView);
router.get('/genres/:name', genreController.genreView);
router.get('/movies', movieController.moviesView);
router.get('/movies/:title', movieController.movieView);
router.get('/series', serieController.seriesView);
router.get('/series/:title', serieController.serieView);

export default router;
