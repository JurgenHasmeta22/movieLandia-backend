export const seriePaths = {
    '/getSeries': {
        get: {
            summary: 'Get all series',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'query',
                    name: 'sortBy',
                    schema: {
                        type: 'string',
                    },
                    description: 'Field to sort by (e.g., "title")',
                },
                {
                    in: 'query',
                    name: 'ascOrDesc',
                    schema: {
                        type: 'string',
                        enum: ['asc', 'desc'],
                    },
                    description: 'Sort order (ascending or descending)',
                },
                {
                    in: 'query',
                    name: 'page',
                    schema: {
                        type: 'integer',
                        default: 1,
                    },
                    description: 'Page number for pagination',
                },
                {
                    in: 'query',
                    name: 'pageSize',
                    schema: {
                        type: 'integer',
                        default: 20,
                    },
                    description: 'Number of items per page',
                },
                {
                    in: 'query',
                    name: 'title',
                    schema: {
                        type: 'string',
                    },
                    description: 'Title of the series',
                },
                {
                    in: 'query',
                    name: 'filterValue',
                    schema: {
                        type: 'integer',
                    },
                    description: 'Value to filter by',
                },
                {
                    in: 'query',
                    name: 'filterName',
                    schema: {
                        type: 'string',
                    },
                    description: 'Name of the field to filter by',
                },
                {
                    in: 'query',
                    name: 'filterOperator',
                    schema: {
                        type: 'string',
                        enum: ['>', '=', '<'],
                    },
                    description: 'Filter operator (greater than, equal to, less than)',
                },
            ],
            responses: {
                '200': {
                    description: 'List of series',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Serie',
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Series not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/getSerieById/{id}': {
        get: {
            summary: 'Get a series by ID',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the series to retrieve',
                },
            ],
            responses: {
                '200': {
                    description: 'Series found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Serie',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Series not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/getSerieByTitle/{title}': {
        get: {
            summary: 'Get a series by title',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'title',
                    schema: {
                        type: 'string',
                    },
                    required: true,
                    description: 'Title of the series to retrieve',
                },
            ],
            responses: {
                '200': {
                    description: 'Series found',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Serie',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Series not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    addSerie: {
        post: {
            summary: 'Create a new series',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Serie',
                        },
                    },
                },
            },
            responses: {
                '201': {
                    description: 'Series created',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Serie',
                            },
                        },
                    },
                },
                '400': {
                    description: 'Bad request',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    'deleteSerieById/{id}': {
        delete: {
            summary: 'Delete a series by ID',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the series to delete',
                },
            ],
            responses: {
                '200': {
                    description: 'Series deleted',
                },
                '404': {
                    description: 'Series not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    'updateSerieById/{id}': {
        patch: {
            summary: 'Update a series partially by ID',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the series to update',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Serie',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Series updated',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Serie',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Series not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
        put: {
            summary: 'Replace a series by ID',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'ID of the series to replace',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Serie',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Series replaced',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Serie',
                            },
                        },
                    },
                },
                '404': {
                    description: 'Series not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/addSeasonToSerie': {
        post: {
            summary: 'Add a season to a series',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                serieId: {
                                    type: 'number',
                                },
                                seasonId: {
                                    type: 'number',
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'Serie updated with the new season',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Serie',
                            },
                        },
                    },
                },
                '405': {
                    description: 'Serie with new season not updated',
                },
                '400': {
                    description: 'Bad request',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/latestSeries': {
        get: {
            summary: 'Get the latest series',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            responses: {
                '200': {
                    description: 'List of latest series',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Serie',
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Series not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
    '/searchSeries': {
        get: {
            summary: 'Search series by title',
            tags: ['Series'],
            security: [{ bearerAuth: [] }],
            parameters: [
                {
                    in: 'query',
                    name: 'title',
                    schema: {
                        type: 'string',
                    },
                    description: 'Title of the series to search',
                },
                {
                    in: 'query',
                    name: 'page',
                    schema: {
                        type: 'number',
                    },
                    description: 'Page number for pagination',
                },
            ],
            responses: {
                '200': {
                    description: 'List of series matching the search query',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Serie',
                                },
                            },
                        },
                    },
                },
                '404': {
                    description: 'Series not found',
                },
                '500': {
                    description: 'Internal Server Error',
                },
            },
        },
    },
};
