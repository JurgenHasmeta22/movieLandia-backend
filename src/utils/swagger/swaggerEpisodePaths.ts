export const episodePaths = {
    '/getEpisodes': {
        get: {
            summary: 'Get all episodes',
            tags: ['Episodes'],
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Episode',
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Episodes not found',
                },
                '400': {
                    description: 'Bad request',
                },
            },
        },
    },
    '/getEpisodeById/{id}': {
        get: {
            summary: 'Get episode by ID',
            tags: ['Episodes'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the episode to retrieve',
                    schema: {
                        type: 'integer',
                        format: 'int64',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Episode',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Episode not found',
                },
                '400': {
                    description: 'Bad request',
                },
            },
        },
    },
    '/getEpisodeByTitle/{title}': {
        get: {
            summary: 'Get episode by title',
            tags: ['Episodes'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'title',
                    in: 'path',
                    required: true,
                    description: 'Title of the episode to retrieve',
                    schema: {
                        type: 'string',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Episode',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Episode not found',
                },
                '400': {
                    description: 'Bad request',
                },
            },
        },
    },
    addEpisode: {
        post: {
            summary: 'Add a new episode',
            tags: ['Episodes'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Episode',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Episode',
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request',
                },
            },
        },
    },
    'updateEpisodeById/{id}': {
        patch: {
            summary: 'Update episode by ID',
            tags: ['Episodes'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the episode to update',
                    schema: {
                        type: 'integer',
                        format: 'int64',
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Episode',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Episode',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Episode not found',
                },
                '400': {
                    description: 'Bad request',
                },
            },
        },
        put: {
            summary: 'Update episode by ID',
            tags: ['Episodes'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the episode to update',
                    schema: {
                        type: 'integer',
                        format: 'int64',
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Episode',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Episode',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Episode not found',
                },
                '400': {
                    description: 'Bad request',
                },
            },
        },
    },
    'deleteEpisodeById/{id}': {
        delete: {
            summary: 'Delete episode by ID',
            tags: ['Episodes'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'ID of the episode to delete',
                    schema: {
                        type: 'integer',
                        format: 'int64',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    msg: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request',
                },
            },
        },
    },
    '/searchEpisodes': {
        get: {
            summary: 'Search episodes by title',
            tags: ['Episodes'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    name: 'title',
                    in: 'query',
                    required: true,
                    description: 'Title of the episode to search',
                    schema: {
                        type: 'string',
                    },
                },
                {
                    name: 'page',
                    in: 'query',
                    description: 'Page number',
                    schema: {
                        type: 'integer',
                    },
                },
            ],
            responses: {
                '200': {
                    description: 'Successful response',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Episode',
                                },
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request',
                },
            },
        },
    },
};
