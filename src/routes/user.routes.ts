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
import { authMiddleware } from '../middlewares/auth.middleware';
import { userSeasonFavoriteSchema } from '../schemas/userSeasonFavorite.schema';
import { userMovieFavoriteSchema } from '../schemas/userMovieFavorite.schema';
import { userEpisodeFavoriteSchema } from '../schemas/userEpisodeFavorite.schema';
import { userGenreFavoriteSchema } from '../schemas/userGenreFavorite.schema';

const router = express.Router();

router.use(authMiddleware);

router.get('/users', userQuerySchema, validateMiddleware, userController.getUsers);
router.get('/getUserById/:id', userIdParamSchema, validateMiddleware, userController.getUserById);
router.get('/getUserByTitle/:userName', userUserNameParamSchema, validateMiddleware, userController.getUserByTitle);
router.delete('/users/:id', userIdParamSchema, validateMiddleware, userController.deleteUserById);
router.patch('/users/:id', userIdParamSchema, userSchemaUpdate, validateMiddleware, userController.updateUserById);
router.put('/users/:id', userIdParamSchema, userSchemaPost, validateMiddleware, userController.updateUserById);
router.get('/searchUsers', userController.searchUsersByTitle);
router.post('/addSeasonToUser', userSeasonFavoriteSchema, validateMiddleware, userController.addSeasonToUser);
router.post('/addMovieToUser', userMovieFavoriteSchema, userController.addMovieToUser);
router.post('/addSerieToUser', userEpisodeFavoriteSchema, validateMiddleware, userController.addSerieToUser);
router.post('/addEpisodeToUser', userSeasonFavoriteSchema, validateMiddleware, userController.addEpisodeToUser);
router.post('/addGenreToUser', userGenreFavoriteSchema, validateMiddleware, userController.addGenreToUser);

export default router;
