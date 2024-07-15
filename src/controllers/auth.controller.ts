import authModel from '../models/auth.model';
import { createToken } from '../utils/authUtils';

const authController = {
    async loginView(req: any, res: any) {
        const error = req.flash('error');
        res.render('pages/auth/Login', {
            title: 'Login',
            description: 'Login Page',
            canonical: 'login',
            error,
            user: req.session.user,
            titleTerm: '',
        });
    },

    async loginPost(req: any, res: any) {
        const { email, password } = req.body;

        try {
            const user = await authModel.login(email, password);

            if (user) {
                req.session.user = user;
                req.session.token = createToken(user.id);
                const redirectTo = req.session.lastPage === '/login' ? '/' : req.session.lastPage || '/';
                res.redirect(redirectTo);
            } else {
                req.flash('error', 'Credentials are wrong');
                res.redirect('/login');
            }
        } catch (err: any) {
            req.flash('error', err.message);
            res.redirect('/login');
        }
    },

    async registerView(req: any, res: any) {
        const error = req.flash('error');
        res.render('pages/auth/Register', {
            title: 'Register',
            description: 'Register Page',
            canonical: 'register',
            error,
            user: req.session.user,
            titleTerm: '',
        });
    },

    async registerPost(req: any, res: any) {
        const { email, password, userName } = req.body;

        try {
            const user = await authModel.signUp({ email, password, userName });

            if (user) {
                req.session.user = user;
                req.session.token = createToken(user.id);
                const redirectTo = req.session.lastPage === '/register' ? '/' : req.session.lastPage || '/';
                res.redirect(redirectTo);
            } else {
                req.flash('error', 'User with that Username or Email already exists');
                res.redirect('/register');
            }
        } catch (err: any) {
            req.flash('error', err.message);
            res.redirect('/register');
        }
    },

    async logout(req: any, res: any) {
        delete req.session.user;
        delete req.session.token;
        res.redirect('/login');
    },
};

export default authController;
