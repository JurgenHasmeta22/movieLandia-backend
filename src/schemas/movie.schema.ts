import { FastifySchema } from 'fastify';

const allowedSortByProperties = [
    'id',
    'title',
    'photoSrc',
    'trailerSrc',
    'duration',
    'ratingImdb',
    'releaseYear',
    'description',
];

const allowedSortByPropertiesDetails = ['createdAt', 'rating'];

const movieQuerySchema: FastifySchema = {
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

const movieIdParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1 },
        },
    },
};

const movieTitleParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            title: { type: 'string' },
        },
    },
    querystring: {
        type: 'object',
        properties: {
            ascOrDesc: {
                type: 'string',
                enum: ['asc', 'desc'],
            },
            page: { type: 'integer', minimum: 1 },
            upvotesPage: { type: 'integer', minimum: 1 },
            downvotesPage: { type: 'integer', minimum: 1 },
            sortBy: {
                type: 'string',
                enum: allowedSortByPropertiesDetails,
            },
        },
    },
};

const movieSchemaUpdate: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            photoSrc: { type: 'string' },
            trailerSrc: { type: 'string', format: 'uri' },
            duration: { type: 'string', minLength: 1, maxLength: 10 },
            ratingImdb: { type: 'number', minimum: 0, maximum: 10 },
            releaseYear: { type: 'integer', minimum: 1900, maximum: new Date().getFullYear() },
            description: { type: 'string', minLength: 10, maxLength: 200 },
        },
        required: [],
    },
};

const movieSchemaPost: FastifySchema = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
            photoSrc: { type: 'string' },
            trailerSrc: { type: 'string', format: 'uri' },
            duration: { type: 'string', minLength: 1, maxLength: 10 },
            ratingImdb: { type: 'number', minimum: 0, maximum: 10 },
            releaseYear: { type: 'integer', minimum: 1900, maximum: new Date().getFullYear() },
            description: { type: 'string', minLength: 10, maxLength: 200 },
        },
        required: ['title', 'photoSrc', 'trailerSrc', 'duration', 'ratingImdb', 'releaseYear', 'description'],
    },
};

export { movieSchemaPost, movieSchemaUpdate, movieQuerySchema, movieIdParamSchema, movieTitleParamSchema };
