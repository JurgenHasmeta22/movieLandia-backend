const allowedSortByProperties = ['name', 'id', 'createdAt', 'updatedAt'];

const genreSchemaUpdate = {
    description: 'Update genre details',
    tags: ['genre'],
    summary: 'Update genre',
    body: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Genre name' },
        },
    },
    response: {
        200: {
            description: 'Genre updated successfully',
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'Genre ID' },
                name: { type: 'string', description: 'Genre name' },
            },
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        404: {
            description: 'Not Found',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
    },
    security: [
        {
            apiKey: [],
        },
    ],
};

const genreSchemaPost = {
    description: 'Create a new genre',
    tags: ['genre'],
    summary: 'Create genre',
    body: {
        type: 'object',
        required: ['name'],
        properties: {
            name: { type: 'string', description: 'Genre name' },
        },
    },
    response: {
        201: {
            description: 'Genre created successfully',
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'Genre ID' },
                name: { type: 'string', description: 'Genre name' },
            },
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
    },
    security: [
        {
            apiKey: [],
        },
    ],
};

const genreIdParamSchema = {
    description: 'Genre ID parameter',
    tags: ['genre'],
    summary: 'Genre ID parameter',
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1, description: 'Genre ID' },
        },
        required: ['id'],
    },
    response: {
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        404: {
            description: 'Not Found',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
    },
    security: [
        {
            apiKey: [],
        },
    ],
};

const genreNameParamSchema = {
    description: 'Genre name parameter',
    tags: ['genre'],
    summary: 'Genre name parameter',
    params: {
        type: 'object',
        properties: {
            name: { type: 'string', description: 'Genre name' },
        },
        required: ['name'],
    },
    response: {
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        404: {
            description: 'Not Found',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
    },
    security: [
        {
            apiKey: [],
        },
    ],
};

const genreQuerySchema = {
    description: 'Query genres',
    tags: ['genre'],
    summary: 'Query genres',
    querystring: {
        type: 'object',
        properties: {
            sortBy: {
                type: 'string',
                enum: allowedSortByProperties,
                description: 'Property to sort by',
            },
            ascOrDesc: {
                type: 'string',
                enum: ['asc', 'desc'],
                description: 'Sort order',
            },
            page: { type: 'integer', minimum: 1, description: 'Page number' },
            pageSize: { type: 'integer', minimum: 1, maximum: 100, description: 'Number of items per page' },
            name: { type: 'string', description: 'Genre name filter' },
            filterValue: { type: 'string', description: 'Filter value' },
            filterName: {
                type: 'string',
                enum: ['name', 'id'],
                description: 'Filter name',
            },
            filterOperator: {
                type: 'string',
                enum: ['equals', 'contains', 'startsWith', 'endsWith'],
                description: 'Filter operator',
            },
        },
    },
    response: {
        200: {
            description: 'Query executed successfully',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'integer', description: 'Genre ID' },
                    name: { type: 'string', description: 'Genre name' },
                    createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
                    updatedAt: { type: 'string', format: 'date-time', description: 'Update timestamp' },
                },
            },
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
    },
    security: [
        {
            apiKey: [],
        },
    ],
};

export { genreSchemaPost, genreSchemaUpdate, genreQuerySchema, genreIdParamSchema, genreNameParamSchema };
