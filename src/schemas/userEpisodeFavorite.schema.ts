const userEpisodeFavoriteSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'integer',
            minimum: 1,
        },
        episodeId: {
            type: 'integer',
            minimum: 1,
        },
    },
    required: ['userId', 'episodeId'],
};

export { userEpisodeFavoriteSchema };
