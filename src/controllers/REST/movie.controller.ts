import { FastifyRequest, FastifyReply } from 'fastify';
import movieModel from '../../models/movie.model';
import HttpStatusCode from '../../utils/httpStatusCodes';

const movieController = {
    async getMovies(request: FastifyRequest<{ Querystring: any }>, reply: FastifyReply) {
        const { sortBy, ascOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } = request.query;

        try {
            const movies = await movieModel.getMovies({
                sortBy: sortBy,
                ascOrDesc: ascOrDesc as 'asc' | 'desc',
                perPage: pageSize ?? 10,
                page: page ?? 1,
                title: title ?? '',
                filterValue: filterValue ?? undefined,
                filterNameString: filterName ?? '',
                filterOperatorString: filterOperator ?? '',
            });

            reply.status(HttpStatusCode.OK).send(movies);
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getMovieById(request: FastifyRequest<{ Params: UpdateMovieByIdParams }>, reply: FastifyReply) {
        const { id } = request.params;

        try {
            const movie = await movieModel.getMovieById(Number(id));

            if (!movie) {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Movie not found' });
                return;
            }

            reply.status(HttpStatusCode.OK).send(movie);
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getMovieByTitle(request: FastifyRequest<{ Params: GetMovieByTitleParams, Querystring: GetMovieByTitleQuery }>, reply: FastifyReply) {
        const { title } = request.params;
        const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage, userId } = request.query;

        try {
            const movie = await movieModel.getMovieByTitle(title, {
                page: page ?? 1,
                ascOrDesc: ascOrDesc ?? '',
                sortBy: sortBy ?? '',
                upvotesPage: upvotesPage ?? undefined,
                downvotesPage: downvotesPage ?? undefined,
                userId: userId ?? undefined,
            });

            if (!movie) {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Movie not found' });
                return;
            }

            reply.status(HttpStatusCode.OK).send(movie);
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getLatestMovies(request: FastifyRequest, reply: FastifyReply) {
        try {
            const latestMovies = await movieModel.getLatestMovies();

            reply.status(HttpStatusCode.OK).send(latestMovies);
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getRelatedMovies(request: FastifyRequest<{ Querystring: { title?: string } }>, reply: FastifyReply) {
        const { title } = request.query;

        try {
            const relatedMovies = await movieModel.getRelatedMovies(title ?? '');

            if (!relatedMovies) {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Related Movies not found' });
                return;
            }

            reply.status(HttpStatusCode.OK).send(relatedMovies);
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async updateMovieById(request: FastifyRequest<{ Params: UpdateMovieByIdParams, Body: MovieRequestBody }>, reply: FastifyReply) {
        const { id } = request.params;
        const movieBodyParams = request.body;

        try {
            const movie = await movieModel.updateMovieById(movieBodyParams, id);

            if (!movie) {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Movie not updated' });
                return;
            }

            reply.status(HttpStatusCode.OK).send(movie);
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addMovie(request: FastifyRequest<{ Body: MovieRequestBody }>, reply: FastifyReply) {
        const movieBodyParams = request.body;

        try {
            const movie = await movieModel.addMovie(movieBodyParams);

            if (!movie) {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Movie not created' });
                return;
            }

            reply.status(HttpStatusCode.Created).send(movie);
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async deleteMovieById(request: FastifyRequest<{ Params: UpdateMovieByIdParams }>, reply: FastifyReply) {
        const { id } = request.params;

        try {
            const replyult = await movieModel.deleteMovieById(Number(id));

            if (!replyult) {
                reply.status(HttpStatusCode.Conflict).send({ error: 'Movie not deleted' });
                return;
            }

            reply.status(HttpStatusCode.OK).send({ msg: 'Movie deleted successfully' });
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async searchMoviesByTitle(request: FastifyRequest<{ Querystring: any }>, reply: FastifyReply) {
        const { title, page, ascOrDesc, sortBy } = request.query ;

        try {
            const movies = await movieModel.searchMoviesByTitle(title ?? '', {
                page: page ?? 1,
                ascOrDesc: ascOrDesc ?? '',
                sortBy: sortBy ?? '',
            });

            if (!movies) {
                reply.status(HttpStatusCode.NotFound).send({ error: 'Movies not found' });
                return;
            }

            reply.status(HttpStatusCode.OK).send(movies);
        } catch (err) {
            reply.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default movieController;

