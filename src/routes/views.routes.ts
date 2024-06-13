import express from 'express';
import authController from '../controllers/views/authView.controller';
import homeController from '../controllers/views/homeView.controller';
import movieController from '../controllers/views/movieView.controller';
import serieController from '../controllers/views/serieView.controller';
import genreController from '../controllers/views/genreView.controller';
import searchController from '../controllers/views/searchView.controller';
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
