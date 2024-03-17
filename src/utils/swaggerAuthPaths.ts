export const authPaths = {
    '/register': {
        post: {
            summary: 'Register a new user',
            tags: ['Authentication'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    description: 'Email address of the user',
                                },
                                password: {
                                    type: 'string',
                                    minLength: 6,
                                    pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{6,}$',
                                    description: 'Password of the user',
                                },
                                userName: {
                                    type: 'string',
                                    minLength: 3,
                                    pattern: '^[a-zA-Z0-9]*$',
                                    description: 'Username of the user',
                                },
                            },
                            required: ['email', 'password', 'userName'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'User registered successfully',
                },
                400: {
                    description: 'Invalid request data',
                },
            },
        },
    },
    '/login': {
        post: {
            summary: 'Login to the application',
            tags: ['Authentication'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                email: {
                                    type: 'string',
                                    format: 'email',
                                    description: 'Email address of the user',
                                },
                                password: {
                                    type: 'string',
                                    minLength: 6,
                                    pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W_]).{6,}$',
                                    description: 'Password of the user',
                                },
                            },
                            required: ['email', 'password'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'User logged in successfully',
                },
                400: {
                    description: 'Invalid request data',
                },
            },
        },
    },
    '/validateUser': {
        get: {
            summary: 'Validate User',
            tags: ['Authentication'],
            security: [
                {
                    bearerAuth: [],
                },
            ],
            responses: {
                200: {
                    description: 'User is authenticated',
                },
                401: {
                    description: 'Unauthorized - Token is missing or invalid',
                },
            },
        },
    },
};
