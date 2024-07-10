import { body } from 'express-validator';

const movieReviewSchema = [body('userId').isInt({ min: 1 }), body('movieId').isInt({ min: 1 })];

export { movieReviewSchema };
