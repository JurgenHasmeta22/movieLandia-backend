import { components } from "./swaggerComponents";
import { paths } from "./swaggerPaths";

export const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movies API',
            version: '1.0.0',
            description: 'Movies API',
        },
        servers: [
            {
                url: 'http://localhost:4000',
            },
        ],
        components: components,
        tags: [
            {
                name: 'Movies',
                description: 'The movies managing API',
            },
            {
                name: 'Authentication',
                description: 'The authentication managing API',
            },
            {
                name: 'Users',
                description: 'The users managing API',
            },
            {
                name: 'Genres',
                description: 'The genres managing API',
            },
            {
                name: 'Episodes',
                description: 'The episodes managing API',
            },
            {
                name: 'Series',
                description: 'The series managing API',
            },
        ],
        paths: paths,
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    apis: ['./src/routes/*.ts'],
};
