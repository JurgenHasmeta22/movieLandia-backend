import { body } from 'express-validator';

const downvoteMovieSchema = [
    body('userId').isInt({ min: 1 }).optional(),
    body('movieId').isInt({ min: 1 }),
    body('movieReviewId').isInt({ min: 1 }),
];

export { downvoteMovieSchema };
