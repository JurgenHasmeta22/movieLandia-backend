export const movieReviewSchema = {
    description: 'Create or update a movie review',
    tags: ['User'],
    summary: 'Create or update movie review',
    body: {
        type: 'object',
        required: ['userId', 'movieId'],
        properties: {
            userId: { type: 'integer', minimum: 1, description: 'User ID' },
            movieId: { type: 'integer', minimum: 1, description: 'Movie ID' },
            reviewText: { type: 'string', description: 'Text of the review' },
            rating: { type: 'number', minimum: 0, maximum: 10, description: 'Rating of the movie' },
        },
    },
    response: {
        201: {
            description: 'Review created successfully',
            type: 'object',
            properties: {
                reviewId: { type: 'integer', description: 'Review ID' },
                userId: { type: 'integer', description: 'User ID' },
                movieId: { type: 'integer', description: 'Movie ID' },
                reviewText: { type: 'string', description: 'Text of the review' },
                rating: { type: 'number', minimum: 0, maximum: 10, description: 'Rating of the movie' },
                createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
                updatedAt: { type: 'string', format: 'date-time', description: 'Update timestamp' },
            },
        },
        400: {
            description: 'Bad Request',
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
