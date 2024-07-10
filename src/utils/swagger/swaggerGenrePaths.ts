export const genrePaths = {
    '/getGenres': {
        get: {
            summary: 'Get all genres',
            tags: ['Genres'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'query',
                    name: 'name',
                    schema: {
                        type: 'string',
                    },
                    description: 'Name of the genre',
                },
            ],
            responses: {
                '200': {
                    description: 'List of genres',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Genre',
                                },
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
    addGenre: {
        post: {
            summary: 'Create a new genre',
            tags: ['Genres'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Genre',
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Genre created',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Genre',
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
    'updateGenreById/{id}': {
        put: {
            summary: 'Update a genre by ID',
            tags: ['Genres'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the genre to update',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Genre',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Genre updated',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Genre',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Genre not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
        patch: {
            summary: 'Update a genre partially by ID',
            tags: ['Genres'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the genre to update',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Genre',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Genre updated',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Genre',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Genre not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    'deleteGenreById/{id}': {
        delete: {
            summary: 'Delete a genre by ID',
            tags: ['Genres'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the genre to delete',
                },
            ],
            responses: {
                '200': {
                    description: 'Genre deleted',
                },
                '404': {
                    description: 'Genre not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/getGenresById/{id}': {
        get: {
            summary: 'Get a genre by ID',
            tags: ['Genres'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the genre to retrieve',
                },
            ],
            responses: {
                '200': {
                    description: 'Genre found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Genre',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Genre not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/getGenresByName/{name}': {
        get: {
            summary: 'Get a genre by name',
            tags: ['Genres'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'name',
                    schema: {
                        type: 'string',
                    },
                    required: true,
                    description: 'Name of the genre to retrieve',
                },
            ],
            responses: {
                '200': {
                    description: 'Genre found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Genre',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Genre not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/searchGenres': {
        get: {
            summary: 'Search genres by name',
            tags: ['Genres'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'query',
                    name: 'name',
                    schema: {
                        type: 'string',
                    },
                    description: 'Name of the genre to search',
                },
            ],
            responses: {
                '200': {
                    description: 'List of genres matching the search query',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Genre',
                                },
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
};
