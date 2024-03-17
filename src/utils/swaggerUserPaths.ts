export const userPaths = {
    '/getUsers': {
        get: {
            summary: 'Get all users',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'query',
                    name: 'userName',
                    schema: {
                        type: 'string',
                    },
                    description: 'Username of the user',
                },
            ],
            responses: {
                '200': {
                    description: 'List of users',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/User',
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'No users found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/getUserById/{id}': {
        get: {
            summary: 'Get a user by ID',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the user to retrieve',
                },
            ],
            responses: {
                '200': {
                    description: 'User found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '404': {
                    description: 'User not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/getUserByTitle/{title}': {
        get: {
            summary: 'Get a user by username',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'title',
                    schema: {
                        type: 'string',
                    },
                    required: true,
                    description: 'Username of the user to retrieve',
                },
            ],
            responses: {
                '200': {
                    description: 'User found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '404': {
                    description: 'User not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    addUser: {
        post: {
            summary: 'Create a new user',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'User created',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    'updateUserById/{id}': {
        patch: {
            summary: 'Update a user by ID',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the user to update',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'User updated',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '404': {
                    description: 'User not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
        put: {
            summary: 'Replace a user by ID',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the user to replace',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/User',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'User replaced',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '404': {
                    description: 'User not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    'deleteUserById/{id}': {
        delete: {
            summary: 'Delete a user by ID',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the user to delete',
                },
            ],
            responses: {
                '200': {
                    description: 'User deleted',
                },
                '404': {
                    description: 'User not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/bookmarkSeason': {
        post: {
            summary: 'Add a season to user',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                userId: {
                                    type: 'number',
                                    description: 'ID of the user to add season',
                                },
                                seasonId: {
                                    type: 'number',
                                    description: 'ID of the season to add to the user',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Season added to user',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '405': {
                    description: 'User with new season not updated',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/bookmarkSerie': {
        post: {
            summary: 'Add a serie to user',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                userId: {
                                    type: 'number',
                                    description: 'ID of the user to add serie',
                                },
                                serieId: {
                                    type: 'number',
                                    description: 'ID of the serie to add to the user',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Serie added to user',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '405': {
                    description: 'User with new serie not updated',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/bookmarkEpisode': {
        post: {
            summary: 'Add an episode to user',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                userId: {
                                    type: 'number',
                                    description: 'ID of the user to add episode',
                                },
                                episodeId: {
                                    type: 'number',
                                    description: 'ID of the episode to add to the user',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Episode added to user',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '405': {
                    description: 'User with new episode not updated',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/bookmarkGenre': {
        post: {
            summary: 'Add a genre to user',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                userId: {
                                    type: 'number',
                                    description: 'ID of the user to add genre',
                                },
                                genreId: {
                                    type: 'number',
                                    description: 'ID of the genre to add to the user',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Genre added to user',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '405': {
                    description: 'User with new genre not updated',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/bookmarkMovie': {
        post: {
            summary: 'Add a movie to user',
            tags: ['Users'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                userId: {
                                    type: 'number',
                                    description: 'ID of the user to add movie',
                                },
                                movieId: {
                                    type: 'number',
                                    description: 'ID of the movie to add to the user',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Movie added to user',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            },
                        },
                    },
                },
                '405': {
                    description: 'Favorites movies not updated',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
};
