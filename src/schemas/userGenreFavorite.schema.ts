const userGenreFavoriteSchema = {
    type: 'object',
    properties: {
        userId: {
            type: 'integer',
            minimum: 1,
            description: 'ID of the user who is marking the genre as favorite',
        },
        genreId: {
            type: 'integer',
            minimum: 1,
            description: 'ID of the genre being marked as favorite',
        },
    },
    required: ['userId', 'genreId'],
    description: 'Schema for marking a genre as favorite for a user',
    tags: ['User Favorites'],
    summary: 'Mark a genre as favorite',
};

export { userGenreFavoriteSchema };
