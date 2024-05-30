import { prisma } from '../app';
import { Genre, Prisma } from '@prisma/client';

interface GetGenresParams {
    sortBy: string;
    ascOrDesc: 'asc' | 'desc';
    perPage: number;
    page: number;
    name: string;
    type?: string;
    filterValue?: number;
    filterNameString: string;
    filterOperatorString: '>' | '=' | '<';
}

const genreService = {
    async getGenres({
        sortBy,
        ascOrDesc,
        perPage,
        page,
        name,
        filterValue,
        filterNameString,
        filterOperatorString,
    }: GetGenresParams): Promise<any | null> {
        const filters: any = {};
        const skip = perPage ? (page ? (page - 1) * perPage : 0) : page ? (page - 1) * 20 : 0;
        const take = perPage || 20;

        if (name) filters.name = { contains: name };

        if (filterValue !== undefined && filterNameString && filterOperatorString) {
            const operator = filterOperatorString === '>' ? 'gt' : filterOperatorString === '<' ? 'lt' : 'equals';
            filters[filterNameString] = { [operator]: filterValue };
        }

        const orderByObject: any = {};

        if (sortBy && ascOrDesc) {
            orderByObject[sortBy] = ascOrDesc;
        }

        const genres = await prisma.genre.findMany({
            where: filters,
            orderBy: orderByObject,
            skip,
            take,
        });

        const count = await prisma.genre.count();

        if (genres) {
            return { rows: genres, count };
        } else {
            return null;
        }
    },
    async getGenreById(id: number): Promise<Genre | null> {
        const result = await prisma.genre.findUnique({
            where: {
                id,
            },
            include: {
                movies: {
                    select: {
                        movie: true,
                    },
                },
            },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },
    async getGenreByName(
        nameGenre: string,
        {
            sortBy,
            ascOrDesc,
            perPage,
            page,
            name,
            type,
            filterValue,
            filterNameString,
            filterOperatorString,
        }: GetGenresParams,
    ): Promise<any | null> {
        const filters: any = {};
        const skip = perPage ? (page ? (page - 1) * perPage : 0) : page ? (page - 1) * 20 : 0;
        const take = perPage || 20;

        if (name) filters.name = { contains: name };

        if (filterValue !== undefined && filterNameString && filterOperatorString) {
            const operator = filterOperatorString === '>' ? 'gt' : filterOperatorString === '<' ? 'lt' : 'equals';
            filters[filterNameString] = { [operator]: filterValue };
        }

        const orderByObject: any = {};

        if (sortBy && ascOrDesc) {
            orderByObject[sortBy] = ascOrDesc;
        }

        const genre = await prisma.genre.findFirst({
            where: {
                name: {
                    equals: nameGenre,
                },
            },
        });

        if (genre) {
            if (type === 'movie') {
                const result = await prisma.movieGenre.findMany({
                    where: {
                        genreId: genre?.id,
                    },
                    orderBy: {
                        movie: orderByObject,
                    },
                    skip,
                    take,
                    select: {
                        movie: true,
                    },
                });

                const count = await prisma.movieGenre.count({
                    where: {
                        genreId: genre?.id,
                    },
                });

                if (result) {
                    const formattedMovies = result.map((item) => item.movie);
                    return { movies: formattedMovies, count };
                }
            } else if (type === 'serie') {
                const result = await prisma.serieGenre.findMany({
                    where: {
                        genreId: genre?.id,
                    },
                    orderBy: {
                        serie: orderByObject,
                    },
                    skip,
                    take,
                    select: {
                        serie: true,
                    },
                });

                const count = await prisma.serieGenre.count({
                    where: {
                        genreId: genre?.id,
                    },
                });

                if (result) {
                    const formattedSeries = result.map((item) => item.serie);
                    return { series: formattedSeries, count };
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    },
    async addGenre(genreData: Prisma.GenreCreateInput): Promise<Genre | null> {
        const result = await prisma.genre.create({
            data: genreData,
            include: {
                movies: {
                    select: {
                        movie: true,
                    },
                },
            },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },
    async updateGenreById(genreData: Prisma.GenreUpdateInput, id: string): Promise<Genre | null> {
        const result = await prisma.genre.update({
            where: {
                id: parseInt(id),
            },
            data: genreData,
            include: {
                movies: {
                    select: {
                        movie: true,
                    },
                },
            },
        });

        if (result) {
            return result;
        } else {
            return null;
        }
    },
    async deleteGenreById(id: number): Promise<string | null> {
        try {
            const result = await prisma.genre.delete({
                where: {
                    id,
                },
            });

            if (result) {
                return 'Genre deleted successfully';
            } else {
                return null;
            }
        } catch (error) {
            throw new Error('Failed to delete genre');
        }
    },
    async searchGenresByName(name: string, page: number): Promise<Genre[] | null> {
        const perPage = 20;
        const skip = perPage * (page - 1);
        const genres = await prisma.genre.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
            orderBy: {
                name: 'asc',
            },
            skip,
            take: perPage,
        });

        if (genres) {
            return genres;
        } else {
            return null;
        }
    },
};

export default genreService;
