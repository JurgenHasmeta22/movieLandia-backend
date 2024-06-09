import express, { Router } from 'express';
import GenreController from '../controllers/genre.controller';
import ValidateMiddleware from '../middlewares/validate.middleware';
import {
    genreSchemaPost,
    genreSchemaUpdate,
    genreQuerySchema,
    genreIdParamSchema,
    genreNameParamSchema,
} from '../schemas/genre.schema';

class GenreRouter {
    private router: Router;
    private genreController: typeof GenreController;
    private validateMiddleware: typeof ValidateMiddleware;

    constructor(genreController: typeof GenreController, validateMiddleware: typeof ValidateMiddleware) {
        this.router = express.Router();
        this.genreController = genreController;
        this.validateMiddleware = validateMiddleware;
        this.setupRoutes = this.setupRoutes.bind(this);
        this.getRoutes = this.getRoutes.bind(this);
    }

    public setupRoutes(): any {
        this.router.get(
            '/getGenres',
            genreQuerySchema,
            this.validateMiddleware.validate,
            this.genreController.getGenres,
        );
        this.router.get(
            '/getGenreById/:id',
            genreIdParamSchema,
            this.validateMiddleware.validate,
            this.genreController.getGenreById,
        );
        this.router.get(
            '/getGenreByName/:name',
            genreNameParamSchema,
            this.validateMiddleware.validate,
            this.genreController.getGenreByName,
        );
        this.router.delete(
            '/deleteGenreById/:id',
            genreIdParamSchema,
            this.validateMiddleware.validate,
            this.genreController.deleteGenreById,
        );
        this.router.put(
            '/updateGenreById/:id',
            genreIdParamSchema,
            genreSchemaPost,
            this.validateMiddleware.validate,
            this.genreController.updateGenreById,
        );
        this.router.patch(
            '/updateGenreById/:id',
            genreIdParamSchema,
            genreSchemaUpdate,
            this.validateMiddleware.validate,
            this.genreController.updateGenreById,
        );
        this.router.post('/addGenre', genreSchemaPost, this.validateMiddleware.validate, this.genreController.addGenre);
        this.router.get('/searchGenresByTitle', this.genreController.searchGenresByName);
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default new GenreRouter(GenreController, ValidateMiddleware);
