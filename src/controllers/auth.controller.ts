import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { createToken } from '../utils/authUtils';
import { User } from '@prisma/client';
import HttpStatusCode from '../utils/httpStatusCodes';

interface CustomRequest extends Request {
    user?: User;
}

class AuthController {
    private authService: typeof AuthService;

    constructor(authService: typeof AuthService) {
        this.authService = authService;
    }

    public async signUp(req: Request, res: Response) {
        const { email, password, userName } = req.body;

        try {
            const user: User | null = await this.authService.signUp({ email, password, userName });

            if (user) {
                res.status(HttpStatusCode.OK).send({ user, token: createToken(user.id) });
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'User already exists' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user: User | null = await this.authService.login(email, password);

            if (user) {
                res.status(HttpStatusCode.OK).send({ user, token: createToken(user.id) });
            } else {
                res.status(HttpStatusCode.BadRequest).send({ error: 'Credentials are wrong' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async validate(req: CustomRequest, res: Response) {
        try {
            if (req.user) {
                res.status(HttpStatusCode.OK).send(req.user);
            } else {
                res.status(HttpStatusCode.BadRequest).send({ error: 'User not validated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }
}

export default new AuthController(AuthService);
