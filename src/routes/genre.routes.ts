import express from 'express';
import genreController from '../controllers/genre.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import {
    genreSchemaPost,
    genreSchemaUpdate,
    genreQuerySchema,
    genreIdParamSchema,
    genreNameParamSchema,
} from '../schemas/genre.schema';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

// router.use(authMiddleware);

router.get('/getGenres', genreQuerySchema, validateMiddleware, genreController.getGenres);
router.get('/getGenreById/:id', genreIdParamSchema, validateMiddleware, genreController.getGenreById);
router.get('/getGenreByName/:name', genreNameParamSchema, validateMiddleware, genreController.getGenreByName);
router.delete('/deleteGenreById/:id', genreIdParamSchema, validateMiddleware, genreController.deleteGenreById);
router.put('/updateGenreById/:id', genreIdParamSchema, genreSchemaPost, validateMiddleware, genreController.updateGenreById);
router.patch('/updateGenreById/:id', genreIdParamSchema, genreSchemaUpdate, validateMiddleware, genreController.updateGenreById);
router.post('/addGenre', genreSchemaPost, validateMiddleware, genreController.addGenre);
router.get('/searchGenresByTitle', genreController.searchGenresByName);

export default router;
