import { Request, Response } from 'express';
import genreModel from '../models/genre.model';
import { Genre } from '@prisma/client';
import HttpStatusCode from '../utils/httpStatusCodes';

const genreController = {
    async getGenres(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, name, filterValue, filterName, filterOperator } = req.query;

        try {
            const genres = await genreModel.getGenres({
                sortBy: sortBy! as string,
                ascOrDesc: ascOrDesc! as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 20,
                page: Number(page!),
                name: name! as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName! as string,
                filterOperatorString: filterOperator! as '>' | '=' | '<',
            });

            if (genres) {
                res.status(HttpStatusCode.OK).send(genres);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Genres not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getGenreById(req: Request, res: Response) {
        const genreId = Number(req.params.id);

        try {
            const genre = await genreModel.getGenreById(genreId);

            if (genre) {
                res.status(HttpStatusCode.OK).send(genre);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Genre not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async getGenreByName(req: Request, res: Response) {
        const nameGenre = req.params.name
            .split('')
            .map((char) => (char === '-' ? ' ' : char))
            .join('');

        const { sortBy, ascOrDesc, page, pageSize, type, name, filterValue, filterName, filterOperator } = req.query;

        try {
            const genre = await genreModel.getGenreByName(nameGenre, {
                sortBy: sortBy! as string,
                ascOrDesc: ascOrDesc! as 'asc' | 'desc',
                perPage: pageSize ? Number(pageSize) : 20,
                page: Number(page!),
                name: name! as string,
                type: type as string,
                filterValue: filterValue ? Number(filterValue) : undefined,
                filterNameString: filterName! as string,
                filterOperatorString: filterOperator! as '>' | '=' | '<',
            });

            if (genre) {
                res.status(HttpStatusCode.OK).send(genre);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Genre not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async addGenre(req: Request, res: Response) {
        const genreBodyParams = req.body;

        try {
            const genre: Genre | null = await genreModel.addGenre(genreBodyParams);

            if (genre) {
                res.status(HttpStatusCode.Created).send(genre);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Genre not created' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async updateGenreById(req: Request, res: Response) {
        const genreBodyParams = req.body;
        const { id } = req.params;

        try {
            const genre: Genre | null = await genreModel.updateGenreById(genreBodyParams, id);

            if (genre) {
                res.status(HttpStatusCode.OK).send(genre);
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Genre not updated' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async deleteGenreById(req: Request, res: Response) {
        const idParam = Number(req.params.id);

        try {
            const result = await genreModel.deleteGenreById(idParam);

            if (result) {
                res.status(HttpStatusCode.OK).send({
                    msg: 'Genre deleted successfully',
                });
            } else {
                res.status(HttpStatusCode.Conflict).send({ error: 'Genre not deleted' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },

    async searchGenresByName(req: Request, res: Response) {
        const { name, page } = req.query;

        try {
            const genres = await genreModel.searchGenresByName(String(name), Number(page));

            if (genres) {
                res.status(HttpStatusCode.OK).send(genres);
            } else {
                res.status(HttpStatusCode.NotFound).send({ error: 'Genres not found' });
            }
        } catch (err) {
            res.status(HttpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    },
};

export default genreController;
