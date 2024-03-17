export const components = {
    securitySchemes: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            in: 'header',
        },
    },
    schemas: {
        Movie: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'The auto-generated id of the movie',
                },
                title: {
                    type: 'string',
                    description: 'The movie title',
                },
                videoSrc: {
                    type: 'string',
                    description: 'The video source of the movie',
                },
                photoSrc: {
                    type: 'string',
                    description: 'The photo source of the movie',
                },
                trailerSrc: {
                    type: 'string',
                    description: 'The trailer source of the movie',
                },
                duration: {
                    type: 'string',
                    description: 'The duration of the movie',
                },
                ratingImdb: {
                    type: 'string',
                    description: 'The rating of the movie',
                },
                releaseYear: {
                    type: 'string',
                    description: 'The release year of the movie',
                },
                description: {
                    type: 'string',
                    description: 'The description of the movie',
                },
                views: {
                    type: 'string',
                    description: 'The views of the movie',
                },
                genres: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Genre',
                    },
                    description: 'The genres of the movie',
                },
            },
            example: {
                id: 'abc123',
                title: 'Inception',
                director: 'Christopher Nolan',
                genre: 'Science Fiction',
                releaseYear: '2010',
                rating: '8.8',
                duration: '148 minutes',
                description: 'A thief who enters the dreams of others to steal their secrets.',
                views: '1000000',
                genres: [
                    {
                        id: 1,
                        name: 'Science Fiction',
                    },
                    {
                        id: 2,
                        name: 'Action',
                    },
                ],
            },
        },
        MoviePost: {
            type: 'object',
            required: [
                'title',
                'videoSrc',
                'photoSrc',
                'trailerSrc',
                'duration',
                'ratingImdb',
                'releaseYear',
                'description',
                'views',
            ],
            properties: {
                title: {
                    type: 'string',
                    description: 'The movie title',
                },
                videoSrc: {
                    type: 'string',
                    description: 'The video source of the movie',
                },
                photoSrc: {
                    type: 'string',
                    description: 'The photo source of the movie',
                },
                trailerSrc: {
                    type: 'string',
                    description: 'The trailer source of the movie',
                },
                duration: {
                    type: 'string',
                    description: 'The duration of the movie',
                },
                ratingImdb: {
                    type: 'string',
                    description: 'The rating of the movie',
                },
                releaseYear: {
                    type: 'string',
                    description: 'The release year of the movie',
                },
                description: {
                    type: 'string',
                    description: 'The description of the movie',
                },
                views: {
                    type: 'string',
                    description: 'The views of the movie',
                },
            },
            example: {
                title: 'Inception',
                director: 'Christopher Nolan',
                genre: 'Science Fiction',
                releaseYear: '2010',
                rating: '8.8',
                duration: '148 minutes',
                description: 'A thief who enters the dreams of others to steal their secrets.',
                views: '1000000',
            },
        },
        MoviePatch: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description: 'The movie title',
                },
                videoSrc: {
                    type: 'string',
                    description: 'The video source of the movie',
                },
                photoSrc: {
                    type: 'string',
                    description: 'The photo source of the movie',
                },
                trailerSrc: {
                    type: 'string',
                    description: 'The trailer source of the movie',
                },
                duration: {
                    type: 'string',
                    description: 'The duration of the movie',
                },
                ratingImdb: {
                    type: 'string',
                    description: 'The rating of the movie',
                },
                releaseYear: {
                    type: 'string',
                    description: 'The release year of the movie',
                },
                description: {
                    type: 'string',
                    description: 'The description of the movie',
                },
                views: {
                    type: 'string',
                    description: 'The views of the movie',
                },
            },
            example: {
                title: 'Inception',
                director: 'Christopher Nolan',
                genre: 'Science',
                releaseYear: '2010',
                rating: '8.8',
                duration: '148 minutes',
            },
        },
        UserFavoriteMovie: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'The auto-generated id of the favorite',
                },
                userId: {
                    type: 'number',
                    description: 'The id of the user who favorited the movie',
                },
                movieId: {
                    type: 'number',
                    description: 'The id of the favorite movie',
                },
                user: {
                    $ref: '#/components/schemas/User',
                    description: 'The user who favorited the movie',
                },
                movie: {
                    $ref: '#/components/schemas/Movie',
                    description: 'The favorite movie',
                },
            },
            example: {
                id: 1,
                userId: 123,
                movieId: 456,
                user: {
                    id: 123,
                    username: 'user1',
                    email: 'user1@example.com',
                },
                movie: {
                    id: 'abc123',
                    title: 'Inception',
                    director: 'Christopher Nolan',
                    genre: 'Science Fiction',
                    releaseYear: '2010',
                    rating: '8.8',
                    duration: '148 minutes',
                    description: 'A thief who enters the dreams of others to steal their secrets.',
                    views: '1000000',
                },
            },
        },
        Genre: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'The auto-generated id of the genre',
                },
                name: {
                    type: 'string',
                    description: 'The name of the genre',
                },
                movies: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/MovieGenre',
                    },
                    description: 'The movies associated with the genre',
                },
            },
            example: {
                id: 1,
                name: 'Action',
                movies: [
                    {
                        id: 1,
                        movieId: 123,
                        genreId: 1,
                        movie: {
                            id: 123,
                            title: 'Terminator',
                            director: 'James Cameron',
                            genre: 'Action',
                            releaseYear: 1984,
                            rating: 8.0,
                            duration: '107 minutes',
                            description: 'A cyborg assassin is sent back in time to kill Sarah Connor.',
                            views: 1000000,
                        },
                    },
                ],
            },
        },
        GenrePost: {
            type: 'object',
            required: ['name'],
            properties: {
                name: {
                    type: 'string',
                    description: 'The name of the genre',
                },
            },
            example: {
                name: 'Action',
            },
        },
        GenrePatch: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    description: 'The name of the genre',
                },
            },
            example: {
                name: 'Sci-Fi',
            },
        },
        MovieGenre: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'The auto-generated id of the movie-genre association',
                },
                movieId: {
                    type: 'number',
                    description: 'The id of the movie associated with the genre',
                },
                genreId: {
                    type: 'number',
                    description: 'The id of the genre associated with the movie',
                },
                movie: {
                    $ref: '#/components/schemas/Movie',
                    description: 'The movie associated with the genre',
                },
                genre: {
                    $ref: '#/components/schemas/Genre',
                    description: 'The genre associated with the movie',
                },
            },
            example: {
                id: 1,
                movieId: 123,
                genreId: 1,
                movie: {
                    id: 123,
                    title: 'Terminator',
                    director: 'James Cameron',
                    genre: 'Action',
                    releaseYear: 1984,
                    rating: 8.0,
                    duration: '107 minutes',
                    description: 'A cyborg assassin is sent back in time to kill Sarah Connor.',
                    views: 1000000,
                },
                genre: {
                    id: 1,
                    name: 'Action',
                },
            },
        },
        Serie: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'The auto-generated id of the series',
                },
                title: {
                    type: 'string',
                    description: 'The title of the series',
                },
                photoSrc: {
                    type: 'string',
                    description: 'The photo source of the series',
                },
                releaseYear: {
                    type: 'number',
                    description: 'The release year of the series',
                },
                ratingImdb: {
                    type: 'number',
                    description: 'The IMDb rating of the series',
                },
                episodes: {
                    type: 'array',
                    items: {
                        $ref: '#/components/schemas/Episode',
                    },
                    description: 'The episodes of the series',
                },
            },
            example: {
                id: 1,
                title: 'Game of Thrones',
                photoSrc: 'https://example.com/game-of-thrones.jpg',
                releaseYear: 2011,
                ratingImdb: 9.3,
                episodes: [
                    {
                        id: 1,
                        title: 'Winter Is Coming',
                        duration: '60 minutes',
                    },
                    {
                        id: 2,
                        title: 'The Kingsroad',
                        duration: '58 minutes',
                    },
                ],
            },
        },
        SeriePost: {
            type: 'object',
            required: ['title', 'photoSrc', 'releaseYear', 'ratingImdb'],
            properties: {
                title: {
                    type: 'string',
                    description: 'The title of the series',
                },
                photoSrc: {
                    type: 'string',
                    description: 'The photo source of the series',
                },
                releaseYear: {
                    type: 'number',
                    description: 'The release year of the series',
                },
                ratingImdb: {
                    type: 'number',
                    description: 'The IMDb rating of the series',
                },
            },
            example: {
                title: 'Game of Thrones',
                photoSrc: 'https://example.com/game-of-thrones.jpg',
                releaseYear: 2011,
                ratingImdb: 9.3,
            },
        },
        SeriePatch: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description: 'The title of the series',
                },
                photoSrc: {
                    type: 'string',
                    description: 'The photo source of the series',
                },
                releaseYear: {
                    type: 'number',
                    description: 'The release year of the series',
                },
                ratingImdb: {
                    type: 'number',
                    description: 'The IMDb rating of the series',
                },
            },
            example: {
                title: 'Game of Thrones',
                photoSrc: 'https://example.com/game-of-thrones.jpg',
                releaseYear: 2011,
                ratingImdb: 9.3,
            },
        },
        Episode: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'The auto-generated id of the episode',
                },
                title: {
                    type: 'string',
                    description: 'The title of the episode',
                },
                duration: {
                    type: 'string',
                    description: 'The duration of the episode',
                },
            },
            example: {
                id: 1,
                title: 'Winter Is Coming',
                duration: '60 minutes',
            },
        },
        EpisodePost: {
            type: 'object',
            required: ['title', 'duration'],
            properties: {
                title: {
                    type: 'string',
                    description: 'The title of the episode',
                },
                duration: {
                    type: 'string',
                    description: 'The duration of the episode',
                },
            },
            example: {
                title: 'Winter Is Coming',
                duration: '60 minutes',
            },
        },
        EpisodePatch: {
            type: 'object',
            properties: {
                title: {
                    type: 'string',
                    description: 'The title of the episode',
                },
                duration: {
                    type: 'string',
                    description: 'The duration of the episode',
                },
            },
            example: {
                title: 'Winter Is Coming',
                duration: '60 minutes',
            },
        },
        UserFavoriteGenre: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'ID of the user genre relation',
                },
                userId: {
                    type: 'number',
                    description: 'ID of the user',
                },
                genreId: {
                    type: 'number',
                    description: 'ID of the genre',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date and time when the relation was created',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date and time when the relation was last updated',
                },
            },
        },
        UserFavoriteSerie: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'ID of the user serie relation',
                },
                userId: {
                    type: 'number',
                    description: 'ID of the user',
                },
                serieId: {
                    type: 'number',
                    description: 'ID of the serie',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date and time when the relation was created',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date and time when the relation was last updated',
                },
            },
        },
        UserFavoriteEpisode: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'ID of the user episode relation',
                },
                userId: {
                    type: 'number',
                    description: 'ID of the user',
                },
                episodeId: {
                    type: 'number',
                    description: 'ID of the episode',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date and time when the relation was created',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date and time when the relation was last updated',
                },
            },
        },
        userSeasonFavorite: {
            type: 'object',
            properties: {
                id: {
                    type: 'number',
                    description: 'ID of the user season relation',
                },
                userId: {
                    type: 'number',
                    description: 'ID of the user',
                },
                seasonId: {
                    type: 'number',
                    description: 'ID of the season',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date and time when the relation was created',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Date and time when the relation was last updated',
                },
            },
        },
    },
};
