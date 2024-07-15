import genreModel from '../models/genre.model';
import HttpStatusCode from '../utils/httpStatusCodes';

const genreController = {
    async genresView(req: any, res: any) {
        const { sortBy, ascOrDesc, page, pageSize, name, filterValue, filterName, filterOperator } = req.query;

        try {
            const genresData = await genreModel.getGenres({
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
                res.render('pages/Genres', {
                    genres: genresData.rows,
                    title: 'Choose your favorite Genre among many to choose',
                    canonical: `genres`,
                    description:
                        'Discover and watch the latest and most amazing movies and series of many different genres.',
                    user: req.session.user,
                    titleTerm: '',
                });
            } else {
                res.status(HttpStatusCode.BadRequest).send({ error: 'Genres not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async genreView(req: any, res: any) {
        const nameGenre = req.params.name
            .split('')
            .map((char: string) => (char === '-' ? ' ' : char))
            .join('');

        const {
            moviesSortBy,
            moviesAscOrDesc,
            seriesSortBy,
            seriesAscOrDesc,
            pageMovies,
            pageSeries,
            pageSize,
            name,
            filterValue,
            filterName,
            filterOperator,
        } = req.query;

        try {
            const genreDataMovies = await genreModel.getGenreByName(nameGenre, {
                sortBy: moviesSortBy! as string,
                ascOrDesc: moviesAscOrDesc! as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 20,
                page: Number(pageMovies ? pageMovies : 1),
                name: name! as string,
                type: 'movie' as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName! as string,
                filterOperatorString: filterOperator! as '>' | '=' | '<',
            });

            const genreDataSeries = await genreModel.getGenreByName(nameGenre, {
                sortBy: seriesSortBy! as string,
                ascOrDesc: seriesAscOrDesc! as 'asc' | 'desc',
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

            res.render('pages/Genre', {
                moviesByGenre: genreDataMovies.movies,
                seriesByGenre: genreDataSeries.series,
                currentPageMovies,
                currentPageSeries,
                pageCountMovies,
                pageCountSeries,
                nameGenre,
                moviesSortBy,
                seriesSortBy,
                moviesAscOrDesc,
                seriesAscOrDesc,
                title: `Movie and Series of Genre ${nameGenre}`,
                canonical: `/genre/${nameGenre}`,
                description: `Discover and watch the latest and most amazing movies and series of ${nameGenre} Genre`,
                user: req.session.user,
                titleTerm: '',
            });
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default genreController;
