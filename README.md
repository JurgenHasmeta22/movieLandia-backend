# MovieLandia Backend

MovieLandia Backend is a REST API for managing movies and related entities such as series, genres, and episodes. Built using Fastify for a fast and efficient server, with EJS for server-side rendering.

## Features

-   Fastify-based server for high performance
-   EJS for server-side rendering
-   Prisma ORM for database interactions
-   JWT authentication
-   Swagger for API documentation

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/movielandia-backend.git
    cd movielandia-backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up the database:**

    Configure your `.env` file with your database connection details and other environment variables:

    ```plaintext
    DATABASE_URL="your_database_url"
    MY_SECRET="your_jwt_secret"
    ```

4. **Apply Prisma migrations:**

    ```bash
    npx prisma migrate dev
    ```

## Running the Project

1. **Start the development server:**

    ```bash
    npm run dev
    ```

2. **Open your browser:**

    Navigate to `http://localhost:4000` to see the application in action.

## Project Structure

```plaintext
├── src
│   ├── routes
│   │   ├── auth.routes.ts
│   │   ├── episode.routes.ts
│   │   ├── genre.routes.ts
│   │   ├── movie.routes.ts
│   │   ├── serie.routes.ts
│   │   ├── user.routes.ts
│   │   └── views.routes.ts
│   ├── views
│   │   ├── layouts
│   │   │   └── MainLayout.ejs
│   │   └── other_views.ejs
│   ├── app.ts
│   └── plugins
│       └── auth.decorators.ts
├── public
│   ├── styles
│   │   ├── tailwind.css
│   │   └── style.css
│   └── other_public_files
├── prisma
│   ├── schema.prisma
│   └── migrations
├── .env
└── package.json
```

## Environment Variables

Ensure you set up the following environment variables in your `.env` file:

-   `DATABASE_URL`: Your database connection string
-   `MY_SECRET`: Secret key for JWT

## API Documentation

Swagger documentation is available at `http://localhost:4000/api-docs` once the server is running.

## Available Scripts

-   **`npm run dev`**: Starts the development server with nodemon.
-   **`npm run start`**: Starts the server without nodemon.
-   **`npm run tailwind:css`**: Compiles Tailwind CSS.
-   **`npm run pretty`**: Formats the code using Prettier.

```

```
