import { FastifySchema } from 'fastify';

const userSeasonFavoriteSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
            },
            seasonId: {
                type: 'integer',
                minimum: 1,
            },
        },
        required: ['userId', 'seasonId'],
    },
};

export { userSeasonFavoriteSchema };
