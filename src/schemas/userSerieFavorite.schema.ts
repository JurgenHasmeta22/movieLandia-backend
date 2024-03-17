import { body } from 'express-validator';

const userSerieFavoriteSchema = [body('userId').isInt({ min: 1 }), body('serieId').isInt({ min: 1 })];

export { userSerieFavoriteSchema };
