import express, { Router } from 'express';
import UserController from '../controllers/user.controller';
import ValidateMiddleware from '../middlewares/validate.middleware';
import {
    userSchemaUpdate,
    userSchemaPost,
    userQuerySchema,
    userIdParamSchema,
    userUserNameParamSchema,
} from '../schemas/user.schema';
import { userMovieFavoriteSchema } from '../schemas/userMovieFavorite.schema';
import { userSerieFavoriteSchema } from '../schemas/userSerie.schema';
import { movieReviewSchema } from '../schemas/movieReview.schema';
import { serieReviewSchema } from '../schemas/serieReview.schema';
import { upvoteMovieSchema } from '../schemas/upvoteMovie.schema';
import { upvoteSerieSchema } from '../schemas/upvoteSerie.schema';
import { downvoteMovieSchema } from '../schemas/downvoteMovie.schema';
import { downvoteSerieSchema } from '../schemas/downvoteSerie.schema';

class UserRouter {
    private router: Router;
    private userController: typeof UserController;
    private validateMiddleware: typeof ValidateMiddleware;

    constructor(userController: typeof UserController, validateMiddleware: typeof ValidateMiddleware) {
        this.router = express.Router();
        this.userController = userController;
        this.validateMiddleware = validateMiddleware;
        this.setupRoutes = this.setupRoutes.bind(this);
        this.getRoutes = this.getRoutes.bind(this);
    }

    public setupRoutes(): any {
        this.router.get('/getUsers', userQuerySchema, this.validateMiddleware.validate, this.userController.getUsers);
        this.router.get(
            '/getUserById/:id',
            userIdParamSchema,
            this.validateMiddleware.validate,
            this.userController.getUserById,
        );
        this.router.get(
            '/getUserByTitle/:userName',
            userUserNameParamSchema,
            this.validateMiddleware.validate,
            this.userController.getUserByTitle,
        );
        this.router.delete(
            '/deleteUserById/:id',
            userIdParamSchema,
            this.validateMiddleware.validate,
            this.userController.deleteUserById,
        );
        this.router.patch(
            '/updateUserById/:id',
            userIdParamSchema,
            userSchemaUpdate,
            this.validateMiddleware.validate,
            this.userController.updateUserById,
        );
        this.router.put(
            '/updateUserById/:id',
            userIdParamSchema,
            userSchemaPost,
            this.validateMiddleware.validate,
            this.userController.updateUserById,
        );
        this.router.get('/searchUsersByTitle', this.userController.searchUsersByTitle);

        this.router.post('/bookmarkMovie', userMovieFavoriteSchema, this.userController.bookmarkMovie);
        this.router.post(
            '/bookmarkSerie',
            userSerieFavoriteSchema,
            this.validateMiddleware.validate,
            this.userController.bookmarkSerie,
        );
        this.router.post(
            '/unBookmarkMovie',
            userMovieFavoriteSchema,
            this.validateMiddleware.validate,
            this.userController.unBookmarkMovie,
        );
        this.router.post(
            '/unBookmarkSerie',
            userSerieFavoriteSchema,
            this.validateMiddleware.validate,
            this.userController.unBookmarkSerie,
        );

        this.router.post(
            '/addReviewMovie',
            movieReviewSchema,
            this.validateMiddleware.validate,
            this.userController.addReviewMovie,
        );
        this.router.post(
            '/addReviewSerie',
            serieReviewSchema,
            this.validateMiddleware.validate,
            this.userController.addReviewSerie,
        );
        this.router.post(
            '/updateReviewMovie',
            movieReviewSchema,
            this.validateMiddleware.validate,
            this.userController.updateReviewMovie,
        );
        this.router.post(
            '/updateReviewSerie',
            serieReviewSchema,
            this.validateMiddleware.validate,
            this.userController.updateReviewSerie,
        );
        this.router.post(
            '/removeReviewMovie',
            movieReviewSchema,
            this.validateMiddleware.validate,
            this.userController.removeReviewMovie,
        );
        this.router.post(
            '/removeReviewSerie',
            serieReviewSchema,
            this.validateMiddleware.validate,
            this.userController.removeReviewSerie,
        );

        this.router.post(
            '/addUpvoteMovieReview',
            upvoteMovieSchema,
            this.validateMiddleware.validate,
            this.userController.addUpvoteMovieReview,
        );
        this.router.post(
            '/addUpvoteSerieReview',
            upvoteSerieSchema,
            this.validateMiddleware.validate,
            this.userController.addUpvoteSerieReview,
        );
        this.router.post(
            '/removeUpvoteMovieReview',
            upvoteMovieSchema,
            this.validateMiddleware.validate,
            this.userController.removeUpvoteMovieReview,
        );
        this.router.post(
            '/removeUpvoteSerieReview',
            upvoteSerieSchema,
            this.validateMiddleware.validate,
            this.userController.removeUpvoteSerieReview,
        );
        this.router.post(
            '/addDownvoteMovieReview',
            downvoteMovieSchema,
            this.validateMiddleware.validate,
            this.userController.addDownvoteMovieReview,
        );
        this.router.post(
            '/addDownvoteSerieReview',
            downvoteSerieSchema,
            this.validateMiddleware.validate,
            this.userController.addDownvoteSerieReview,
        );
        this.router.post(
            '/removeDownvoteMovieReview',
            downvoteMovieSchema,
            this.validateMiddleware.validate,
            this.userController.removeDownvoteMovieReview,
        );
        this.router.post(
            '/removeDownvoteSerieReview',
            downvoteSerieSchema,
            this.validateMiddleware.validate,
            this.userController.removeDownvoteSerieReview,
        );
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default new UserRouter(UserController, ValidateMiddleware);
