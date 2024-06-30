const allowedSortByProperties = ['userName', 'email'];

const userIdParamSchema = {
    description: 'Parameters for user ID',
    tags: ['User'],
    summary: 'User ID parameter',
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                minimum: 1,
                description: 'User ID',
            },
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

const userUserNameParamSchema = {
    description: 'Parameters for username',
    tags: ['User'],
    summary: 'Username parameter',
    params: {
        type: 'object',
        properties: {
            userName: {
                type: 'string',
                pattern: '^[a-zA-Z\\s]+$',
                description: 'Username of the user',
            },
        },
        required: ['userName'],
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

const userQuerySchema = {
    description: 'Query users',
    tags: ['User'],
    summary: 'Query users',
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
                description: 'Page number',
            },
            pageSize: {
                type: 'integer',
                minimum: 1,
                maximum: 100,
                description: 'Number of items per page',
            },
            userName: {
                type: 'string',
                description: 'Filter by user name',
            },
            filterValue: {
                type: 'string',
                description: 'Filter value for specified filter name',
            },
            filterName: {
                type: 'string',
                enum: ['userName', 'id'],
                description: 'Filter name (either "userName" or "id")',
            },
            filterOperator: {
                type: 'string',
                enum: ['equals', 'contains', 'startsWith', 'endsWith'],
                description: 'Filter operator',
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
    //                 id: { type: 'integer', description: 'User ID' },
    //                 userName: { type: 'string', description: 'Username of the user' },
    //                 email: { type: 'string', format: 'email', description: 'Email address of the user' },
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

const userSchemaUpdate = {
    description: 'Update user details',
    tags: ['User'],
    summary: 'Update user',
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                minimum: 1,
                description: 'User ID',
            },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        properties: {
            userName: {
                type: 'string',
                description: 'New username for the user',
            },
            email: {
                type: 'string',
                format: 'email',
                description: 'New email address for the user',
            },
            password: {
                type: 'string',
                description: 'New password for the user',
            },
        },
    },
    // response: {
    //     200: {
    //         description: 'User updated successfully',
    //         type: 'object',
    //         properties: {
    //             id: { type: 'integer', description: 'User ID' },
    //             userName: { type: 'string', description: 'Username of the user' },
    //             email: { type: 'string', format: 'email', description: 'Email address of the user' },
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

const userSchemaPost = {
    description: 'Create a new user',
    tags: ['User'],
    summary: 'Create user',
    body: {
        type: 'object',
        required: ['userName', 'email', 'password'],
        properties: {
            userName: {
                type: 'string',
                description: 'Username for the new user',
            },
            email: {
                type: 'string',
                format: 'email',
                description: 'Email address for the new user',
            },
            password: {
                type: 'string',
                description: 'Password for the new user',
            },
        },
    },
    // response: {
    //     201: {
    //         description: 'User created successfully',
    //         type: 'object',
    //         properties: {
    //             id: { type: 'integer', description: 'User ID' },
    //             userName: { type: 'string', description: 'Username of the user' },
    //             email: { type: 'string', format: 'email', description: 'Email address of the user' },
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

const userSchemaPut = {
    description: 'Update a user',
    tags: ['User'],
    summary: 'Update user',
    params: {
        type: 'object',
        properties: {
            id: {
                type: 'integer',
                minimum: 1,
                description: 'User ID',
            },
        },
        required: ['id'],
    },
    body: {
        type: 'object',
        required: ['userName', 'email', 'password'],
        properties: {
            userName: {
                type: 'string',
                description: 'Username of the user',
            },
            email: {
                type: 'string',
                format: 'email',
                description: 'Email address of the user',
            },
            password: {
                type: 'string',
                description: 'Password for the user',
            },
        },
    },
    // response: {
    //     200: {
    //         description: 'User updated successfully',
    //         type: 'object',
    //         properties: {
    //             id: { type: 'integer', description: 'User ID' },
    //             userName: { type: 'string', description: 'Username of the user' },
    //             email: { type: 'string', format: 'email', description: 'Email address of the user' },
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

export { userSchemaPost, userSchemaUpdate, userQuerySchema, userIdParamSchema, userUserNameParamSchema, userSchemaPut };
