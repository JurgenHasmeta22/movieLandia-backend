const allowedSortByProperties = ['id', 'photoSrc', 'releaseYear', 'title', 'ratingImdb'];
const allowedSortByPropertiesDetails = ['createdAt', 'rating'];

const serieQuerySchema = {
    type: 'object',
    properties: {
        sortBy: {
            type: 'string',
            enum: allowedSortByProperties,
            description: 'Field to sort by',
        },
        ascOrDesc: {
            type: 'string',
            enum: ['asc', 'desc'],
            description: 'Sort order (ascending or descending)',
        },
        page: {
            type: 'integer',
            minimum: 1,
            description: 'Page number for pagination',
        },
        pageSize: {
            type: 'integer',
            minimum: 1,
            maximum: 100,
            description: 'Number of items per page',
        },
        title: {
            type: 'string',
            description: 'Filter by title (exact match)',
        },
        filterValue: {
            type: 'string',
            description: 'Filter value (for dynamic filtering)',
        },
        filterName: {
            type: 'string',
            enum: ['title', 'releaseYear'],
            description: 'Name of the field to filter',
        },
        filterOperator: {
            type: 'string',
            enum: ['equals', 'contains', 'startsWith', 'endsWith'],
            description: 'Filter operator for textual filters',
        },
    },
    description: 'Query parameters for fetching series',
    tags: ['Series'],
    summary: 'Query series with filtering and pagination',
};

const serieIdParamSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        },
    },
    description: 'Parameters for series ID',
    tags: ['Series'],
    summary: 'Series ID parameter',
};

const serieTitleParamSchema = {
    type: 'object',
    properties: {
        title: {
            type: 'string',
        },
    },
    description: 'Parameters for series title',
    tags: ['Series'],
    summary: 'Series title parameter',
};

const serieTitleQuerySchema = {
    type: 'object',
    properties: {
        ascOrDesc: {
            type: 'string',
            enum: ['asc', 'desc'],
            description: 'Sort order for titles (ascending or descending)',
        },
        page: {
            type: 'integer',
            minimum: 1,
            description: 'Page number for pagination of titles',
        },
        upvotesPage: {
            type: 'integer',
            minimum: 1,
            description: 'Page number for upvoted titles',
        },
        downvotesPage: {
            type: 'integer',
            minimum: 1,
            description: 'Page number for downvoted titles',
        },
        sortBy: {
            type: 'string',
            enum: allowedSortByPropertiesDetails,
            description: 'Field to sort titles by',
        },
    },
    description: 'Query parameters for fetching series titles',
    tags: ['Series'],
    summary: 'Query series titles with sorting and pagination',
};

const serieSchemaUpdate = {
    type: 'object',
    properties: {
        title: { type: 'string', description: 'Updated title of the series' },
        photoSrc: { type: 'string', description: 'Updated photo URL of the series' },
        releaseYear: { type: 'integer', minimum: 1900, description: 'Updated release year of the series' },
        ratingImdb: { type: 'number', minimum: 0, description: 'Updated IMDb rating of the series' },
    },
    description: 'Schema for updating series details',
    tags: ['Series'],
    summary: 'Update series details',
};

const serieSchemaPost = {
    type: 'object',
    properties: {
        title: { type: 'string', description: 'Title of the new series' },
        photoSrc: { type: 'string', description: 'Photo URL of the new series' },
        releaseYear: { type: 'integer', minimum: 1900, description: 'Release year of the new series' },
        ratingImdb: { type: 'number', minimum: 0, description: 'IMDb rating of the new series' },
    },
    required: ['title', 'photoSrc', 'releaseYear', 'ratingImdb'],
    description: 'Schema for creating a new series',
    tags: ['Series'],
    summary: 'Create a new series',
};

export {
    serieTitleQuerySchema,
    serieSchemaPost,
    serieSchemaUpdate,
    serieQuerySchema,
    serieIdParamSchema,
    serieTitleParamSchema,
};
