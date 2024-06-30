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
    description: 'Query movies',
    tags: ['movie'],
    summary: 'Query movies',
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
            title: { type: 'string', description: 'Movie title filter' },
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
                    id: { type: 'integer', description: 'Movie ID' },
                    title: { type: 'string', description: 'Movie title' },
                    photoSrc: { type: 'string', description: 'Photo source URL' },
                    trailerSrc: { type: 'string', format: 'uri', description: 'Trailer source URL' },
                    duration: { type: 'string', description: 'Duration of the movie' },
                    ratingImdb: { type: 'number', description: 'IMDB rating' },
                    releaseYear: { type: 'integer', description: 'Release year' },
                    description: { type: 'string', description: 'Movie description' },
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
};

const movieIdParamSchema = {
    description: 'Movie ID parameter',
    tags: ['movie'],
    summary: 'Movie ID parameter',
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1, description: 'Movie ID' },
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
};

const movieTitleParamSchema = {
    description: 'Movie title parameter',
    tags: ['movie'],
    summary: 'Movie title parameter',
    params: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
                pattern: '^(?!\\d+$)[\\w\\s]*$',
                description: 'Movie title',
            },
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
};

const movieTitleQueryParam = {
    description: 'Query movie by title',
    tags: ['movie'],
    summary: 'Query movie by title',
    querystring: {
        type: 'object',
        properties: {
            ascOrDesc: {
                type: 'string',
                enum: ['asc', 'desc'],
                description: 'Sort order',
            },
            page: { type: 'integer', minimum: 1, description: 'Page number' },
            upvotesPage: { type: 'integer', minimum: 1, description: 'Upvotes page number' },
            downvotesPage: { type: 'integer', minimum: 1, description: 'Downvotes page number' },
            sortBy: {
                type: 'string',
                enum: allowedSortByPropertiesDetails,
                description: 'Property to sort by',
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
                    id: { type: 'integer', description: 'Movie ID' },
                    title: { type: 'string', description: 'Movie title' },
                    photoSrc: { type: 'string', description: 'Photo source URL' },
                    trailerSrc: { type: 'string', format: 'uri', description: 'Trailer source URL' },
                    duration: { type: 'string', description: 'Duration of the movie' },
                    ratingImdb: { type: 'number', description: 'IMDB rating' },
                    releaseYear: { type: 'integer', description: 'Release year' },
                    description: { type: 'string', description: 'Movie description' },
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
};

const movieSchemaUpdate = {
    description: 'Update movie details',
    tags: ['movie'],
    summary: 'Update movie',
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1, description: 'Movie ID' },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        properties: {
            title: { type: 'string', description: 'Movie title' },
            photoSrc: { type: 'string', description: 'Photo source URL' },
            trailerSrc: { type: 'string', format: 'uri', description: 'Trailer source URL' },
            duration: { type: 'string', minLength: 1, maxLength: 10, description: 'Duration of the movie' },
            ratingImdb: { type: 'number', minimum: 0, maximum: 10, description: 'IMDB rating' },
            releaseYear: {
                type: 'integer',
                minimum: 1900,
                maximum: new Date().getFullYear(),
                description: 'Release year',
            },
            description: { type: 'string', minLength: 10, maxLength: 200, description: 'Movie description' },
        },
    },
    response: {
        200: {
            description: 'Movie updated successfully',
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'Movie ID' },
                title: { type: 'string', description: 'Movie title' },
                photoSrc: { type: 'string', description: 'Photo source URL' },
                trailerSrc: { type: 'string', format: 'uri', description: 'Trailer source URL' },
                duration: { type: 'string', description: 'Duration of the movie' },
                ratingImdb: { type: 'number', description: 'IMDB rating' },
                releaseYear: { type: 'integer', description: 'Release year' },
                description: { type: 'string', description: 'Movie description' },
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
};

const movieSchemaPost = {
    description: 'Create a new movie',
    tags: ['movie'],
    summary: 'Create movie',
    body: {
        type: 'object',
        required: ['title', 'photoSrc', 'trailerSrc', 'duration', 'ratingImdb', 'releaseYear', 'description'],
        properties: {
            title: { type: 'string', description: 'Movie title' },
            photoSrc: { type: 'string', description: 'Photo source URL' },
            trailerSrc: { type: 'string', format: 'uri', description: 'Trailer source URL' },
            duration: { type: 'string', minLength: 1, maxLength: 10, description: 'Duration of the movie' },
            ratingImdb: { type: 'number', minimum: 0, maximum: 10, description: 'IMDB rating' },
            releaseYear: {
                type: 'integer',
                minimum: 1900,
                maximum: new Date().getFullYear(),
                description: 'Release year',
            },
            description: { type: 'string', minLength: 10, maxLength: 200, description: 'Movie description' },
        },
    },
    response: {
        201: {
            description: 'Movie created successfully',
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'Movie ID' },
                title: { type: 'string', description: 'Movie title' },
                photoSrc: { type: 'string', description: 'Photo source URL' },
                trailerSrc: { type: 'string', format: 'uri', description: 'Trailer source URL' },
                duration: { type: 'string', description: 'Duration of the movie' },
                ratingImdb: { type: 'number', description: 'IMDB rating' },
                releaseYear: { type: 'integer', description: 'Release year' },
                description: { type: 'string', description: 'Movie description' },
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
};

const movieSchemaPut = {
    description: 'Update a movie',
    tags: ['movie'],
    summary: 'Update movie',
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1, description: 'Movie ID' },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        required: ['title', 'photoSrc', 'trailerSrc', 'duration', 'ratingImdb', 'releaseYear', 'description'],
        properties: {
            title: { type: 'string', description: 'Movie title' },
            photoSrc: { type: 'string', description: 'Photo source URL' },
            trailerSrc: { type: 'string', format: 'uri', description: 'Trailer source URL' },
            duration: { type: 'string', minLength: 1, maxLength: 10, description: 'Duration of the movie' },
            ratingImdb: { type: 'number', minimum: 0, maximum: 10, description: 'IMDB rating' },
            releaseYear: {
                type: 'integer',
                minimum: 1900,
                maximum: new Date().getFullYear(),
                description: 'Release year',
            },
            description: { type: 'string', minLength: 10, maxLength: 200, description: 'Movie description' },
        },
    },
    response: {
        201: {
            description: 'Movie created successfully',
            type: 'object',
            properties: {
                id: { type: 'integer', description: 'Movie ID' },
                title: { type: 'string', description: 'Movie title' },
                photoSrc: { type: 'string', description: 'Photo source URL' },
                trailerSrc: { type: 'string', format: 'uri', description: 'Trailer source URL' },
                duration: { type: 'string', description: 'Duration of the movie' },
                ratingImdb: { type: 'number', description: 'IMDB rating' },
                releaseYear: { type: 'integer', description: 'Release year' },
                description: { type: 'string', description: 'Movie description' },
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
};

export {
    movieTitleQueryParam,
    movieSchemaPost,
    movieSchemaUpdate,
    movieQuerySchema,
    movieIdParamSchema,
    movieTitleParamSchema,
    movieSchemaPut,
};
