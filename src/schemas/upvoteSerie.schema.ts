const upvoteSerieSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'integer',
            minimum: 1,
            description: 'ID of the user who is upvoting the series review',
        },
        serieId: {
            type: 'integer',
            minimum: 1,
            description: 'ID of the series being upvoted',
        },
        serieReviewId: {
            type: 'integer',
            minimum: 1,
            description: 'ID of the series review being upvoted',
        },
    },
    required: ['serieId', 'serieReviewId'],
    description: 'Schema for upvoting a series review',
    tags: ['Series Reviews'],
    summary: 'Upvote a series review',
};

export { upvoteSerieSchema };
