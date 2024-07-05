const userSerieFavoriteSchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the user who is marking the series as favorite',
            },
            serieId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the series being marked as favorite',
            },
        },
    },
    required: ['userId', 'serieId'],
    description: 'Schema for marking a series as favorite for a user',
    tags: ['User'],
    summary: 'Mark a series as favorite',
};

export { userSerieFavoriteSchema };
