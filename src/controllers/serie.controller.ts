import { Request, Response } from 'express';
import serieService from '../services/serie.service';
import { Serie } from '@prisma/client';
import HttpStatusCode from '../utils/httpStatusCodes';

const serieController = {
    async getSeries(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } = req.query;

        try {
            const series = await serieService.getSeries({
                sortBy: sortBy as string,
                ascOrDesc: ascOrDesc as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 10,
                page: Number(page),
                title: title as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName as string,
                filterOperatorString: filterOperator as '>' | '=' | '<',
            });

            if (series) {
                res.status(HttpStatusCode.OK).send(series);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getSerieById(req: Request, res: Response) {
        const serieId = Number(req.params.id);

        try {
            const serie = await serieService.getSerieById(serieId);

            if (serie) {
                res.status(HttpStatusCode.OK).send(serie);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Serie not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getSerieByTitle(req: Request, res: Response) {
        const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage, userId } = req.query;
        const title = req.params.title
            .split('')
            .map((char) => (char === '-' ? ' ' : char))
            .join('');

        const queryParams: any = {
            page: Number(page),
        };

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

        if (userId !== undefined) {
            queryParams.userId = Number(userId);
        }

        try {
            const serie = await serieService.getSerieByTitle(title, queryParams);

            if (serie) {
                res.status(HttpStatusCode.OK).send(serie);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'serie not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getLatestSeries(req: Request, res: Response) {
        try {
            const latestSeries = await serieService.getLatestSeries();

            if (latestSeries) {
                res.status(HttpStatusCode.OK).send(latestSeries);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getRelatedSeries(req: Request, res: Response) {
        const { title } = req.query;
        const titleFormatted =
            title &&
            String(title)
                .split('')
                .map((char) => (char === '-' ? ' ' : char))
                .join('');

        try {
            const relatedSeries = await serieService.getRelatedSeries(titleFormatted!);

            if (relatedSeries) {
                res.status(HttpStatusCode.OK).send(relatedSeries);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Related Series not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async updateSerieById(req: Request, res: Response) {
        const serieBodyParams = req.body;
        const { id } = req.params;

        try {
            const serie: Serie | null = await serieService.updateSerieById(serieBodyParams, id);

            if (serie) {
                res.status(HttpStatusCode.OK).send(serie);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Serie not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async addSerie(req: Request, res: Response) {
        const serieBodyParams = req.body;

        try {
            const serie: Serie | null = await serieService.addSerie(serieBodyParams);

            if (serie) {
                res.status(HttpStatusCode.Created).send(serie);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Serie not created' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async deleteSerieById(req: Request, res: Response) {
        const idParam = Number(req.params.id);

        try {
            const result = await serieService.deleteSerieById(idParam);

            if (result) {
                res.status(HttpStatusCode.OK).send({
                    msg: 'Serie deleted successfully',
                });
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Serie not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async searchSeriesByTitle(req: Request, res: Response) {
        const { page, ascOrDesc, sortBy, title } = req.query;

        const queryParams: any = {
            page: Number(page),
        };

        if (ascOrDesc !== undefined) {
            queryParams.ascOrDesc = String(ascOrDesc);
        }

        if (sortBy !== undefined) {
            queryParams.sortBy = String(sortBy);
        }

        try {
            const series = await serieService.searchSeriesByTitle(String(title), queryParams);

            if (series) {
                res.status(HttpStatusCode.OK).send(series);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async addSeasonToSerie(req: Request, res: Response) {
        const { serieId, seasonId } = req.body;

        try {
            const updatedSerie = await serieService.addSeasonToSerie(seasonId, serieId);

            if (updatedSerie) {
                res.status(HttpStatusCode.OK).send(updatedSerie);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Serie with new season not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default serieController;
