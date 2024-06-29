import { FastifySchema } from 'fastify';

const allowedSortByProperties = ['name', 'id', 'createdAt', 'updatedAt'];

const genreSchemaUpdate: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
        },
        required: [],
    },
};

const genreSchemaPost: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
        },
        required: ['name'],
    },
};

const genreIdParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1 },
        },
    },
};

const genreNameParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            name: { type: 'string' },
        },
    },
};

const genreQuerySchema: FastifySchema = {
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
            name: { type: 'string' },
            filterValue: { type: 'string' },
            filterName: {
                type: 'string',
                enum: ['name', 'id'],
            },
            filterOperator: {
                type: 'string',
                enum: ['equals', 'contains', 'startsWith', 'endsWith'],
            },
        },
    },
};

export {
    genreSchemaPost,
    genreSchemaUpdate,
    genreQuerySchema,
    genreIdParamSchema,
    genreNameParamSchema,
};
