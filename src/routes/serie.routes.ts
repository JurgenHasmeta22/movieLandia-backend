import express, { Router } from 'express';
import SerieController from '../controllers/serie.controller';
import ValidateMiddleware from '../middlewares/validate.middleware';
import {
    serieSchemaUpdate,
    serieSchemaPost,
    serieQuerySchema,
    serieIdParamSchema,
    serieTitleParamSchema,
} from '../schemas/serie.schema';

class SerieRouter {
    private router: Router;
    private serieController: typeof SerieController;
    private validateMiddleware: typeof ValidateMiddleware;

    constructor(serieController: typeof SerieController, validateMiddleware: typeof ValidateMiddleware) {
        this.router = express.Router();

        this.serieController = serieController;
        this.validateMiddleware = validateMiddleware;

        this.setupRoutes = this.setupRoutes.bind(this);
        this.getRoutes = this.getRoutes.bind(this);

        this.setupRoutes();
    }

    public setupRoutes(): any {
        this.router.get(
            '/getSeries',
            serieQuerySchema,
            this.validateMiddleware.validate,
            this.serieController.getSeries,
        );
        this.router.get(
            '/getSerieById/:id',
            serieIdParamSchema,
            this.validateMiddleware.validate,
            this.serieController.getSerieById,
        );
        this.router.get(
            '/getSerieByTitle/:title',
            serieTitleParamSchema,
            this.validateMiddleware.validate,
            this.serieController.getSerieByTitle,
        );
        this.router.delete(
            '/deleteSerieById/:id',
            serieIdParamSchema,
            this.validateMiddleware.validate,
            this.serieController.deleteSerieById,
        );
        this.router.patch(
            '/updateSerieById/:id',
            serieIdParamSchema,
            serieSchemaUpdate,
            this.validateMiddleware.validate,
            this.serieController.updateSerieById,
        );
        this.router.put(
            '/updateSerieById/:id',
            serieIdParamSchema,
            serieSchemaPost,
            this.validateMiddleware.validate,
            this.serieController.updateSerieById,
        );
        this.router.post('/addSerie', serieSchemaPost, this.validateMiddleware.validate, this.serieController.addSerie);
        this.router.get('/searchSeriesByTitle', this.serieController.searchSeriesByTitle);
        this.router.get('/getLatestSeries', this.serieController.getLatestSeries);
        this.router.get('/getRelatedSeries', this.serieController.getRelatedSeries);
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default new SerieRouter(SerieController, ValidateMiddleware);
