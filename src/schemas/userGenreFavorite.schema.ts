import { body } from 'express-validator';

const userGenreFavoriteSchema = [body('userId').isInt({ min: 1 }), body('genreId').isInt({ min: 1 })];

export { userGenreFavoriteSchema };
