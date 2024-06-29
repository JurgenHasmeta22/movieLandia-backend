const allowedSortByProperties = ['id', 'title', 'photoSrc', 'videoSrc', 'description'];

const episodeIdParamSchema = {
    description: 'Episode ID parameter',
    tags: ['episode'],
    summary: 'Episode ID parameter',
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1, description: 'Episode ID' },
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

const episodeTitleParamSchema = {
    description: 'Episode title parameter',
    tags: ['episode'],
    summary: 'Episode title parameter',
    params: {
        type: 'object',
        properties: {
            title: { type: 'string', pattern: '^[a-zA-Z\\s]+$', description: 'Episode title' },
        },
        required: ['title'],
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

const episodeQuerySchema = {
    description: 'Query episodes',
    tags: ['episode'],
    summary: 'Query episodes',
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
            title: { type: 'string', description: 'Episode title filter' },
            filterValue: { type: 'string', description: 'Filter value' },
            filterName: {
                type: 'string',
                enum: ['title', 'releaseYear'],
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
                    id: { type: 'integer', description: 'Episode ID' },
                    title: { type: 'string', description: 'Episode title' },
                    photoSrc: { type: 'string', description: 'Photo source URL' },
                    videoSrc: { type: 'string', description: 'Video source URL' },
                    description: { type: 'string', description: 'Episode description' },
                    serieId: { type: 'integer', description: 'Associated serie ID' },
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

const episodeSchemaUpdate = {
    description: 'Update episode details',
    tags: ['episode'],
    summary: 'Update episode',
    body: {
        type: 'object',
        properties: {
            title: { type: 'string', description: 'Episode title' },
            photoSrc: { type: 'string', description: 'Photo source URL' },
            videoSrc: { type: 'string', description: 'Video source URL' },
            description: { type: 'string', description: 'Episode description' },
            serieId: { type: 'number', description: 'Associated serie ID' },
        },
    },
    response: {
        200: {
            description: 'Episode updated successfully',
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'Episode ID' },
                title: { type: 'string', description: 'Episode title' },
                photoSrc: { type: 'string', description: 'Photo source URL' },
                videoSrc: { type: 'string', description: 'Video source URL' },
                description: { type: 'string', description: 'Episode description' },
                serieId: { type: 'integer', description: 'Associated serie ID' },
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

const episodeSchemaPost = {
    description: 'Create a new episode',
    tags: ['episode'],
    summary: 'Create episode',
    body: {
        type: 'object',
        required: ['title', 'photoSrc', 'videoSrc', 'description', 'serieId'],
        properties: {
            title: { type: 'string', description: 'Episode title' },
            photoSrc: { type: 'string', description: 'Photo source URL' },
            videoSrc: { type: 'string', description: 'Video source URL' },
            description: { type: 'string', description: 'Episode description' },
            serieId: { type: 'number', description: 'Associated serie ID' },
        },
    },
    response: {
        201: {
            description: 'Episode created successfully',
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'Episode ID' },
                title: { type: 'string', description: 'Episode title' },
                photoSrc: { type: 'string', description: 'Photo source URL' },
                videoSrc: { type: 'string', description: 'Video source URL' },
                description: { type: 'string', description: 'Episode description' },
                serieId: { type: 'integer', description: 'Associated serie ID' },
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

export { episodeIdParamSchema, episodeTitleParamSchema, episodeQuerySchema, episodeSchemaUpdate, episodeSchemaPost };
