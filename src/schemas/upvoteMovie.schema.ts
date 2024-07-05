const upvoteMovieSchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the user who is upvoting the movie review',
            },
            movieId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the movie being upvoted',
            },
            movieReviewId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the movie review being upvoted',
            },
        },
    },
    required: ['userId', 'movieId', 'movieReviewId'],
    description: 'Schema for upvoting a movie review',
    tags: ['User'],
    summary: 'Upvote a movie review',
};

export { upvoteMovieSchema };
