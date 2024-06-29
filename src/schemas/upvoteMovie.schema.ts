import { FastifySchema } from 'fastify';

const upvoteMovieSchema: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
            },
            movieId: {
                type: 'integer',
                minimum: 1,
            },
            movieReviewId: {
                type: 'integer',
                minimum: 1,
            },
        },
        required: ['userId', 'movieId', 'movieReviewId'],
    },
};

export { upvoteMovieSchema };
