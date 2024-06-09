import express from 'express';
import cors from 'cors';
import { options } from './utils/swagger';
import MovieRoutes from './routes/movie.routes';
import EpisodeRoutes from './routes/episode.routes';
import GenreRoutes from './routes/genre.routes';
import SerieRoutes from './routes/serie.routes';
import UserRoutes from './routes/user.routes';
import AuthRoutes from './routes/auth.routes';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import 'dotenv/config';

class App {
    private app: express.Application;

    private movieRouter: typeof MovieRoutes;
    private authRouter: typeof AuthRoutes;
    private userRouter: typeof UserRoutes;
    private serieRouter: typeof SerieRoutes;
    private genreRouter: typeof GenreRoutes;
    private episodeRouter: typeof EpisodeRoutes;

    constructor(
        movieRouter: typeof MovieRoutes,
        authRouter: typeof AuthRoutes,
        userRouter: typeof UserRoutes,
        serieRouter: typeof SerieRoutes,
        genreRouter: typeof GenreRoutes,
        episodeRouter: typeof EpisodeRoutes,
        port: number,
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
        this.start(port);
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

const app = new App(MovieRoutes, AuthRoutes, UserRoutes, SerieRoutes, GenreRoutes, EpisodeRoutes, 4000);
