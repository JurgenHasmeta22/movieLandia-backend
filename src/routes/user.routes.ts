import express from 'express';
import userController from '../controllers/user.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import {
    userSchemaUpdate,
    userSchemaPost,
    userQuerySchema,
    userIdParamSchema,
    userUserNameParamSchema,
} from '../schemas/user.schema';

// import { authMiddleware } from '../middlewares/auth.middleware';

import { userSeasonFavoriteSchema } from '../schemas/userSeasonFavorite.schema';
import { userMovieFavoriteSchema } from '../schemas/userMovieFavorite.schema';
import { userEpisodeFavoriteSchema } from '../schemas/userEpisodeFavorite.schema';
import { userGenreFavoriteSchema } from '../schemas/userGenreFavorite.schema';
import { userSerieFavoriteSchema } from '../schemas/userSerie.schema';

const router = express.Router();

// router.use(authMiddleware);

router.get('/getUsers', userQuerySchema, validateMiddleware, userController.getUsers);
router.get('/getUserById/:id', userIdParamSchema, validateMiddleware, userController.getUserById);
router.get('/getUserByTitle/:userName', userUserNameParamSchema, validateMiddleware, userController.getUserByTitle);
router.delete('/deleteUserById/:id', userIdParamSchema, validateMiddleware, userController.deleteUserById);
router.patch(
    '/updateUserById/:id',
    userIdParamSchema,
    userSchemaUpdate,
    validateMiddleware,
    userController.updateUserById,
);
router.put('/updateUserById/:id', userIdParamSchema, userSchemaPost, validateMiddleware, userController.updateUserById);
router.get('/searchUsersByTitle', userController.searchUsersByTitle);

// #region "Bookmark routes"
router.post('/bookmarkSeason', userSeasonFavoriteSchema, validateMiddleware, userController.bookmarkSeason);
router.post('/bookmarkMovie', userMovieFavoriteSchema, userController.bookmarkMovie);
router.post('/bookmarkSerie', userSerieFavoriteSchema, validateMiddleware, userController.bookmarkSerie);
router.post('/bookmarkEpisode', userEpisodeFavoriteSchema, validateMiddleware, userController.bookmarkEpisode);
router.post('/bookmarkGenre', userGenreFavoriteSchema, validateMiddleware, userController.bookmarkGenre);
router.post('/unBookmarkMovie', userMovieFavoriteSchema, validateMiddleware, userController.unBookmarkMovie);
router.post('/unBookmarkSerie', userSerieFavoriteSchema, validateMiddleware, userController.unBookmarkSerie);
router.post('/isSerieBookmarked', validateMiddleware, userController.isSerieBookmarked);
router.post('/isMovieBookmarked', validateMiddleware, userController.isMovieBookmarked);
// #endregion

// #region "Reviews Routes"
router.post('/addReviewMovie', validateMiddleware, userController.addReviewMovie);
router.post('/addReviewSerie', validateMiddleware, userController.addReviewSerie);
router.post('/removeReviewMovie', validateMiddleware, userController.removeReviewMovie);
router.post('/removeReviewSerie', validateMiddleware, userController.removeReviewSerie);
// #endregion

export default router;
