import express from 'express';
import userController from '../controllers/user.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import {
    userSchemaUpdate,
    userSchemaPost,
    userQuerySchema,
    userIdParamSchema,
    userUserNameParamSchema,
} from '../schemas/user/user.schema';
import { authMiddleware } from '../middlewares/auth.middleware';

import { userMovieFavoriteSchema } from '../schemas/user/userMovieFavorite.schema';
import { userSerieFavoriteSchema } from '../schemas/user/userSerie.schema';
import { movieReviewSchema } from '../schemas/movie/movieReview.schema';
import { serieReviewSchema } from '../schemas/serie/serieReview.schema';
import { upvoteMovieSchema } from '../schemas/movie/upvoteMovie.schema';
import { upvoteSerieSchema } from '../schemas/serie/upvoteSerie.schema';
import { downvoteMovieSchema } from '../schemas/movie/downvoteMovie.schema';
import { downvoteSerieSchema } from '../schemas/serie/downvoteSerie.schema';

const router = express.Router();

router.use(authMiddleware);

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
router.post('/bookmarkMovie', userMovieFavoriteSchema, userController.bookmarkMovie);
router.post('/bookmarkSerie', userSerieFavoriteSchema, validateMiddleware, userController.bookmarkSerie);
router.post('/unBookmarkMovie', userMovieFavoriteSchema, validateMiddleware, userController.unBookmarkMovie);
router.post('/unBookmarkSerie', userSerieFavoriteSchema, validateMiddleware, userController.unBookmarkSerie);
// #endregion

// #region "Reviews Routes"
router.post('/addReviewMovie', movieReviewSchema, validateMiddleware, userController.addReviewMovie);
router.post('/addReviewSerie', serieReviewSchema, validateMiddleware, userController.addReviewSerie);
router.post('/updateReviewMovie', movieReviewSchema, validateMiddleware, userController.updateReviewMovie);
router.post('/updateReviewSerie', serieReviewSchema, validateMiddleware, userController.updateReviewSerie);
router.post('/removeReviewMovie', movieReviewSchema, validateMiddleware, userController.removeReviewMovie);
router.post('/removeReviewSerie', serieReviewSchema, validateMiddleware, userController.removeReviewSerie);
// #endregion

// #region "Upvotes, Downvotes Routes"
router.post('/addUpvoteMovieReview', upvoteMovieSchema, validateMiddleware, userController.addUpvoteMovieReview);
router.post('/addUpvoteSerieReview', upvoteSerieSchema, validateMiddleware, userController.addUpvoteSerieReview);
router.post('/removeUpvoteMovieReview', upvoteMovieSchema, validateMiddleware, userController.removeUpvoteMovieReview);
router.post('/removeUpvoteSerieReview', upvoteSerieSchema, validateMiddleware, userController.removeUpvoteSerieReview);
router.post('/addDownvoteMovieReview', downvoteMovieSchema, validateMiddleware, userController.addDownvoteMovieReview);
router.post('/addDownvoteSerieReview', downvoteSerieSchema, validateMiddleware, userController.addDownvoteSerieReview);
router.post(
    '/removeDownvoteMovieReview',
    downvoteMovieSchema,
    validateMiddleware,
    userController.removeDownvoteMovieReview,
);
router.post(
    '/removeDownvoteSerieReview',
    downvoteSerieSchema,
    validateMiddleware,
    userController.removeDownvoteSerieReview,
);
// #endregion

export default router;
