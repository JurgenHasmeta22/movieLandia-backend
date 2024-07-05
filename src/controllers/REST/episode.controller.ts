import { FastifyRequest, FastifyReply } from 'fastify';
import episodeModel from '../../models/episode.model';
import { Episode } from '@prisma/client';
import HttpStatusCode from '../../utils/httpStatusCodes';

interface GetEpisodesQuery {
    sortBy?: string;
    ascOrDesc?: string;
    page?: number;
    pageSize?: number;
    title?: string;
    filterValue?: number;
    filterName?: string;
    filterOperator?: string;
}

const episodeController = {
    async getEpisodes(request: FastifyRequest<{ Querystring: GetEpisodesQuery }>, reply: FastifyReply) {
        const { sortBy, ascOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } = request.query;

        try {
            const episodes = await episodeModel.getEpisodes({
                sortBy: sortBy as string,
                ascOrDesc: ascOrDesc as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 20,
                page: Number(page),
                title: title as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName as string,
                filterOperatorString: filterOperator as '>' | '=' | '<',
            });

            if (episodes) {
                reply.status(HttpStatusCode.OK).send(episodes);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Episodes not found' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async getEpisodeById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const episodeId = Number(request.params.id);

        try {
            const episode = await episodeModel.getEpisodeById(episodeId);

            if (episode) {
                reply.status(HttpStatusCode.OK).send(episode);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Episode not found' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async getEpisodeByTitle(request: FastifyRequest<{ Params: { title: string } }>, reply: FastifyReply) {
        const title = request.params.title
            .split('')
            .map((char) => (char === '-' ? ' ' : char))
            .join('');

        try {
            const episode = await episodeModel.getEpisodeByTitle(title);

            if (episode) {
                reply.status(HttpStatusCode.OK).send(episode);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Episode not found' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async updateEpisodeById(request: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) {
        const episodeBodyParams: any = request.body;
        const { id } = request.params;

        try {
            const episode: Episode | null = await episodeModel.updateEpisodeById(episodeBodyParams, id);

            if (episode) {
                reply.status(HttpStatusCode.OK).send(episode);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Episode not updated' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async addEpisode(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
        const episodeBodyParams: any = request.body;

        try {
            const episode: Episode | null = await episodeModel.addEpisode(episodeBodyParams);

            if (episode) {
                reply.status(HttpStatusCode.Created).send(episode);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Episode not created' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async deleteEpisodeById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const idParam = Number(request.params.id);

        try {
            const result = await episodeModel.deleteEpisodeById(idParam);

            if (result) {
                reply.status(HttpStatusCode.OK).send({
                    msg: 'Episode deleted successfully',
                });
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Episode not deleted' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async searchEpisodesByTitle(
        request: FastifyRequest<{ Querystring: { title?: string; page?: number } }>,
        reply: FastifyReply,
    ) {
        const { title, page } = request.query;

        try {
            const episodes = await episodeModel.searchEpisodesByTitle(String(title), Number(page));

            if (episodes) {
                reply.status(HttpStatusCode.OK).send(episodes);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Episodes not found' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },
};

export default episodeController;
