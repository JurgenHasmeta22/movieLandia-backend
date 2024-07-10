import express from 'express';
import movieController from '../controllers/movie.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import {
    movieSchemaUpdate,
    movieSchemaPost,
    movieQuerySchema,
    movieIdParamSchema,
    movieTitleParamSchema,
} from '../schemas/movie/movie.schema';

const router = express.Router();

router.get('/getMovies', movieQuerySchema, validateMiddleware, movieController.getMovies);
router.get('/getMovieById/:id', movieIdParamSchema, validateMiddleware, movieController.getMovieById);
router.get('/getMovieByTitle/:title', movieTitleParamSchema, validateMiddleware, movieController.getMovieByTitle);
router.delete('/deleteMovieById/:id', movieIdParamSchema, validateMiddleware, movieController.deleteMovieById);
router.patch(
    '/updateMovieById/:id',
    movieIdParamSchema,
    movieSchemaUpdate,
    validateMiddleware,
    movieController.updateMovieById,
);
router.put(
    '/updateMovieById/:id',
    movieIdParamSchema,
    movieSchemaPost,
    validateMiddleware,
    movieController.updateMovieById,
);
router.post('/addMovie', movieSchemaPost, validateMiddleware, movieController.addMovie);
router.get('/searchMoviesByTitle', movieController.searchMoviesByTitle);
router.get('/getLatestMovies', movieController.getLatestMovies);
router.get('/getRelatedMovies', movieController.getRelatedMovies);

export default router;
