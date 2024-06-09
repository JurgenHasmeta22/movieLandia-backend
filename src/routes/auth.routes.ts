import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import ValidateMiddleware from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';
import { authMiddleware } from '../middlewares/auth.middleware';

class AuthRouter {
    private router: express.Router;
    private authController: typeof AuthController;
    private validateMiddleware: typeof ValidateMiddleware;

    constructor(authController: typeof AuthController, validateMiddleware: typeof ValidateMiddleware) {
        this.router = express.Router();
        this.authController = authController;
        this.validateMiddleware = validateMiddleware;
        this.setupRoutes = this.setupRoutes.bind(this);
        this.setupRoutes();
    }

    private setupRoutes(): any {
        this.router.post('/register', registerSchema, this.validateMiddleware.validate, this.authController.signUp);
        this.router.post('/login', loginSchema, this.validateMiddleware.validate, this.authController.login);
        this.router.get('/validateUser', authMiddleware, this.authController.validate);
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default new AuthRouter(AuthController, ValidateMiddleware);
