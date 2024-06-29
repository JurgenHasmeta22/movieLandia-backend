import { FastifySchema } from 'fastify';

const allowedSortByProperties = ['userName', 'email'];

const userIdParamSchema = {
    type: 'object',
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        },
    },
    required: ['id'],
};

const userUserNameParamSchema: FastifySchema = {
    params: {
        type: 'object',
        properties: {
            userName: {
                type: 'string',
                pattern: '^[a-zA-Z\\s]+$',
            },
        },
        required: ['userName'],
    },
};

const userQuerySchema = {
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
            enum: ['name', 'id'],
        },
        filterOperator: {
            type: 'string',
            enum: ['equals', 'contains', 'startsWith', 'endsWith'],
        },
    },
};

const userSchemaUpdate = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
        },
    },
    required: [],
};

const userSchemaPost = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
        },
    },
    required: ['userName', 'email', 'password'],
};

export { userSchemaPost, userSchemaUpdate, userQuerySchema, userIdParamSchema, userUserNameParamSchema };
