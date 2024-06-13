import movieModel from '../../models/movie.model';
import HttpStatusCode from '../../utils/httpStatusCodes';

const movieViewController = {
    async moviesView(req: any, res: any) {
        try {
            const { moviesAscOrDesc, moviesSortBy, page, pageSize, title, filterValue, filterName, filterOperator } =
                req.query;

            const moviesData = await movieModel.getMovies({
                sortBy: moviesSortBy as string,
                ascOrDesc: moviesAscOrDesc as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 10,
                page: Number(page),
                title: title as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName as string,
                filterOperatorString: filterOperator as '>' | '=' | '<',
            });

            const latestMovies = await movieModel.getLatestMovies();
            const pageCountMovies = Math.ceil(moviesData.count / 10);
            const currentPageMovies = page ? page : 1;

            if (moviesData && latestMovies) {
                res.render('pages/Movies', {
                    movies: moviesData.movies,
                    pageCountMovies,
                    currentPageMovies,
                    latestMovies,
                    title: 'Watch the Latest Movies | High-Quality and Always Updated',
                    canonical: `movies`,
                    user: req.session.user,
                    titleTerm: '',
                    moviesSortBy,
                    moviesAscOrDesc,
                    description:
                        'Discover and watch the latest and most amazing movies in high quality. Our collection is always updated with the newest episodes and releases.',
                });
            } else {
                res.status(HttpStatusCode.BadRequest).send({ error: 'Movies not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async movieView(req: any, res: any) {
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
            const movie = await movieModel.getMovieByTitle(title, queryParams);
            const latestMovies = await movieModel.getLatestMovies();
            const relatedMovies = await movieModel.getRelatedMovies(title);

            if (movie) {
                res.render('pages/Movie', {
                    movie,
                    latestMovies: latestMovies?.slice(0, 5),
                    relatedMovies,
                    title: `Watch ${movie.title} in HD`,
                    canonical: `/movie/${movie.title}`,
                    description: `${movie.description}`,
                    user: req.session.user,
                    titleTerm: '',
                });
            } else {
                res.status(HttpStatusCode.BadRequest).send({ error: 'Movie not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default movieViewController;
