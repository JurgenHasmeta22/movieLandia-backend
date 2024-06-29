const upvoteSerieSchema = {
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
        serieReviewId: {
            type: 'integer',
            minimum: 1,
        },
    },
    required: ['serieId', 'serieReviewId'],
};

export { upvoteSerieSchema };
