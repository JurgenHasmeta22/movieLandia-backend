import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import viewsRoutes from './routes/views.routes';
import session from 'express-session';
import flash from 'connect-flash';
import { Edge } from 'edge.js';
import 'dotenv/config';

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export const app = express();

const edge = new Edge({ cache: false });
edge.mount(new URL('./views', import.meta.url));

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.static('public'));

app.use(
    session({
        secret: process.env.MY_SECRET || 'defaultSecret',
        resave: false,
        saveUninitialized: true,
    }),
);
app.use(flash());

app.engine('edge', (filePath, options, callback) => {
    edge.render(filePath, options)
        .then((rendered) => callback(null, rendered))
        .catch((err) => callback(err));
});
app.set('view engine', 'edge');

app.use((req, res, next) => {
    res.locals = {
        ...res.locals,
        request: req,
    };

    next();
});

app.use(viewsRoutes);

app.listen(4000, () => {
    console.log(`Server up: http://localhost:4000`);
});
