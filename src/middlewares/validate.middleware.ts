import { FastifyInstance, FastifyRequest, FastifyReply, RouteOptions } from 'fastify';

async function validateMiddleware(request: any, reply: FastifyReply) {
    if (!request.body || !request.body.userName || !request.body.email || !request.body.password) {
        reply.status(400).send({ error: 'Validation failed', message: 'Missing required fields' });
        return;
    }
}

export default validateMiddleware;
