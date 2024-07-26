import HomeHero from './components/HomeHero';
import ListHomeSection from 'src/views/components/ui/ListHomeSection';

interface IHomeProps {
    data: any;
}

const Home = ({ data }: IHomeProps) => {
    return (
        <div class="container mx-auto bg-gray-900 pt-12 pb-12">
            <div class="flex flex-col space-y-20">
                <HomeHero />
                <ListHomeSection data={data.movies} type="movie" />
                <ListHomeSection data={data.series} type="serie" />
                <ListHomeSection data={data.genres} type="genre" />
            </div>
        </div>
    );
};

export default Home;
