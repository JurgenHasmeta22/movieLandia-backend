const userGenreFavoriteSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'integer',
            minimum: 1,
        },
        genreId: {
            type: 'integer',
            minimum: 1,
        },
    },
    required: ['userId', 'genreId'],
};

export { userGenreFavoriteSchema };
