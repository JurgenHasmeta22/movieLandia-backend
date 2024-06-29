const seasonSerieSchema = {
    description: 'Create or update a season for a serie',
    tags: ['season', 'serie'],
    summary: 'Create or update season for serie',
    body: {
        type: 'object',
        required: ['serieId', 'seasonId'],
        properties: {
            serieId: { type: 'integer', minimum: 1, description: 'Serie ID' },
            seasonId: { type: 'integer', minimum: 1, description: 'Season ID' },
            seasonTitle: { type: 'string', description: 'Title of the season' },
            episodes: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        episodeId: { type: 'integer', description: 'Episode ID' },
                        episodeTitle: { type: 'string', description: 'Episode title' },
                        description: { type: 'string', description: 'Episode description' },
                    },
                },
                description: 'List of episodes in the season',
            },
        },
    },
    response: {
        201: {
            description: 'Season created or updated successfully',
            type: 'object',
            properties: {
                seasonId: { type: 'integer', description: 'Season ID' },
                serieId: { type: 'integer', description: 'Serie ID' },
                seasonTitle: { type: 'string', description: 'Title of the season' },
                episodes: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            episodeId: { type: 'integer', description: 'Episode ID' },
                            episodeTitle: { type: 'string', description: 'Episode title' },
                            description: { type: 'string', description: 'Episode description' },
                        },
                    },
                    description: 'List of episodes in the season',
                },
                createdAt: { type: 'string', format: 'date-time', description: 'Creation timestamp' },
                updatedAt: { type: 'string', format: 'date-time', description: 'Update timestamp' },
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
