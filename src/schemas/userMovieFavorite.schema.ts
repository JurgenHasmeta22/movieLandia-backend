const userMovieFavoriteSchema = {
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
    },
    required: ['userId', 'movieId'],
};

export { userMovieFavoriteSchema };
