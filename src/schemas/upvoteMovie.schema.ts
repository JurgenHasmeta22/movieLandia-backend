import { body } from 'express-validator';

const upvoteMovieSchema = [body('userId').isInt({ min: 1 }), body('movieId').isInt({ min: 1 }), body('movieReviewId').isInt({ min: 1 })];

export { upvoteMovieSchema };