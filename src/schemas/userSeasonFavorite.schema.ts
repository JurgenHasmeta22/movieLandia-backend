import { body } from 'express-validator';

const userSeasonFavoriteSchema = [body('userId').isInt({ min: 1 }), body('seasonId').isInt({ min: 1 })];

export { userSeasonFavoriteSchema };
