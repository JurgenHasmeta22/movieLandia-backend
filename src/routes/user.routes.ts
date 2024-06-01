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
import { movieReviewSchema } from '../schemas/movieReview.schema';
import { serieReviewSchema } from '../schemas/serieReview.schema';
import { upvoteMovieSchema } from '../schemas/upvoteMovie.schema';
import { upvoteSerieSchema } from '../schemas/upvoteSerie.schema';
import { downvoteMovieSchema } from '../schemas/downvoteMovie.schema';
import { downvoteSerieSchema } from '../schemas/downvoteSerie.schema';

const router = express.Router();

// router.use(authMiddleware);

// #region "CRUD Routes"
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
// #endregion

// #region "Bookmark Routes"
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
router.post('/addReviewMovie', movieReviewSchema, validateMiddleware, userController.addReviewMovie);
router.post('/addReviewSerie', serieReviewSchema, validateMiddleware, userController.addReviewSerie);
router.post('/updateReviewMovie', movieReviewSchema, validateMiddleware, userController.updateReviewMovie);
router.post('/updateReviewSerie', serieReviewSchema, validateMiddleware, userController.updateReviewSerie);
router.post('/removeReviewMovie', movieReviewSchema, validateMiddleware, userController.removeReviewMovie);
router.post('/removeReviewSerie', serieReviewSchema, validateMiddleware, userController.removeReviewSerie);
router.post('/isSerieReviewed', validateMiddleware, userController.isSerieReviewed);
router.post('/isMovieReviewed', validateMiddleware, userController.isMovieReviewed);
// #endregion

// #region "Upvotes, Downvotes Routes"
router.post('/addUpvoteMovie', upvoteMovieSchema, validateMiddleware, userController.addUpvoteMovie);
router.post('/addUpvoteSerie', upvoteSerieSchema, validateMiddleware, userController.addUpvoteSerie);
router.post('/removeUpvoteMovie', upvoteMovieSchema, validateMiddleware, userController.removeUpvoteMovie);
router.post('/removeUpvoteSerie', upvoteSerieSchema, validateMiddleware, userController.removeUpvoteSerie);
router.post('/addDownvoteMovie', downvoteMovieSchema, validateMiddleware, userController.addDownvoteMovie);
router.post('/addDownvoteSerie', downvoteSerieSchema, validateMiddleware, userController.addDownvoteSerie);
router.post('/removeDownvoteMovie', downvoteMovieSchema, validateMiddleware, userController.removeDownvoteMovie);
router.post('/removeDownvoteSerie', downvoteSerieSchema, validateMiddleware, userController.removeDownvoteSerie);
// #endregion

export default router;
