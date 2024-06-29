const registerSchema = {
    // description: 'Register a new user',
    // tags: ['auth', 'user'],
    // summary: 'User registration',
    body: {
        type: 'object',
        required: ['email', 'password', 'userName'],
        properties: {
            email: { type: 'string', format: 'email', minLength: 1, description: 'User email address' },
            password: {
                type: 'string',
                minLength: 6,
                pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{6,}$',
                description:
                    'User password (must include at least one number, one lowercase letter, one uppercase letter, and one special character)',
            },
            userName: {
                type: 'string',
                minLength: 3,
                pattern: '^[a-zA-Z0-9]*$',
                description: 'Username (alphanumeric only)',
            },
        },
    },
    response: {
        201: {
            description: 'User registered successfully',
            type: 'object',
            properties: {
                id: { type: 'string', description: 'User ID' },
                email: { type: 'string', description: 'User email address' },
                userName: { type: 'string', description: 'Username' },
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

const loginSchema = {
    // description: 'Login a user',
    // tags: ['auth', 'user'],
    // summary: 'User login',
    body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email', minLength: 1, description: 'User email address' },
            password: {
                type: 'string',
                minLength: 6,
                pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{6,}$',
                description:
                    'User password (must include at least one number, one lowercase letter, one uppercase letter, and one special character)',
            },
        },
    },
    response: {
        200: {
            description: 'User logged in successfully',
            type: 'object',
            properties: {
                token: { type: 'string', description: 'JWT token' },
            },
        },
        400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
                error: { type: 'string', description: 'Error message' },
            },
        },
        401: {
            description: 'Unauthorized',
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

export { registerSchema, loginSchema };
