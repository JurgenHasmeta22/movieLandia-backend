import { Request, Response } from 'express';
import movieService from '../services/movie.service';
import { Movie } from '@prisma/client';
import HttpStatusCode from '../utils/httpStatusCodes';

const movieController = {
    async getMovies(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, title, filterValue, filterName, filterOperator } = req.query;

        try {
            const movies = await movieService.getMovies({
                sortBy: sortBy as string,
                ascOrDesc: ascOrDesc as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 10,
                page: Number(page),
                title: title as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName as string,
                filterOperatorString: filterOperator as '>' | '=' | '<',
            });

            if (movies) {
                res.status(HttpStatusCode.OK).send(movies);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Movies not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getMovieById(req: Request, res: Response) {
        const movieId = Number(req.params.id);

        try {
            const movie = await movieService.getMovieById(movieId);

            if (movie) {
                res.status(HttpStatusCode.OK).send(movie);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Movie not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getMovieByTitle(req: Request, res: Response) {
        const { page, ascOrDesc, sortBy, upvotesPage, downvotesPage } = req.query;
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

        try {
            const movie = await movieService.getMovieByTitle(title, queryParams);

            if (movie) {
                res.status(HttpStatusCode.OK).send(movie);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Movie not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async getLatestMovies(req: Request, res: Response) {
        try {
            const latestMovies = await movieService.getLatestMovies();

            if (latestMovies) {
                res.status(HttpStatusCode.OK).send(latestMovies);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Movies not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async updateMovieById(req: Request, res: Response) {
        const movieBodyParams = req.body;
        const { id } = req.params;

        try {
            const movie: Movie | null = await movieService.updateMovieById(movieBodyParams, id);

            if (movie) {
                res.status(HttpStatusCode.OK).send(movie);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Movie not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async addMovie(req: Request, res: Response) {
        const movieBodyParams = req.body;

        try {
            const movie: Movie | null = await movieService.addMovie(movieBodyParams);

            if (movie) {
                res.status(HttpStatusCode.Created).send(movie);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Movie not created' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async deleteMovieById(req: Request, res: Response) {
        const idParam = Number(req.params.id);

        try {
            const result = await movieService.deleteMovieById(idParam);

            if (result) {
                res.status(HttpStatusCode.OK).send({
                    msg: 'Movie deleted successfully',
                });
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Movie not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
    async searchMoviesByTitle(req: Request, res: Response) {
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
            const movies = await movieService.searchMoviesByTitle(String(title), queryParams);

            if (movies) {
                res.status(HttpStatusCode.OK).send(movies);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Movies not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default movieController;
