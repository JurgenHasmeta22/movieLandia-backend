const seasonSerieSchema = {
    type: 'object',
    properties: {
        serieId: { type: 'integer', minimum: 1 },
        seasonId: { type: 'integer', minimum: 1 },
    },
    required: ['serieId', 'seasonId'],
};

export { seasonSerieSchema };
