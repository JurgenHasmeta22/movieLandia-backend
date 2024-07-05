const userMovieFavoriteSchema = {
    body: {
        type: 'object',
        properties: {
            userId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the user who is marking the movie as favorite',
            },
            movieId: {
                type: 'integer',
                minimum: 1,
                description: 'ID of the movie being marked as favorite',
            },
        },
    },
    required: ['userId', 'movieId'],
    description: 'Schema for marking a movie as favorite for a user',
    tags: ['User'],
    summary: 'Mark a movie as favorite',
};

export { userMovieFavoriteSchema };
