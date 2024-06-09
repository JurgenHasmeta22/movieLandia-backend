import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { options } from './utils/swagger';
import MovieRouter from './routes/movie.routes';
import EpisodeRouter from './routes/episode.routes';
import GenreRouter from './routes/genre.routes';
import SerieRouter from './routes/serie.routes';
import UserRouter from './routes/user.routes';
import AuthRouter from './routes/auth.routes';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import 'dotenv/config';

export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

class App {
    private app: express.Application;

    private movieRouter: typeof MovieRouter;
    private authRouter: typeof AuthRouter;
    private userRouter: typeof UserRouter;
    private serieRouter: typeof SerieRouter;
    private genreRouter: typeof GenreRouter;
    private episodeRouter: typeof EpisodeRouter;

    constructor(
        movieRouter: typeof MovieRouter,
        authRouter: typeof AuthRouter,
        userRouter: typeof UserRouter,
        serieRouter: typeof SerieRouter,
        genreRouter: typeof GenreRouter,
        episodeRouter: typeof EpisodeRouter,
    ) {
        this.app = express();

        this.movieRouter = movieRouter;
        this.authRouter = authRouter;
        this.userRouter = userRouter;
        this.serieRouter = serieRouter;
        this.genreRouter = genreRouter;
        this.episodeRouter = episodeRouter;

        this.setup = this.setup.bind(this);
        this.start = this.start.bind(this);
        this.setup();
        this.start(4000);
    }

    private setup(): void {
        this.app.use(cors());
        this.app.use(express.json({ limit: '100mb' }));
        this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
        this.app.use(express.static('public'));

        const specs = swaggerJsDoc(options);
        this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

        this.app.use(this.authRouter.getRoutes());
        this.app.use(this.movieRouter.getRoutes());
        this.app.use(this.episodeRouter.getRoutes());
        this.app.use(this.genreRouter.getRoutes());
        this.app.use(this.serieRouter.getRoutes());
        this.app.use(this.userRouter.getRoutes());

        this.app.get('/', async (req, res) => {
            res.send('Server Up and Running');
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server up: http://localhost:${port}`);
        });
    }
}

export default App;
