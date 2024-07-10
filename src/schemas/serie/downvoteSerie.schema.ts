import { body } from 'express-validator';

const downvoteSerieSchema = [
    body('userId').isInt({ min: 1 }),
    body('serieId').isInt({ min: 1 }),
    body('serieReviewId').isInt({ min: 1 }),
];

export { downvoteSerieSchema };
