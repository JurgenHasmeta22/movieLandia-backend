import { FastifyRequest, FastifyReply } from 'fastify';
import serieModel from '../../models/serie.model';
import { Serie } from '@prisma/client';
import HttpStatusCode from '../../utils/httpStatusCodes';

interface GetSeriesQuery {
    sortBy?: string;
    ascOrDesc?: 'asc' | 'desc';
    page?: string;
    pageSize?: string;
    title?: string;
    filterValue?: string;
    filterName?: string;
    filterOperator?: '>' | '=' | '<';
}

interface GetSerieByTitleQuery {
    page?: string;
    ascOrDesc?: string;
    sortBy?: string;
    upvotesPage?: string;
    downvotesPage?: string;
    userId?: string;
}

const serieController = {
    async getSeries(request: FastifyRequest<{ Querystring: GetSeriesQuery }>, reply: FastifyReply) {
        const { sortBy, ascOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } = request.query;

        try {
            const series = await serieModel.getSeries({
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
                reply.status(HttpStatusCode.OK).send(series);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getSerieById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const serieId = Number(request.params.id);

        try {
            const serie = await serieModel.getSerieById(serieId);

            if (serie) {
                reply.status(HttpStatusCode.OK).send(serie);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Serie not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getSerieByTitle(
        request: FastifyRequest<{ Querystring: GetSerieByTitleQuery; Params: { title: string } }>,
        reply: FastifyReply,
    ) {
        const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage, userId } = request.query;
        const title = request.params.title
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
            const serie = await serieModel.getSerieByTitle(title, queryParams);

            if (serie) {
                reply.status(HttpStatusCode.OK).send(serie);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Serie not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getLatestSeries(request: FastifyRequest, reply: FastifyReply) {
        try {
            const latestSeries = await serieModel.getLatestSeries();

            if (latestSeries) {
                reply.status(HttpStatusCode.OK).send(latestSeries);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getRelatedSeries(request: FastifyRequest<{ Querystring: { title: string } }>, reply: FastifyReply) {
        const { title } = request.query;
        const titleFormatted =
            title &&
            String(title)
                .split('')
                .map((char) => (char === '-' ? ' ' : char))
                .join('');

        try {
            const relatedSeries = await serieModel.getRelatedSeries(titleFormatted!);

            if (relatedSeries) {
                reply.status(HttpStatusCode.OK).send(relatedSeries);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Related Series not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async updateSerieById(request: FastifyRequest<{ Params: { id: string }; Body: Serie }>, reply: FastifyReply) {
        const serieBodyParams = request.body;
        const { id } = request.params;

        try {
            const serie: Serie | null = await serieModel.updateSerieById(serieBodyParams, id);

            if (serie) {
                reply.status(HttpStatusCode.OK).send(serie);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Serie not updated' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addSerie(request: FastifyRequest<{ Body: Serie }>, reply: FastifyReply) {
        const serieBodyParams = request.body;

        try {
            const serie: Serie | null = await serieModel.addSerie(serieBodyParams);

            if (serie) {
                reply.status(HttpStatusCode.Created).send(serie);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Serie not created' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async deleteSerieById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const idParam = Number(request.params.id);

        try {
            const result = await serieModel.deleteSerieById(idParam);

            if (result) {
                reply.status(HttpStatusCode.OK).send({
                    msg: 'Serie deleted successfully',
                });
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Serie not deleted' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async searchSeriesByTitle(
        request: FastifyRequest<{ Querystring: { title: string; page?: string; ascOrDesc?: string; sortBy?: string } }>,
        reply: FastifyReply,
    ) {
        const { page, ascOrDesc, sortBy, title } = request.query;

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
            const series = await serieModel.searchSeriesByTitle(String(title), queryParams);

            if (series) {
                reply.status(HttpStatusCode.OK).send(series);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Series not found' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addSeasonToSerie(
        request: FastifyRequest<{ Body: { serieId: number; seasonId: number } }>,
        reply: FastifyReply,
    ) {
        const { serieId, seasonId } = request.body;

        try {
            const updatedSerie = await serieModel.addSeasonToSerie(seasonId, serieId);

            if (updatedSerie) {
                reply.status(HttpStatusCode.OK).send(updatedSerie);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Serie with new season not updated' });
            }
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default serieController;
