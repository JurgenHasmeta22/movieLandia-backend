const userSeasonFavoriteSchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the user who is marking the season as favorite',
            },
            seasonId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the season being marked as favorite',
            },
        },
    },
    required: ['userId', 'seasonId'],
    description: 'Schema for marking a season as favorite for a user',
    summary: 'Mark a season as favorite',
    tags: ['User'],
};

export { userSeasonFavoriteSchema };
