import { Genre, Movie, Serie } from '@prisma/client';
import GenreItem from './GenreItem';
import CardItem from './CardItem';

interface IListHomeSectionProps {
    data: any;
    type: 'movie' | 'serie' | 'genre';
}

const ListHomeSection = ({ data, type }: IListHomeSectionProps) => {
    return (
        <section class="relative flex flex-col space-y-3">
            <div class="flex justify-between items-center mx-1 pl-12 pr-12">
                <h2 class="font-bold text-2xl text-yellow-50">
                    Trending {type === 'serie' ? 'Series' : type === 'movie' ? 'Movies' : 'Genres'}
                </h2>
                <a
                    href={`/${type === 'serie' ? 'series' : type === 'movie' ? 'movies' : 'genres'}/${type === 'genre' ? (data[0] as Genre).name : type === 'movie' ? (data[0] as Movie).title : (data[0] as Serie).title}`}
                    class="font-black text-blue-500 text-sm no-underline"
                >
                    Explore All {type === 'serie' ? 'Series' : type === 'movie' ? 'Movies' : 'Genres'}
                </a>
            </div>
            <div class="flex flex-wrap justify-center items-center space-x-4 space-y-4">
                {type === 'genre' && (data as Genre[]).map((genre) => <GenreItem key={genre.id} data={genre} />)}
                {type === 'movie' &&
                    (data as Movie[]).map((movie: any) => <CardItem key={movie.id} data={movie} type="movie" />)}
                {type === 'serie' &&
                    (data as Serie[]).map((serie: any) => <CardItem key={serie.id} data={serie} type="serie" />)}
            </div>
        </section>
    );
};

export default ListHomeSection;
