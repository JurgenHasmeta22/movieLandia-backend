import { FastifySchema } from 'fastify';

const seasonSerieSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            serieId: { type: 'integer', minimum: 1 },
            seasonId: { type: 'integer', minimum: 1 },
        },
        required: ['serieId', 'seasonId'],
    },
};

export { seasonSerieSchema };
