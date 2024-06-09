import express, { Router } from 'express';
import EpisodeController from '../controllers/episode.controller';
import ValidateMiddleware from '../middlewares/validate.middleware';
import {
    episodeSchemaUpdate,
    episodeSchemaPost,
    episodeQuerySchema,
    episodeIdParamSchema,
    episodeTitleParamSchema,
} from '../schemas/episode.schema';

class EpisodeRouter {
    private router: Router;
    private episodeController: typeof EpisodeController;
    private validateMiddleware: typeof ValidateMiddleware;

    constructor(episodeController: typeof EpisodeController, validateMiddleware: typeof ValidateMiddleware) {
        this.router = express.Router();
        this.episodeController = episodeController;
        this.validateMiddleware = validateMiddleware;
        this.setupRoutes = this.setupRoutes.bind(this);
        this.getRoutes = this.getRoutes.bind(this);
    }

    public setupRoutes(): any {
        this.router.get(
            '/getEpisodes',
            episodeQuerySchema,
            this.validateMiddleware.validate,
            this.episodeController.getEpisodes,
        );
        this.router.get(
            '/getEpisodeById/:id',
            episodeIdParamSchema,
            this.validateMiddleware.validate,
            this.episodeController.getEpisodeById,
        );
        this.router.get(
            '/getEpisodeByTitle/:title',
            episodeTitleParamSchema,
            this.validateMiddleware.validate,
            this.episodeController.getEpisodeByTitle,
        );
        this.router.delete(
            '/deleteEpisodeById/:id',
            episodeIdParamSchema,
            this.validateMiddleware.validate,
            this.episodeController.deleteEpisodeById,
        );
        this.router.patch(
            '/updateEpisodeById/:id',
            episodeIdParamSchema,
            episodeSchemaUpdate,
            this.validateMiddleware.validate,
            this.episodeController.updateEpisodeById,
        );
        this.router.put(
            '/updateEpisodeById/:id',
            episodeIdParamSchema,
            episodeSchemaPost,
            this.validateMiddleware.validate,
            this.episodeController.updateEpisodeById,
        );
        this.router.post(
            '/addEpisode',
            episodeSchemaPost,
            this.validateMiddleware.validate,
            this.episodeController.addEpisode,
        );
        this.router.get('/searchEpisodesByTitle', this.episodeController.searchEpisodesByTitle);
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default new EpisodeRouter(EpisodeController, ValidateMiddleware);
