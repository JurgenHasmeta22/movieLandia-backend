import genreModel from '../../models/genre.model';
import { FastifyRequest, FastifyReply } from 'fastify';
import HttpStatusCode from '../../utils/httpStatusCodes';

interface GetGenresQuery {
    sortBy?: string;
    ascOrDesc?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
    name?: string;
    filterValue?: string;
    filterName?: string;
    filterOperator?: '>' | '=' | '<';
}

interface GetGenreByNameQuery {
    sortBy?: string;
    ascOrDesc?: 'asc' | 'desc';
    page?: number;
    pageSize?: number;
    type?: string;
    name?: string;
    filterValue?: string;
    filterName?: string;
    filterOperator?: '>' | '=' | '<';
}

const genreController = {
    async getGenres(request: FastifyRequest<{ Querystring: GetGenresQuery }>, reply: FastifyReply) {
        const { sortBy, ascOrDesc, page, pageSize, name, filterValue, filterName, filterOperator } = request.query;

        try {
            const genres = await genreModel.getGenres({
                sortBy: sortBy!,
                ascOrDesc: ascOrDesc!,
                perPage: pageSize ? Number(pageSize) : 20,
                page: page !== undefined ? Number(page) : 1,
                name: name!,
                filterValue: filterValue !== undefined ? Number(filterValue) : undefined,
                filterNameString: filterName!,
                filterOperatorString: filterOperator!,
            });

            if (genres) {
                reply.status(HttpStatusCode.OK).send(genres);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Genres not found' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async getGenreById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const genreId = Number(request.params.id);

        try {
            const genre = await genreModel.getGenreById(genreId);

            if (genre) {
                reply.status(HttpStatusCode.OK).send(genre);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Genre not found' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async getGenreByName(
        request: FastifyRequest<{ Params: { name: string }; Querystring: GetGenreByNameQuery }>,
        reply: FastifyReply,
    ) {
        const nameGenre = request.params.name
            .split('')
            .map((char: string) => (char === '-' ? ' ' : char))
            .join('');
        const { sortBy, ascOrDesc, page, pageSize, type, name, filterValue, filterName, filterOperator } =
            request.query;

        try {
            const genre = await genreModel.getGenreByName(nameGenre, {
                sortBy: sortBy!,
                ascOrDesc: ascOrDesc!,
                perPage: pageSize ? Number(pageSize) : 20,
                page: page !== undefined ? Number(page) : 1,
                name: name!,
                type: type!,
                filterValue: filterValue !== undefined ? Number(filterValue) : undefined,
                filterNameString: filterName!,
                filterOperatorString: filterOperator!,
            });

            if (genre) {
                reply.status(HttpStatusCode.OK).send(genre);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Genre not found' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async addGenre(request: FastifyRequest<{ Body: any }>, reply: FastifyReply) {
        const genreBodyParams: any = request.body;

        try {
            const genre = await genreModel.addGenre(genreBodyParams);

            if (genre) {
                reply.status(HttpStatusCode.Created).send(genre);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Genre not created' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async updateGenreById(request: FastifyRequest<{ Params: { id: string }; Body: any }>, reply: FastifyReply) {
        const genreBodyParams: any = request.body;
        const { id } = request.params;

        try {
            const genre = await genreModel.updateGenreById(genreBodyParams, id);

            if (genre) {
                reply.status(HttpStatusCode.OK).send(genre);
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Genre not updated' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async deleteGenreById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const idParam = Number(request.params.id);

        try {
            const result = await genreModel.deleteGenreById(idParam);

            if (result) {
                reply.status(HttpStatusCode.OK).send({ msg: 'Genre deleted successfully' });
            } else {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Genre not deleted' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },

    async searchGenresByName(
        request: FastifyRequest<{ Querystring: { name?: string; page?: number } }>,
        reply: FastifyReply,
    ) {
        const { name, page } = request.query;

        try {
            const genres = await genreModel.searchGenresByName(String(name), Number(page));

            if (genres) {
                reply.status(HttpStatusCode.OK).send(genres);
            } else {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Genres not found' });
            }
        } catch (err: any) {
            reply.status(HttpStatusCode.BadRequest).send({ error: err.message });
        }
    },
};

export default genreController;
