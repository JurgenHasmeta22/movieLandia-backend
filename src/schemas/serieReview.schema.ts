import { FastifySchema } from 'fastify';

const serieReviewSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
            },
            serieId: {
                type: 'integer',
                minimum: 1,
            },
        },
        required: ['userId', 'serieId'],
    },
};

export { serieReviewSchema };
