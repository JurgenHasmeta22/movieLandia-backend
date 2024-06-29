import { validationResult } from 'express-validator';
import HttpStatusCode from '../utils/httpStatusCodes';

async function validateMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const errors = validationResult(request);
    
    if (!errors.isEmpty()) {
        return reply.status(HttpStatusCode.BadRequest).send({ errors: errors.array() });
    }
}

export default validateMiddleware;
