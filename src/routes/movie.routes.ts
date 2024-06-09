import express, { Router } from 'express';
import { Request, Response } from 'express';
import MovieController from '../controllers/movie.controller';
import ValidateMiddleware from '../middlewares/validate.middleware';
import {
    movieSchemaUpdate,
    movieSchemaPost,
    movieQuerySchema,
    movieIdParamSchema,
    movieTitleParamSchema,
} from '../schemas/movie.schema';

class MovieRouter {
    private router: Router;
    private movieController: typeof MovieController;
    private validateMiddleware: typeof ValidateMiddleware;

    constructor(movieController: typeof MovieController, validateMiddleware: typeof ValidateMiddleware) {
        this.router = express.Router();
        this.movieController = movieController;
        this.validateMiddleware = validateMiddleware;
        this.setupRoutes = this.setupRoutes.bind(this);
        this.getRoutes = this.getRoutes.bind(this);
    }

    public setupRoutes(): any {
        this.router.get(
            '/getMovies',
            movieQuerySchema,
            this.validateMiddleware.validate,
            (req: Request, res: Response) => this.movieController.getMovies(req, res),
        );
        this.router.get(
            '/getMovieById/:id',
            movieIdParamSchema,
            this.validateMiddleware.validate,
            (req: Request, res: Response) => this.movieController.getMovieById(req, res),
        );
        this.router.get(
            '/getMovieByTitle/:title',
            movieTitleParamSchema,
            this.validateMiddleware.validate,
            (req: Request, res: Response) => this.movieController.getMovieByTitle(req, res),
        );
        this.router.delete(
            '/deleteMovieById/:id',
            movieIdParamSchema,
            this.validateMiddleware.validate,
            (req: Request, res: Response) => this.movieController.deleteMovieById(req, res),
        );
        this.router.patch(
            '/updateMovieById/:id',
            movieIdParamSchema,
            movieSchemaUpdate,
            this.validateMiddleware.validate,
            (req: Request, res: Response) => this.movieController.updateMovieById(req, res),
        );
        this.router.put(
            '/updateMovieById/:id',
            movieIdParamSchema,
            movieSchemaPost,
            this.validateMiddleware.validate,
            (req: Request, res: Response) => this.movieController.updateMovieById(req, res),
        );
        this.router.post(
            '/addMovie',
            movieSchemaPost,
            this.validateMiddleware.validate,
            (req: Request, res: Response) => this.movieController.addMovie(req, res),
        );
        this.router.get('/searchMoviesByTitle', (req: Request, res: Response) =>
            this.movieController.searchMoviesByTitle(req, res),
        );
        this.router.get('/getLatestMovies', (req: Request, res: Response) =>
            this.movieController.getLatestMovies(req, res),
        );
        this.router.get('/getRelatedMovies', (req: Request, res: Response) =>
            this.movieController.getRelatedMovies(req, res),
        );
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default new MovieRouter(MovieController, ValidateMiddleware);
