import { body } from 'express-validator';

const userEpisodeFavoriteSchema = [body('userId').isInt({ min: 1 }), body('episodeId').isInt({ min: 1 })];

export { userEpisodeFavoriteSchema };
