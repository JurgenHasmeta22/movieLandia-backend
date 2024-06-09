import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import HttpStatusCode from '../utils/httpStatusCodes';

class ValidateMiddleware {
    public validate(req: Request, res: Response, next: NextFunction): any {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(HttpStatusCode.BadRequest).json({ errors: errors.array() });
        }

        next();
    }
}

export default new ValidateMiddleware();
