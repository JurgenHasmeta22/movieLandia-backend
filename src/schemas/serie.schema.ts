import { FastifySchema } from 'fastify';

const allowedSortByProperties = ['id', 'photoSrc', 'releaseYear', 'title', 'ratingImdb'];
const allowedSortByPropertiesDetails = ['createdAt', 'rating'];

const serieQuerySchema: FastifySchema = {
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
            page: {
                type: 'integer',
                minimum: 1,
            },
            pageSize: {
                type: 'integer',
                minimum: 1,
                maximum: 100,
            },
            title: {
                type: 'string',
            },
            filterValue: {
                type: 'string',
            },
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

const serieIdParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                minimum: 1,
            },
        },
    },
};

const serieTitleParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
            },
        },
    },
    querystring: {
        type: 'object',
        properties: {
            ascOrDesc: {
                type: 'string',
                enum: ['asc', 'desc'],
            },
            page: {
                type: 'integer',
                minimum: 1,
            },
            upvotesPage: {
                type: 'integer',
                minimum: 1,
            },
            downvotesPage: {
                type: 'integer',
                minimum: 1,
            },
            sortBy: {
                type: 'string',
                enum: allowedSortByPropertiesDetails,
            },
        },
    },
};

const serieSchemaUpdate: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
            },
            photoSrc: {
                type: 'string',
            },
            releaseYear: {
                type: 'integer',
                minimum: 1900,
            },
            ratingImdb: {
                type: 'number',
                minimum: 0,
            },
        },
        required: [],
    },
};

const serieSchemaPost: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
            },
            photoSrc: {
                type: 'string',
            },
            releaseYear: {
                type: 'integer',
                minimum: 1900,
            },
            ratingImdb: {
                type: 'number',
                minimum: 0,
            },
        },
        required: ['title', 'photoSrc', 'releaseYear', 'ratingImdb'],
    },
};

export { serieSchemaPost, serieSchemaUpdate, serieQuerySchema, serieIdParamSchema, serieTitleParamSchema };
