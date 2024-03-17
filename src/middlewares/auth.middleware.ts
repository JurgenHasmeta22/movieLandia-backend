import { NextFunction, Request, Response } from 'express';
import { getUserFromToken } from '../utils/authUtils';
import { User } from '@prisma/client';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import HttpStatusCode from '../utils/httpStatusCodes';

interface CustomRequest extends Request {
    user?: User;
}

export async function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader || typeof bearerHeader !== 'string') {
        return res.status(HttpStatusCode.Unauthorized).json({ message: 'Unauthorized' });
    }

    const token = bearerHeader.split(' ')[1];

    if (!token) {
        return res.status(HttpStatusCode.Unauthorized).json({ message: 'Unauthorized' });
    }

    try {
        const user = await getUserFromToken(token);

        if (user) {
            req.user = user;
            next();
        } else {
            return res.status(HttpStatusCode.Unauthorized).json({ message: 'Unauthorized' });
        }
    } catch (error: any) {
        if (error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
            return res.status(HttpStatusCode.Unauthorized).json({ message: 'Unauthorized' });
        } else {
            return res.status(HttpStatusCode.InternalServerError).json({ message: 'Internal Server Error' });
        }
    }
}
