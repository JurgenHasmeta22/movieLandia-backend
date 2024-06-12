import express from 'express';
import viewsController from '../controllers/views.controller';

const router = express.Router();

router.get('/', viewsController.homeView);
router.get('/login', viewsController.loginView);
router.get('/register', viewsController.registerView);
router.get('/search', viewsController.searchView);
router.get('/genres', viewsController.genresView);
router.get('/genres/:name', viewsController.genreView);
router.get('/movies', viewsController.moviesView);
router.get('/movies/:title', viewsController.movieView);
router.get('/series', viewsController.seriesView);
router.get('/series/:title', viewsController.serieView);

export default router;
