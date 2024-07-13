import { Request, Response, NextFunction } from 'express';

export function trackLastPageMiddleware(req: any, res: Response, next: NextFunction) {
    if (req.session) {
        req.session.lastPage = req.originalUrl;
    }

    next();
}
