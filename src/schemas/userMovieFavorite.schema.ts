import { body } from 'express-validator';

const userMovieFavoriteSchema = [body('userId').isInt({ min: 1 }), body('movieId').isInt({ min: 1 })];

export { userMovieFavoriteSchema };
