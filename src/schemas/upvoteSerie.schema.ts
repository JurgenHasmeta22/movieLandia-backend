import { body } from 'express-validator';

const upvoteSerieSchema = [body('userId').isInt({ min: 1 }), body('serieId').isInt({ min: 1 }), body('serieReviewId').isInt({ min: 1 })];

export { upvoteSerieSchema };