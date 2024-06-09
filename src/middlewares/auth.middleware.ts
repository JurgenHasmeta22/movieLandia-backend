import { NextFunction, Request, Response } from 'express';
import { getUserFromToken } from '../utils/authUtils';
import { User } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import HttpStatusCode from '../utils/httpStatusCodes';

interface CustomRequest extends Request {
    user?: User;
}

class AuthMiddleware {
    public async authenticate(req: CustomRequest, res: Response, next: NextFunction) {
        const bearerHeader = req.headers['authorization'];

        if (!bearerHeader || typeof bearerHeader !== 'string') {
            return this.unauthorized(res);
        }

        const token = bearerHeader.split(' ')[1];

        if (!token) {
            return this.unauthorized(res);
        }

        try {
            const user = await getUserFromToken(token);

            if (user) {
                req.user = user;
                next();
            } else {
                return this.unauthorized(res);
            }
        } catch (error: any) {
            if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
                return this.unauthorized(res);
            } else {
                return this.internalServerError(res);
            }
        }
    }

    private unauthorized(res: Response) {
        return res.status(HttpStatusCode.Unauthorized).json({ message: 'Unauthorized' });
    }

    private internalServerError(res: Response) {
        return res.status(HttpStatusCode.InternalServerError).json({ message: 'Internal Server Error' });
    }
}

export default new AuthMiddleware();
