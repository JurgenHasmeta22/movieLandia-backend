const downvoteMovieSchema = {
    description: 'Downvote a movie review',
    tags: ['movie', 'review', 'vote'],
    summary: 'Downvote a movie review',
    body: {
        type: 'object',
        required: ['movieId', 'movieReviewId'],
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
                description: 'User ID (optional, inferred from session if not provided)',
            },
            movieId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the movie being reviewed',
            },
            movieReviewId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the movie review being downvoted',
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
    security: [
        {
            apiKey: [],
        },
    ],
};

export { downvoteMovieSchema };
