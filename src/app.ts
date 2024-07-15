import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import viewsRoutes from './routes/views.routes';
import path from 'path';
import 'dotenv/config';
import session from 'express-session';
import flash from 'connect-flash';
import { Edge } from 'edge.js';

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

export const app = express();

const edge = new Edge({ cache: false });
edge.mount(path.join(__dirname, 'views'));

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
app.set('views', path.join(__dirname, 'views'));

// Middleware to make Edge globals available in all views
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
