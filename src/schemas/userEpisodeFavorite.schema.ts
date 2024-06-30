const userEpisodeFavoriteSchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the user who is marking the episode as favorite',
            },
            episodeId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the episode being marked as favorite',
            },
        },
    },
    required: ['userId', 'episodeId'],
    description: 'Schema for marking an episode as favorite for a user',
    summary: 'Mark an episode as favorite',
    tags: ['User'],
};

export { userEpisodeFavoriteSchema };
