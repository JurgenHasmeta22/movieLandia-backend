const serieReviewSchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the user who is reviewing the series',
            },
            serieId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the series being reviewed',
            },
            rating: {
                type: 'number',
                minimum: 1,
                maximum: 5,
                description: 'Rating given by the user for the series (1-5)',
            },
            reviewText: {
                type: 'string',
                description: 'Optional text review provided by the user',
            },
        },
    },
    required: ['userId', 'serieId'],
    description: 'Schema for submitting a review for a series',
    tags: ['User'],
    summary: 'Submit a review for a series',
};

export { serieReviewSchema };
