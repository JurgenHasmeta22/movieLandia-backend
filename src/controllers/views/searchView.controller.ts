import genreModel from '../../models/genre.model';
import movieModel from '../../models/movie.model';
import serieModel from '../../models/serie.model';
import HttpStatusCode from '../../utils/httpStatusCodes';

const searchViewController = {
    async searchView(req: any, res: any) {
        const { pageMovies, pageSeries, moviesSortBy, moviesAscOrDesc, seriesSortBy, seriesAscOrDesc, title } =
            req.query;

        const queryParamsMovies = {
            page: Number(pageMovies || 1),
            sortBy: moviesSortBy,
            ascOrDesc: moviesAscOrDesc,
            perPage: 10,
        };

        const queryParamsSeries = {
            page: Number(pageSeries || 1),
            sortBy: seriesSortBy,
            ascOrDesc: seriesAscOrDesc,
            perPage: 10,
        };

        try {
            let moviesData;
            let seriesData;

            if (title) {
                moviesData = await movieModel.searchMoviesByTitle(String(title), queryParamsMovies);
                seriesData = await serieModel.searchSeriesByTitle(String(title), queryParamsSeries);
            } else {
                moviesData = await movieModel.getMovies(queryParamsMovies);
                seriesData = await serieModel.getSeries(queryParamsSeries);
            }

            const pageCountMovies = Math.ceil(moviesData.count / 10);
            const pageCountSeries = Math.ceil(seriesData.count / 10);
            const currentPageMovies = pageMovies ? Number(pageMovies) : 1;
            const currentPageSeries = pageSeries ? Number(pageSeries) : 1;

            res.render('pages/Search', {
                movies: moviesData.movies,
                series: seriesData.rows,
                pageCountMovies,
                pageCountSeries,
                currentPageMovies,
                currentPageSeries,
                moviesSortBy,
                moviesAscOrDesc,
                seriesSortBy,
                seriesAscOrDesc,
                title: 'Search your favorite movies or series',
                canonical: `search`,
                description: 'Search and find your favorite movie or serie based on many different genres',
                user: req.session.user,
                titleTerm: title,
            });
        } catch (err: any) {
            res.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },
};

export default searchViewController;
