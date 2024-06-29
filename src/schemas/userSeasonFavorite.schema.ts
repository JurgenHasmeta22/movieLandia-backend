const userSeasonFavoriteSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'integer',
            minimum: 1,
        },
        seasonId: {
            type: 'integer',
            minimum: 1,
        },
    },
    required: ['userId', 'seasonId'],
};

export { userSeasonFavoriteSchema };
