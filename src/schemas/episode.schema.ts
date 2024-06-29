import { FastifySchema } from 'fastify';

const allowedSortByProperties = ['id', 'title', 'photoSrc', 'videoSrc', 'description'];

const episodeIdParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1 },
        },
    },
};

const episodeTitleParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            title: { type: 'string', pattern: '^[a-zA-Z\\s]+$' },
        },
    },
};

const episodeQuerySchema: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            sortBy: {
                type: 'string',
                enum: allowedSortByProperties,
            },
            ascOrDesc: {
                type: 'string',
                enum: ['asc', 'desc'],
            },
            page: { type: 'integer', minimum: 1 },
            pageSize: { type: 'integer', minimum: 1, maximum: 100 },
            title: { type: 'string' },
            filterValue: { type: 'string' },
            filterName: {
                type: 'string',
                enum: ['title', 'releaseYear'],
            },
            filterOperator: {
                type: 'string',
                enum: ['equals', 'contains', 'startsWith', 'endsWith'],
            },
        },
    },
};

const episodeSchemaUpdate: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            photoSrc: { type: 'string' },
            videoSrc: { type: 'string' },
            description: { type: 'string' },
            serieId: { type: 'number' },
        },
        required: [],
    },
};

const episodeSchemaPost: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            photoSrc: { type: 'string' },
            videoSrc: { type: 'string' },
            description: { type: 'string' },
            serieId: { type: 'number' },
        },
        required: ['title', 'photoSrc', 'videoSrc', 'description', 'serieId'],
    },
};

export {
    episodeIdParamSchema,
    episodeTitleParamSchema,
    episodeQuerySchema,
    episodeSchemaUpdate,
    episodeSchemaPost,
};
