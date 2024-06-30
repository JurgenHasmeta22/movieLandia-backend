import fastify from 'fastify';
import authModel from '../../models/auth.model';

const authViewController = {
    async loginView(request: any, reply: any) {
        const error = request.flash('error', 'Error in requesting the login page');

        return reply.render('pages/Login', {
            title: 'Login',
            description: 'Login Page',
            canonical: 'login',
            error,
            user: request.session.user,
            titleTerm: '',
        });
    },

    async loginPost(request: any, reply: any) {
        const { email, password } = request.body;

        try {
            const user = await authModel.login(email, password);

            if (user) {
                request.session.user = user;
                // @ts-ignore
                request.session.token = fastify.createToken(user.id);
                const redirectTo = request.session.lastPage === '/login' ? '/' : request.session.lastPage || '/';
                return reply.redirect(redirectTo);
            } else {
                request.flash('error', 'Credentials are wrong');
                return reply.redirect('/login');
            }
        } catch (err: any) {
            request.flash('error', err.message);
            return reply.redirect('/login');
        }
    },

    async registerView(request: any, reply: any) {
        const error = request.flash('error', 'Error in requesting the register page');

        return reply.render('pages/Register', {
            title: 'Register',
            description: 'Register Page',
            canonical: 'register',
            error,
            user: request.session.user,
            titleTerm: '',
        });
    },

    async registerPost(request: any, reply: any) {
        const { email, password, userName } = request.body;

        try {
            const user = await authModel.signUp({ email, password, userName });

            if (user) {
                request.session.user = user;
                //@ts-ignore
                request.session.token = fastify.createToken(user.id);
                const redirectTo = request.session.lastPage === '/register' ? '/' : request.session.lastPage || '/';
                return reply.redirect(redirectTo);
            } else {
                request.flash('error', 'User with that Username or Email already exists');
                return reply.redirect('/register');
            }
        } catch (err: any) {
            request.flash('error', err.message);
            return reply.redirect('/register');
        }
    },

    async logout(request: any, reply: any) {
        delete request.session.user;
        delete request.session.token;

        return reply.redirect('/login');
    },
};

export default authViewController;
