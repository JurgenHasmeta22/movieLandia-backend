const GenreCard = ({ data }: any) => {
    return (
        <a href={`/genres/${data.name}`} class="no-underline">
            <div class="flex items-center justify-center cursor-pointer h-48 w-48 bg-blue-200 rounded shadow-lg">
                <span class="text-lg font-medium" safe>{data.name}</span>
            </div>
        </a>
    );
};

export default GenreCard;
