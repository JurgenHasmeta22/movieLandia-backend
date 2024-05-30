import { body } from 'express-validator';

const serieReviewSchema = [body('userId').isInt({ min: 1 }), body('serieId').isInt({ min: 1 })];

export { serieReviewSchema };