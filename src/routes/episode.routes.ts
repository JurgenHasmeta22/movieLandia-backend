import express from 'express';
import episodeController from '../controllers/REST/episode.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import {
    episodeSchemaUpdate,
    episodeSchemaPost,
    episodeQuerySchema,
    episodeIdParamSchema,
    episodeTitleParamSchema,
} from '../schemas/episode.schema';

const router = express.Router();

router.get('/getEpisodes', episodeQuerySchema, validateMiddleware, episodeController.getEpisodes);
router.get('/getEpisodeById/:id', episodeIdParamSchema, validateMiddleware, episodeController.getEpisodeById);
router.get('/getEpisodeByTitle/:title', episodeTitleParamSchema, validateMiddleware, episodeController.getEpisodeByTitle);
router.delete('/deleteEpisodeById/:id', episodeIdParamSchema, validateMiddleware, episodeController.deleteEpisodeById);
router.patch(
    '/updateEpisodeById/:id',
    episodeIdParamSchema,
    episodeSchemaUpdate,
    validateMiddleware,
    episodeController.updateEpisodeById,
);
router.put(
    '/updateEpisodeById/:id',
    episodeIdParamSchema,
    episodeSchemaPost,
    validateMiddleware,
    episodeController.updateEpisodeById,
);
router.post('/addEpisode', episodeSchemaPost, validateMiddleware, episodeController.addEpisode);
router.get('/searchEpisodesByTitle', episodeController.searchEpisodesByTitle);

export default router;
