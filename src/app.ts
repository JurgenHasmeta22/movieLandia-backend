import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { options } from './utils/swagger';
import viewsRoutes from './routes/views.routes';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import 'dotenv/config';
import session from 'express-session';
import flash from 'connect-flash';
const expressLayouts = require('express-ejs-layouts');

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const specs = swaggerJsDoc(options);

export const app = express();

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.static('public'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use(
    session({
        secret: process.env.MY_SECRET || 'defaultSecret',
        resave: false,
        saveUninitialized: true,
    }),
);
app.use(flash());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layouts/MainLayout.ejs');

app.use(viewsRoutes);

app.listen(4000, () => {
    console.log(`Server up: http://localhost:4000`);
});
