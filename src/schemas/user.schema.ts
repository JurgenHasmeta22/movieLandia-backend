const allowedSortByProperties = ['userName', 'email'];

const userIdParamSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
            description: 'User ID',
        },
    },
    required: ['id'],
    description: 'Parameters for user ID',
    tags: ['Users'],
};

const userUserNameParamSchema = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            pattern: '^[a-zA-Z\\s]+$',
            description: 'Username of the user',
        },
    },
    required: ['userName'],
    description: 'Parameters for username',
    tags: ['Users'],
};

const userQuerySchema = {
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
        title: {
            type: 'string',
            description: 'Filter by user name',
        },
        filterValue: {
            type: 'string',
            description: 'Filter value for specified filter name',
        },
        filterName: {
            type: 'string',
            enum: ['name', 'id'],
            description: 'Filter name (either "name" or "id")',
        },
        filterOperator: {
            type: 'string',
            enum: ['equals', 'contains', 'startsWith', 'endsWith'],
            description: 'Filter operator',
        },
    },
    description: 'Query parameters for fetching users',
    tags: ['Users'],
};

const userSchemaUpdate = {
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
    required: [],
    description: 'Schema for updating user information',
    tags: ['Users'],
};

const userSchemaPost = {
    type: 'object',
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
    required: ['userName', 'email', 'password'],
    description: 'Schema for creating a new user',
    tags: ['Users'],
};

export { userSchemaPost, userSchemaUpdate, userQuerySchema, userIdParamSchema, userUserNameParamSchema };
