# MovieportalAngular

Movieportal Angular is an Angular web application for browsing and discovering movies.

Demo available at: [movieportal.improwise.com](https://movieportal.improwise.com)

## Features

- Browse popular movies
- Search for movies by title
- View detailed movie information

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Angular CLI (v18.0.1)

## Configuration

This project uses The Movie Database (TMDB) API. To run the application, you need to obtain an API key from TMDB and add it to your environment.

1. Sign up for an account at [TMDB](https://www.themoviedb.org/signup) if you haven't already.
2. Go to your [account settings](https://www.themoviedb.org/settings/api) and create a new API key.
3. Create a `.env` file in the root directory of the project.
4. Add your API key to the `.env` file.

**Note:** Never commit your API key to version control. The `.env` file should be kept local and not shared publicly.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
