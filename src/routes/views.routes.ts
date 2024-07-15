import express from 'express';
import authController from '../controllers/auth.controller';
import homeController from '../controllers/home.controller';
import movieController from '../controllers/movie.controller';
import serieController from '../controllers/serie.controller';
import genreController from '../controllers/genre.controller';
import searchController from '../controllers/search.controller';
import { trackLastPageMiddleware } from '../middlewares/trackLastPage.middleware';

const router = express.Router();

router.get('/', homeController.homePage);

router.get('/login', authController.loginPage);
router.post('/login', trackLastPageMiddleware, authController.loginPost);
router.get('/register', authController.registerPage);
router.post('/register', authController.registerPost);
router.post('/logout', authController.logout);

router.get('/search', searchController.searchPage);
router.get('/genres', genreController.genresPage);
router.get('/genres/:name', genreController.genrePage);
router.get('/movies', movieController.moviesPage);
router.get('/movies/:title', movieController.moviePage);
router.get('/series', serieController.seriesPage);
router.get('/series/:title', serieController.seriePage);

export default router;
