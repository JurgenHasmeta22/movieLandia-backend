import { Request, Response } from 'express';
import GenreService from '../services/genre.service';
import { Genre } from '@prisma/client';
import HttpStatusCode from '../utils/httpStatusCodes';

class GenreController {
    private genreService: typeof GenreService;
    private httpStatusCode = HttpStatusCode;

    constructor(genreService: typeof GenreService) {
        this.genreService = genreService;
    }

    public async getGenres(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, name, filterValue, filterName, filterOperator } = req.query;

        try {
            const genres = await this.genreService.getGenres({
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
                res.status(this.httpStatusCode.OK).send(genres);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Genres not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async getGenreById(req: Request, res: Response) {
        const genreId = Number(req.params.id);

        try {
            const genre = await this.genreService.getGenreById(genreId);

            if (genre) {
                res.status(this.httpStatusCode.OK).send(genre);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Genre not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async getGenreByName(req: Request, res: Response) {
        const nameGenre = req.params.name
            .split('')
            .map((char) => (char === '-' ? ' ' : char))
            .join('');

        const { sortBy, ascOrDesc, page, pageSize, type, name, filterValue, filterName, filterOperator } = req.query;

        try {
            const genre = await this.genreService.getGenreByName(nameGenre, {
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
                res.status(this.httpStatusCode.OK).send(genre);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Genre not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async addGenre(req: Request, res: Response) {
        const genreBodyParams = req.body;

        try {
            const genre: Genre | null = await this.genreService.addGenre(genreBodyParams);

            if (genre) {
                res.status(this.httpStatusCode.Created).send(genre);
            } else {
                res.status(this.httpStatusCode.Conflict).send({ error: 'Genre not created' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async updateGenreById(req: Request, res: Response) {
        const genreBodyParams = req.body;
        const { id } = req.params;

        try {
            const genre: Genre | null = await this.genreService.updateGenreById(genreBodyParams, id);

            if (genre) {
                res.status(this.httpStatusCode.OK).send(genre);
            } else {
                res.status(this.httpStatusCode.Conflict).send({ error: 'Genre not updated' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async deleteGenreById(req: Request, res: Response) {
        const idParam = Number(req.params.id);

        try {
            const result = await this.genreService.deleteGenreById(idParam);

            if (result) {
                res.status(this.httpStatusCode.OK).send({
                    msg: 'Genre deleted successfully',
                });
            } else {
                res.status(this.httpStatusCode.Conflict).send({ error: 'Genre not deleted' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }

    public async searchGenresByName(req: Request, res: Response) {
        const { name, page } = req.query;

        try {
            const genres = await this.genreService.searchGenresByName(String(name), Number(page));

            if (genres) {
                res.status(this.httpStatusCode.OK).send(genres);
            } else {
                res.status(this.httpStatusCode.NotFound).send({ error: 'Genres not found' });
            }
        } catch (err) {
            res.status(this.httpStatusCode.BadRequest).send({ error: (err as Error).message });
        }
    }
}

export default new GenreController(GenreService);
