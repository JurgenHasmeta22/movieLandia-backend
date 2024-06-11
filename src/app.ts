import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { options } from './utils/swagger';
import movieRoutes from './routes/movie.routes';
import episodeRoutes from './routes/episode.routes';
import genreRoutes from './routes/genre.routes';
import serieRoutes from './routes/serie.routes';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';
import 'dotenv/config';
import movieService from './services/movie.service';
import serieService from './services/serie.service';
import genreService from './services/genre.service';
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

app.use(expressLayouts);
app.set('layout', 'layouts/mainLayout.ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(authRoutes);
app.use(movieRoutes);
app.use(serieRoutes);
app.use(genreRoutes);
app.use(episodeRoutes);
app.use(userRoutes);

// #region "EJS endpoints templates"
app.get('/', async (req, res) => {
    const { sortBy, ascOrDesc, page, pageSize, name, filterValue, filterName, filterOperator, title } = req.query;

    const moviesData = await movieService.getMovies({
        sortBy: sortBy as string,
        ascOrDesc: ascOrDesc as 'asc' | 'desc',
        perPage: pageSize ? Number(pageSize) : 10,
        page: Number(page),
        title: title as string,
        filterValue: filterValue ? Number(filterValue) : undefined,
        filterNameString: filterName as string,
        filterOperatorString: filterOperator as '>' | '=' | '<',
    });

    const seriesData = await serieService.getSeries({
        sortBy: sortBy as string,
        ascOrDesc: ascOrDesc as 'asc' | 'desc',
        perPage: pageSize ? Number(pageSize) : 10,
        page: Number(page),
        title: title as string,
        filterValue: filterValue ? Number(filterValue) : undefined,
        filterNameString: filterName as string,
        filterOperatorString: filterOperator as '>' | '=' | '<',
    });

    const genresData = await genreService.getGenres({
        sortBy: sortBy! as string,
        ascOrDesc: ascOrDesc! as 'asc' | 'desc',
        perPage: pageSize ? Number(pageSize) : 20,
        page: Number(page!),
        name: name! as string,
        filterValue: filterValue ? Number(filterValue) : undefined,
        filterNameString: filterName! as string,
        filterOperatorString: filterOperator! as '>' | '=' | '<',
    });

    if (moviesData && seriesData && genresData) {
        res.render('pages/home', {
            data: { genres: genresData.rows, movies: moviesData.movies, series: seriesData.rows },
            title: 'Home',
            canonical: ``,
            description: 'Home Page',
        });
    } else {
        res.status(404).send({ error: 'Home not found' });
    }
});

app.get('/login', async (req, res) => {
    res.render('pages/login', { title: 'Login', description: 'Login Page', canonical: 'login' });
});

app.get('/register', async (req, res) => {
    res.render('pages/register', { title: 'Register', description: 'Register Page', canonical: 'register' });
});

app.get('/search', async (req, res) => {
    const { pageMovies, pageSeries, ascOrDesc, sortBy, title } = req.query;

    const queryParams: any = {
        page: Number(pageMovies ? pageMovies : pageSeries ? pageSeries : 1),
    };

    if (ascOrDesc !== undefined) {
        queryParams.ascOrDesc = String(ascOrDesc);
    }

    if (sortBy !== undefined) {
        queryParams.sortBy = String(sortBy);
    }

    try {
        let moviesData;
        let seriesData;

        if (title) {
            moviesData = await movieService.searchMoviesByTitle(String(title), queryParams);
            seriesData = await serieService.searchSeriesByTitle(String(title), queryParams);
        } else {
            moviesData = await movieService.getMovies(queryParams);
            seriesData = await serieService.getSeries(queryParams);
        }

        const pageCountMovies = Math.ceil(moviesData.count / 10);
        const pageCountSeries = Math.ceil(seriesData.count / 10);
        const currentPageMovies = pageMovies ? pageMovies : 1;
        const currentPageSeries = pageSeries ? pageSeries : 1;

        res.render('pages/search', {
            movies: moviesData.movies,
            series: seriesData.rows,
            pageCountMovies,
            pageCountSeries,
            currentPageMovies,
            currentPageSeries,
            title: 'Search your favorite movies or series',
            canonical: `search`,
            description: 'Search and find your favorite movie or serie based on many different genres',
        });
    } catch (err) {
        res.status(400).send({ error: (err as Error).message });
    }
});

app.get('/genres', async (req, res) => {
    const { sortBy, ascOrDesc, page, pageSize, name, filterValue, filterName, filterOperator } = req.query;

    try {
        const genresData = await genreService.getGenres({
            sortBy: sortBy! as string,
            ascOrDesc: ascOrDesc! as 'asc' | 'desc',
            perPage: pageSize ? Number(pageSize) : 20,
            page: Number(page!),
            name: name! as string,
            filterValue: filterValue ? Number(filterValue) : undefined,
            filterNameString: filterName! as string,
            filterOperatorString: filterOperator! as '>' | '=' | '<',
        });

        if (genresData) {
            res.render('pages/genres', {
                genres: genresData.rows,
                title: 'Choose your favorite Genre among many to choose',
                canonical: `genres`,
                description:
                    'Discover and watch the latest and most amazing movies and series of many different genres.',
            });
        } else {
            res.status(404).send({ error: 'Genres not found' });
        }
    } catch (err) {
        res.status(400).send({ error: (err as Error).message });
    }
});

app.get('/genres/:name', async (req, res) => {
    const nameGenre = req.params.name
        .split('')
        .map((char) => (char === '-' ? ' ' : char))
        .join('');

    const { sortBy, ascOrDesc, pageMovies, pageSeries, pageSize, name, filterValue, filterName, filterOperator } =
        req.query;

    try {
        const genreDataMovies = await genreService.getGenreByName(nameGenre, {
            sortBy: sortBy! as string,
            ascOrDesc: ascOrDesc! as 'asc' | 'desc',
            perPage: pageSize ? Number(pageSize) : 20,
            page: Number(pageMovies ? pageMovies : 1),
            name: name! as string,
            type: 'movie' as string,
            filterValue: filterValue ? Number(filterValue) : undefined,
            filterNameString: filterName! as string,
            filterOperatorString: filterOperator! as '>' | '=' | '<',
        });

        const genreDataSeries = await genreService.getGenreByName(nameGenre, {
            sortBy: sortBy! as string,
            ascOrDesc: ascOrDesc! as 'asc' | 'desc',
            perPage: pageSize ? Number(pageSize) : 20,
            page: Number(pageSeries ? pageSeries : 1),
            name: name! as string,
            type: 'serie' as string,
            filterValue: filterValue ? Number(filterValue) : undefined,
            filterNameString: filterName! as string,
            filterOperatorString: filterOperator! as '>' | '=' | '<',
        });

        const pageCountMovies = Math.ceil(genreDataMovies.count / 10);
        const pageCountSeries = Math.ceil(genreDataSeries.count / 10);
        const currentPageMovies = pageMovies ? pageMovies : 1;
        const currentPageSeries = pageSeries ? pageSeries : 1;

        res.render('pages/genre', {
            moviesByGenre: genreDataMovies.movies,
            seriesByGenre: genreDataSeries.series,
            currentPageMovies,
            currentPageSeries,
            pageCountMovies,
            pageCountSeries,
            nameGenre,
            title: `Movie and Series of Genre ${nameGenre}`,
            canonical: `/genre/${nameGenre}`,
            description: `Discover and watch the latest and most amazing movies and series of ${nameGenre} Genre`,
        });
    } catch (err) {
        res.status(400).send({ error: (err as Error).message });
    }
});

app.get('/movies', async (req, res) => {
    try {
        const { sortBy, ascOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } = req.query;

        const moviesData = await movieService.getMovies({
            sortBy: sortBy as string,
            ascOrDesc: ascOrDesc as 'asc' | 'desc',
            perPage: pageSize ? Number(pageSize) : 10,
            page: Number(page),
            title: title as string,
            filterValue: filterValue ? Number(filterValue) : undefined,
            filterNameString: filterName as string,
            filterOperatorString: filterOperator as '>' | '=' | '<',
        });

        const latestMovies = await movieService.getLatestMovies();
        const pageCountMovies = Math.ceil(moviesData.count / 10);
        const currentPageMovies = page ? page : 1;

        if (moviesData && latestMovies) {
            res.render('pages/movies', {
                movies: moviesData.movies,
                pageCountMovies,
                currentPageMovies,
                latestMovies,
                title: 'Watch the Latest Movies | High-Quality and Always Updated',
                canonical: `movies`,
                description:
                    'Discover and watch the latest and most amazing movies in high quality. Our collection is always updated with the newest episodes and releases.',
            });
        } else {
            res.status(404).send({ error: 'Movies not found' });
        }
    } catch (err) {
        res.status(400).send({ error: (err as Error).message });
    }
});

app.get('/series', async (req, res) => {
    try {
        const { sortBy, ascOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } = req.query;

        const seriesData = await serieService.getSeries({
            sortBy: sortBy as string,
            ascOrDesc: ascOrDesc as 'asc' | 'desc',
            perPage: pageSize ? Number(pageSize) : 10,
            page: Number(page),
            title: title as string,
            filterValue: filterValue ? Number(filterValue) : undefined,
            filterNameString: filterName as string,
            filterOperatorString: filterOperator as '>' | '=' | '<',
        });

        const latestSeries = await serieService.getLatestSeries();
        const pageCountSeries = Math.ceil(seriesData.count / 10);
        const currentPageSeries = page ? page : 1;

        if (seriesData && latestSeries) {
            res.render('pages/series', {
                series: seriesData.rows,
                pageCountSeries,
                currentPageSeries,
                latestSeries,
                title: 'Watch the Latest Series | High-Quality and Always Updated',
                canonical: 'series',
                description:
                    'Discover and watch the latest and most amazing movies in high quality. Our collection is always updated with the newest episodes and releases.',
            });
        } else {
            res.status(404).send({ error: 'Series not found' });
        }
    } catch (err) {
        res.status(400).send({ error: (err as Error).message });
    }
});

app.get('/movies/:title', async (req, res) => {
    const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage, userId } = req.query;
    const title = req.params.title
        .split('')
        .map((char: string) => (char === '-' ? ' ' : char))
        .join('');

    const queryParams: any = {
        page: Number(page),
    };

    if (userId !== undefined) {
        queryParams.userId = Number(userId);
    }

    if (ascOrDesc !== undefined) {
        queryParams.ascOrDesc = String(ascOrDesc);
    }

    if (sortBy !== undefined) {
        queryParams.sortBy = String(sortBy);
    }

    if (upvotesPage !== undefined) {
        queryParams.upvotesPage = Number(upvotesPage);
    }

    if (downvotesPage !== undefined) {
        queryParams.downvotesPage = Number(downvotesPage);
    }

    try {
        const movie = await movieService.getMovieByTitle(title, queryParams);
        const latestMovies = await movieService.getLatestMovies();
        const relatedMovies = await movieService.getRelatedMovies(title);

        if (movie) {
            res.render('pages/movie', {
                movie,
                latestMovies,
                relatedMovies,
                title: `Watch ${movie.title} in HD`,
                canonical: `/movie/${movie.title}`,
                description: `${movie.description}`,
            });
        } else {
            res.status(404).send({ error: 'Movie not found' });
        }
    } catch (err) {
        res.status(400).send({ error: (err as Error).message });
    }
});

app.get('/series/:title', async (req, res) => {
    const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage, userId } = req.query;
    const title = req.params.title
        .split('')
        .map((char: string) => (char === '-' ? ' ' : char))
        .join('');

    const queryParams: any = {
        page: Number(page),
    };

    if (userId !== undefined) {
        queryParams.userId = Number(userId);
    }

    if (ascOrDesc !== undefined) {
        queryParams.ascOrDesc = String(ascOrDesc);
    }

    if (sortBy !== undefined) {
        queryParams.sortBy = String(sortBy);
    }

    if (upvotesPage !== undefined) {
        queryParams.upvotesPage = Number(upvotesPage);
    }

    if (downvotesPage !== undefined) {
        queryParams.downvotesPage = Number(downvotesPage);
    }

    try {
        const serie = await serieService.getSerieByTitle(title, queryParams);
        const latestSeries = await serieService.getLatestSeries();
        const relatedSeries = await serieService.getRelatedSeries(title);

        if (serie) {
            res.render('pages/serie', {
                serie,
                latestSeries,
                relatedSeries,
                canonical: `/serie/${serie.title}`,
                title: `Watch ${serie.title} in HD`,
                description: `${serie.description}`,
            });
        } else {
            res.status(404).send({ error: 'Serie not found' });
        }
    } catch (err) {
        res.status(400).send({ error: (err as Error).message });
    }
});
// #endregion

app.listen(4000, () => {
    console.log(`Server up: http://localhost:4000`);
});
