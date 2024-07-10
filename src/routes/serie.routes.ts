import express from 'express';
import serieController from '../controllers/serie.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import {
    serieSchemaUpdate,
    serieSchemaPost,
    serieQuerySchema,
    serieIdParamSchema,
    serieTitleParamSchema,
} from '../schemas/serie/serie.schema';

const router = express.Router();

router.get('/getSeries', serieQuerySchema, validateMiddleware, serieController.getSeries);
router.get('/getSerieById/:id', serieIdParamSchema, validateMiddleware, serieController.getSerieById);
router.get('/getSerieByTitle/:title', serieTitleParamSchema, validateMiddleware, serieController.getSerieByTitle);
router.delete('/deleteSerieById/:id', serieIdParamSchema, validateMiddleware, serieController.deleteSerieById);
router.patch(
    '/updateSerieById/:id',
    serieIdParamSchema,
    serieSchemaUpdate,
    validateMiddleware,
    serieController.updateSerieById,
);
router.put(
    '/updateSerieById/:id',
    serieIdParamSchema,
    serieSchemaPost,
    validateMiddleware,
    serieController.updateSerieById,
);
router.post('/addSerie', serieSchemaPost, validateMiddleware, serieController.addSerie);
router.get('/searchSeriesByTitle', serieController.searchSeriesByTitle);
router.get('/getLatestSeries', serieController.getLatestSeries);
router.get('/getRelatedSeries', serieController.getRelatedSeries);

export default router;
