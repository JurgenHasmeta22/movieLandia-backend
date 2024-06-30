const downvoteSerieSchema = {
    description: 'Downvote a serie review',
    tags: ['serie', 'review', 'vote'],
    summary: 'Downvote a serie review',
    body: {
        type: 'object',
        required: ['userId', 'serieId', 'serieReviewId'],
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
                description: 'User ID',
            },
            serieId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the serie being reviewed',
            },
            serieReviewId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the serie review being downvoted',
            },
        },
    },
    response: {
        200: {
            description: 'Downvote registered successfully',
            type: 'object',
            properties: {
                success: { type: 'boolean', description: 'Indicates if the downvote was successful' },
            },
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        401: {
            description: 'Unauthorized',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        404: {
            description: 'Not Found',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
    },
};

export { downvoteSerieSchema };
