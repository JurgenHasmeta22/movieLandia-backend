import { FastifySchema } from 'fastify';

const registerSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['email', 'password', 'userName'],
        properties: {
            email: { type: 'string', format: 'email', minLength: 1 },
            password: {
                type: 'string',
                minLength: 6,
                pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{6,}$',
            },
            userName: { type: 'string', minLength: 3, pattern: '^[a-zA-Z0-9]*$' },
        },
    },
};

const loginSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email', minLength: 1 },
            password: {
                type: 'string',
                minLength: 6,
                pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{6,}$',
            },
        },
    },
};

export { registerSchema, loginSchema };
