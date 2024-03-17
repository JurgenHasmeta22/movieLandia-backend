export const moviePaths = {
    '/getMovies': {
        get: {
            summary: 'Returns the list of all the movies',
            tags: ['Movies'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            parameters: [
                {
                    name: 'sortBy',
                    in: 'query',
                    schema: {
                        type: 'string',
                    },
                    description: 'Sort field for movies (e.g., title, releaseYear)',
                },
                {
                    name: 'ascOrDesc',
                    in: 'query',
                    schema: {
                        type: 'string',
                        enum: ['asc', 'desc'],
                    },
                    description: 'Sort order for movies (ascending or descending)',
                },
                {
                    name: 'page',
                    in: 'query',
                    schema: {
                        type: 'integer',
                    },
                    description: 'Page number for pagination',
                },
                {
                    name: 'pageSize',
                    in: 'query',
                    schema: {
                        type: 'integer',
                    },
                    description: 'Number of items per page for pagination',
                },
                {
                    name: 'title',
                    in: 'query',
                    schema: {
                        type: 'string',
                    },
                    description: 'Search movies by title',
                },
                {
                    name: 'filterValue',
                    in: 'query',
                    schema: {
                        type: 'string',
                    },
                    description: 'Value to filter movies',
                },
                {
                    name: 'filterName',
                    in: 'query',
                    schema: {
                        type: 'string',
                    },
                    description: 'Name of the field to filter movies',
                },
                {
                    name: 'filterOperator',
                    in: 'query',
                    schema: {
                        type: 'string',
                    },
                    description: 'Operator to use for filtering (e.g., eq, gt, lt)',
                },
            ],
            responses: {
                '200': {
                    description: 'The list of the movies',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Movie',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    '/getMovieById/{id}': {
        get: {
            summary: 'Get the movie by id',
            tags: ['Movies'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'The movie id',
                },
            ],
            responses: {
                '200': {
                    description: 'The movie description by id',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Movie',
                            },
                        },
                    },
                },
                '404': {
                    description: 'The movie was not found',
                },
            },
        },
    },
    '/updateMovieById/{id}': {
        patch: {
            summary: 'Update the movie by the id',
            tags: ['Movies'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'The movie id to update',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/MoviePatch',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'The movie was updated',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MoviePatch',
                            },
                        },
                    },
                },
                '404': {
                    description: 'The movie was not found',
                },
                '500': {
                    description: 'Some error happened',
                },
            },
        },
        put: {
            summary: 'Update the movie by the id',
            tags: ['Movies'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'The movie id to update',
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/MoviePost',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'The movie was updated',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MoviePost',
                            },
                        },
                    },
                },
                '404': {
                    description: 'The movie was not found',
                },
                '500': {
                    description: 'Some error happened',
                },
            },
        },
    },
    'deleteMovieById/{id}': {
        delete: {
            summary: 'Remove the movie by id',
            tags: ['Movies'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'id',
                    schema: {
                        type: 'number',
                    },
                    required: true,
                    description: 'The movie id',
                },
            ],
            responses: {
                '200': {
                    description: 'The movie was deleted',
                },
                '404': {
                    description: 'The movie was not found',
                },
            },
        },
    },
    addMovie: {
        post: {
            summary: 'Create a new movie',
            tags: ['Movies'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/MoviePost',
                        },
                    },
                },
            },
            responses: {
                '200': {
                    description: 'The movie was successfully created',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/MoviePost',
                            },
                        },
                    },
                },
                '500': {
                    description: 'Some server error',
                },
            },
        },
    },
    '/getMovieByTitle/{title}': {
        get: {
            summary: 'Get the movie by title',
            tags: ['Movies'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            parameters: [
                {
                    in: 'path',
                    name: 'title',
                    schema: {
                        type: 'string',
                    },
                    required: true,
                    description: 'The movie title',
                },
            ],
            responses: {
                '200': {
                    description: 'The movie description by title',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Movie',
                            },
                        },
                    },
                },
                '404': {
                    description: 'The movie was not found',
                },
            },
        },
    },
    '/latestMovies': {
        get: {
            summary: 'Returns the list of the latest movies',
            tags: ['Movies'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            responses: {
                '200': {
                    description: 'The list of the latest movies',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    $ref: '#/components/schemas/Movie',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
