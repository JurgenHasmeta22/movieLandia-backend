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

const movieQuerySchema = {
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
};

const movieIdParamSchema = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 },
    },
    required: ['id'],
};

const movieTitleParamSchema = {
    params: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
                pattern: '^(?!\\d+$)[\\w\\s]*$',
            },
        },
        required: ['title'],
    },
};

const movieTitleQueryParam = {
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

const movieSchemaUpdate = {
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
};

const movieSchemaPost = {
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
};

export {
    movieTitleQueryParam,
    movieSchemaPost,
    movieSchemaUpdate,
    movieQuerySchema,
    movieIdParamSchema,
    movieTitleParamSchema,
};
