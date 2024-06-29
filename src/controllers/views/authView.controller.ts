import authModel from '../../models/auth.model';
import { createToken } from '../../utils/authUtils';

const authViewController = {
    async loginView(req: any, res: any) {
        const error = req.flash('error');

        return res.view('pages/Login', {
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
                return res.redirect(redirectTo);
            } else {
                req.flash('error', 'Credentials are wrong');
                return res.redirect('/login');
            }
        } catch (err: any) {
            req.flash('error', err.message);
            return res.redirect('/login');
        }
    },

    async registerView(req: any, res: any) {
        const error = req.flash('error');
        res.render('pages/Register', {
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
                return res.redirect(redirectTo);
            } else {
                req.flash('error', 'User with that Username or Email already exists');
                return res.redirect('/register');
            }
        } catch (err: any) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
    },

    async logout(req: any, res: any) {
        delete req.session.user;
        delete req.session.token;
        return res.redirect('/login');
    },
};

export default authViewController;
