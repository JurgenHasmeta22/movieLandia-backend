import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import HttpStatusCode from '../utils/httpStatusCodes';
import fastify from 'fastify';

async function authMiddleware(request: any, reply: any) {
    const bearerHeader = request.headers['authorization'];

    if (!bearerHeader || typeof bearerHeader !== 'string') {
        return reply.status(HttpStatusCode.Unauthorized).send({ message: 'Unauthorized' });
    }

    const token = bearerHeader.split(' ')[1];

    if (!token) {
        return reply.status(HttpStatusCode.Unauthorized).send({ message: 'Unauthorized' });
    }

    try {
        // @ts-ignore
        const user = await fastify.getUserFromToken(token);

        if (user) {
            request.user = user;
        } else {
            return reply.status(HttpStatusCode.Unauthorized).send({ message: 'Unauthorized' });
        }
    } catch (error) {
        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
            return reply.status(HttpStatusCode.Unauthorized).send({ message: 'Unauthorized' });
        } else {
            return reply.status(HttpStatusCode.InternalServerError).send({ message: 'Internal Server Error' });
        }
    }
}

export default authMiddleware;
