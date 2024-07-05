import { FastifyRequest, FastifyReply } from 'fastify';
import authModel from '../../models/auth.model';
import { User } from '@prisma/client';
import HttpStatusCode from '../../utils/httpStatusCodes';
import { createToken } from '../../utils/authUtils';

const authController = {
    async signUp(
        request: FastifyRequest<{ Body: { email: string; password: string; userName: string } }>,
        reply: FastifyReply,
    ) {
        const { email, password, userName } = request.body;

        try {
            const user: User | null = await authModel.signUp({ email, password, userName });

            if (user) {
                const token = createToken(user.id);
                reply.status(HttpStatusCode.OK).send({ user, token });
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'User already exists' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async login(request: FastifyRequest<{ Body: { email: string; password: string } }>, reply: FastifyReply) {
        const { email, password } = request.body;

        try {
            const user: User | null = await authModel.login(email, password);

            if (user) {
                const token = createToken(user.id);
                reply.status(HttpStatusCode.OK).send({ user, token });
            } else {
                reply.status(HttpStatusCode.BadRequest).send({ error: 'Credentials are wrong' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async validate(request: any, reply: FastifyReply) {
        try {
            if (request.user) {
                reply.status(HttpStatusCode.OK).send(request.user);
            } else {
                reply.status(HttpStatusCode.BadRequest).send({ error: 'User not validated' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },
};

export default authController;
