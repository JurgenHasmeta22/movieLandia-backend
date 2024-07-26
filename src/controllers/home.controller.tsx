import Home from 'src/views/pages/client/Home/Home';
import genreModel from '../models/genre.model';
import movieModel from '../models/movie.model';
import serieModel from '../models/serie.model';
import HttpStatusCode from '../utils/httpStatusCodes';
import MainLayout from 'src/views/layouts/MainLayout';
import { Request, Response } from 'express';

const homeController = {
    async homePage(req: Request, res: Response) {
        const { sortBy, ascOrDesc, page, pageSize, name, filterValue, filterName, filterOperator, title } = req.query;

        const moviesData = await movieModel.getMovies({
            sortBy: sortBy as string,
            ascOrDesc: ascOrDesc as 'asc' | 'desc',
            perPage: pageSize ? Number(pageSize) : 10,
            page: Number(page),
            title: title as string,
            filterValue: filterValue ? Number(filterValue) : undefined,
            filterNameString: filterName as string,
            filterOperatorString: filterOperator as '>' | '=' | '<',
        });

        const seriesData = await serieModel.getSeries({
            sortBy: sortBy as string,
            ascOrDesc: ascOrDesc as 'asc' | 'desc',
            perPage: pageSize ? Number(pageSize) : 10,
            page: Number(page),
            title: title as string,
            filterValue: filterValue ? Number(filterValue) : undefined,
            filterNameString: filterName as string,
            filterOperatorString: filterOperator as '>' | '=' | '<',
        });

        const genresData = await genreModel.getGenres({
            sortBy: sortBy! as string,
            ascOrDesc: ascOrDesc! as 'asc' | 'desc',
            perPage: pageSize ? Number(pageSize) : 20,
            page: Number(page!),
            name: name! as string,
            filterValue: filterValue ? Number(filterValue) : undefined,
            filterNameString: filterName! as string,
            filterOperatorString: filterOperator! as '>' | '=' | '<',
        });

        const data = {
            genres: genresData.rows.slice(0, 5),
            movies: moviesData.movies.slice(0, 5),
            series: seriesData.rows.slice(0, 5),
        };

        if (moviesData && seriesData && genresData) {
            res.send(
                <MainLayout>
                    <Home data={data} />
                </MainLayout>,
            );
        } else {
            res.status(HttpStatusCode.BadRequest).send({ error: 'Home not found' });
        }
    },
};

export default homeController;
