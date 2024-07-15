import genreModel from '../models/genre.model';
import serieModel from '../models/serie.model';
import HttpStatusCode from '../utils/httpStatusCodes';

const serieController = {
    async seriesView(req: any, res: any) {
        try {
            const { seriesSortBy, seriesAscOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } =
                req.query;

            const seriesData = await serieModel.getSeries({
                sortBy: seriesSortBy as string,
                ascOrDesc: seriesAscOrDesc as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 10,
                page: Number(page),
                title: title as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName as string,
                filterOperatorString: filterOperator as '>' | '=' | '<',
            });

            const latestSeries = await serieModel.getLatestSeries();
            const pageCountSeries = Math.ceil(seriesData.count / 10);
            const currentPageSeries = page ? page : 1;

            if (seriesData && latestSeries) {
                res.render('pages/client/Series', {
                    series: seriesData.rows,
                    pageCountSeries,
                    currentPageSeries,
                    latestSeries,
                    title: 'Watch the Latest Series | High-Quality and Always Updated',
                    canonical: 'series',
                    user: req.session.user,
                    titleTerm: '',
                    seriesSortBy,
                    seriesAscOrDesc,
                    description:
                        'Discover and watch the latest and most amazing movies in high quality. Our collection is always updated with the newest episodes and releases.',
                });
            } else {
                res.status(HttpStatusCode.BadRequest).send({ error: 'Series not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async serieView(req: any, res: any) {
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
            const serie = await serieModel.getSerieByTitle(title, queryParams);
            const latestSeries = await serieModel.getLatestSeries();
            const relatedSeries = await serieModel.getRelatedSeries(title);
            const reviews = serie?.reviews;

            if (serie) {
                res.render('pages/client/Serie', {
                    serie,
                    latestSeries: latestSeries?.slice(0, 5),
                    relatedSeries,
                    canonical: `/serie/${serie.title}`,
                    title: `Watch ${serie.title} in HD`,
                    description: `${serie.description}`,
                    user: req.session.user,
                    titleTerm: '',
                    reviews,
                });
            } else {
                res.status(HttpStatusCode.BadRequest).send({ error: 'Serie not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default serieController;
