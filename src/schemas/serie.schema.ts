const allowedSortByProperties = ['id', 'title', 'photoSrc', 'releaseYear', 'ratingImdb'];
const allowedSortByPropertiesDetails = ['createdAt', 'rating'];

const serieQuerySchema = {
    description: 'Query series',
    tags: ['Serie'],
    summary: 'Query series',
    querystring: {
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
    },
    // response: {
    //     200: {
    //         description: 'Query executed successfully',
    //         type: 'array',
    //         items: {
    //             type: 'object',
    //             properties: {
    //                 id: { type: 'integer', description: 'Series ID' },
    //                 title: { type: 'string', description: 'Series title' },
    //                 photoSrc: { type: 'string', description: 'Photo source URL' },
    //                 releaseYear: { type: 'integer', description: 'Release year' },
    //                 ratingImdb: { type: 'number', description: 'IMDB rating' },
    //             },
    //         },
    //     },
    //     400: {
    //         description: 'Bad Request',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     500: {
    //         description: 'Internal Server Error',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    // },
};

const serieIdParamSchema = {
    description: 'Series ID parameter',
    tags: ['Serie'],
    summary: 'Series ID parameter',
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1, description: 'Series ID' },
        },
        required: ['id'],
    },
    // response: {
    //     400: {
    //         description: 'Bad Request',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     404: {
    //         description: 'Not Found',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     500: {
    //         description: 'Internal Server Error',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    // },
};

const serieTitleParamSchema = {
    description: 'Series title parameter',
    tags: ['Serie'],
    summary: 'Series title parameter',
    params: {
        type: 'object',
        properties: {
            title: {
                type: 'string',
                pattern: '^(?!\\d+$)[\\w\\s]*$',
                description: 'Series title',
            },
        },
        required: ['title'],
    },
    // response: {
    //     400: {
    //         description: 'Bad Request',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     404: {
    //         description: 'Not Found',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     500: {
    //         description: 'Internal Server Error',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    // },
};

const serieTitleQuerySchema = {
    description: 'Query series by title',
    tags: ['Serie'],
    summary: 'Query series by title',
    querystring: {
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
    },
    // response: {
    //     200: {
    //         description: 'Query executed successfully',
    //         type: 'array',
    //         items: {
    //             type: 'object',
    //             properties: {
    //                 id: { type: 'integer', description: 'Series ID' },
    //                 title: { type: 'string', description: 'Series title' },
    //                 photoSrc: { type: 'string', description: 'Photo source URL' },
    //                 releaseYear: { type: 'integer', description: 'Release year' },
    //                 ratingImdb: { type: 'number', description: 'IMDB rating' },
    //             },
    //         },
    //     },
    //     400: {
    //         description: 'Bad Request',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     500: {
    //         description: 'Internal Server Error',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    // },
};

const serieSchemaUpdate = {
    description: 'Update series details',
    tags: ['Serie'],
    summary: 'Update series',
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1, description: 'Series ID' },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        properties: {
            title: { type: 'string', description: 'Updated title of the series' },
            photoSrc: { type: 'string', description: 'Updated photo URL of the series' },
            releaseYear: { type: 'integer', minimum: 1900, description: 'Updated release year of the series' },
            ratingImdb: { type: 'number', minimum: 0, description: 'Updated IMDb rating of the series' },
        },
    },
    // response: {
    //     200: {
    //         description: 'Series updated successfully',
    //         type: 'object',
    //         properties: {
    //             id: { type: 'integer', description: 'Series ID' },
    //             title: { type: 'string', description: 'Series title' },
    //             photoSrc: { type: 'string', description: 'Photo source URL' },
    //             releaseYear: { type: 'integer', description: 'Release year' },
    //             ratingImdb: { type: 'number', description: 'IMDB rating' },
    //         },
    //     },
    //     400: {
    //         description: 'Bad Request',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     404: {
    //         description: 'Not Found',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     500: {
    //         description: 'Internal Server Error',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    // },
};

const serieSchemaPost = {
    description: 'Create a new series',
    tags: ['Serie'],
    summary: 'Create series',
    body: {
        type: 'object',
        required: ['title', 'photoSrc', 'releaseYear', 'ratingImdb'],
        properties: {
            title: { type: 'string', description: 'Title of the new series' },
            photoSrc: { type: 'string', description: 'Photo URL of the new series' },
            releaseYear: { type: 'integer', minimum: 1900, description: 'Release year of the new series' },
            ratingImdb: { type: 'number', minimum: 0, maximum: 10, description: 'IMDb rating of the new series' },
        },
    },
    // response: {
    //     201: {
    //         description: 'Series created successfully',
    //         type: 'object',
    //         properties: {
    //             id: { type: 'integer', description: 'Series ID' },
    //             title: { type: 'string', description: 'Series title' },
    //             photoSrc: { type: 'string', description: 'Photo source URL' },
    //             releaseYear: { type: 'integer', description: 'Release year' },
    //             ratingImdb: { type: 'number', description: 'IMDB rating' },
    //         },
    //     },
    //     400: {
    //         description: 'Bad Request',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     500: {
    //         description: 'Internal Server Error',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    // },
};

const serieSchemaPut = {
    description: 'Update a series',
    tags: ['Serie'],
    summary: 'Update series',
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer', minimum: 1, description: 'Series ID' },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        required: ['title', 'photoSrc', 'releaseYear', 'ratingImdb'],
        properties: {
            title: { type: 'string', description: 'Series title' },
            photoSrc: { type: 'string', description: 'Photo source URL' },
            releaseYear: { type: 'integer', minimum: 1900, description: 'Release year' },
            ratingImdb: { type: 'number', minimum: 0, maximum: 10, description: 'IMDB rating' },
        },
    },
    // response: {
    //     200: {
    //         description: 'Series updated successfully',
    //         type: 'object',
    //         properties: {
    //             id: { type: 'integer', description: 'Series ID' },
    //             title: { type: 'string', description: 'Series title' },
    //             photoSrc: { type: 'string', description: 'Photo source URL' },
    //             releaseYear: { type: 'integer', description: 'Release year' },
    //             ratingImdb: { type: 'number', description: 'IMDB rating' },
    //         },
    //     },
    //     400: {
    //         description: 'Bad Request',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     404: {
    //         description: 'Not Found',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    //     500: {
    //         description: 'Internal Server Error',
    //         type: 'object',
    //         properties: {
    //             error: { type: 'string', description: 'Error message' },
    //         },
    //     },
    // },
};

export {
    serieTitleQuerySchema,
    serieSchemaPost,
    serieSchemaUpdate,
    serieQuerySchema,
    serieIdParamSchema,
    serieTitleParamSchema,
    serieSchemaPut,
};
