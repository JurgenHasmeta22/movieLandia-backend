import { Request, Response } from 'express';
import { Serie } from '@prisma/client';
import HttpStatusCode from '../utils/httpStatusCodes';
import SerieService from '../services/serie.service';

class SerieController {
    private serieService: typeof SerieService;
    private httpStatusCode = HttpStatusCode;

    constructor(serieService: typeof SerieService) {
        this.serieService = serieService;
    }

    public async getSeries(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } = req.query;

        try {
            const series = await this.serieService.getSeries({
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
                res.status(this.httpStatusCode.OK).send(series);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async getSerieById(req: Request, res: Response) {
        const serieId = Number(req.params.id);

        try {
            const serie = await this.serieService.getSerieById(serieId);

            if (serie) {
                res.status(this.httpStatusCode.OK).send(serie);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Serie not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async getSerieByTitle(req: Request, res: Response) {
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
            const serie = await this.serieService.getSerieByTitle(title, queryParams);

            if (serie) {
                res.status(this.httpStatusCode.OK).send(serie);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'serie not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async getLatestSeries(req: Request, res: Response) {
        try {
            const latestSeries = await this.serieService.getLatestSeries();

            if (latestSeries) {
                res.status(this.httpStatusCode.OK).send(latestSeries);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async getRelatedSeries(req: Request, res: Response) {
        const { title } = req.query;
        const titleFormatted =
            title &&
            String(title)
                .split('')
                .map((char) => (char === '-' ? ' ' : char))
                .join('');

        try {
            const relatedSeries = await this.serieService.getRelatedSeries(titleFormatted!);

            if (relatedSeries) {
                res.status(this.httpStatusCode.OK).send(relatedSeries);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Related Series not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async updateSerieById(req: Request, res: Response) {
        const serieBodyParams = req.body;
        const { id } = req.params;

        try {
            const serie: Serie | null = await this.serieService.updateSerieById(serieBodyParams, id);

            if (serie) {
                res.status(this.httpStatusCode.OK).send(serie);
            } else {
                res.status(this.httpStatusCode.Conflict).send({ error: 'Serie not updated' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async addSerie(req: Request, res: Response) {
        const serieBodyParams = req.body;

        try {
            const serie: Serie | null = await this.serieService.addSerie(serieBodyParams);

            if (serie) {
                res.status(this.httpStatusCode.Created).send(serie);
            } else {
                res.status(this.httpStatusCode.Conflict).send({ error: 'Serie not created' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async deleteSerieById(req: Request, res: Response) {
        const idParam = Number(req.params.id);

        try {
            const result = await this.serieService.deleteSerieById(idParam);

            if (result) {
                res.status(this.httpStatusCode.OK).send({
                    msg: 'Serie deleted successfully',
                });
            } else {
                res.status(this.httpStatusCode.Conflict).send({ error: 'Serie not deleted' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async searchSeriesByTitle(req: Request, res: Response) {
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
            const series = await this.serieService.searchSeriesByTitle(String(title), queryParams);

            if (series) {
                res.status(this.httpStatusCode.OK).send(series);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async addSeasonToSerie(req: Request, res: Response) {
        const { serieId, seasonId } = req.body;

        try {
            const updatedSerie = await this.serieService.addSeasonToSerie(seasonId, serieId);

            if (updatedSerie) {
                res.status(this.httpStatusCode.OK).send(updatedSerie);
            } else {
                res.status(this.httpStatusCode.Conflict).send({ error: 'Serie with new season not updated' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }
}

export default new SerieController(SerieService);
