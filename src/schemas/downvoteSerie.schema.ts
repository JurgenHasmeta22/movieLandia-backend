import { FastifySchema } from 'fastify';

const downvoteSerieSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['userId', 'serieId', 'serieReviewId'],
        properties: {
            userId: { type: 'integer', minimum: 1 },
            serieId: { type: 'integer', minimum: 1 },
            serieReviewId: { type: 'integer', minimum: 1 },
        },
    },
};

export { downvoteSerieSchema };
