const downvoteMovieSchema = {
    type: 'object',
    required: ['movieId', 'movieReviewId'],
    properties: {
        userId: { type: 'integer', minimum: 1 },
        movieId: { type: 'integer', minimum: 1 },
        movieReviewId: { type: 'integer', minimum: 1 },
    },
};

export { downvoteMovieSchema };
