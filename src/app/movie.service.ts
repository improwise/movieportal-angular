import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from '../environments/environment';
import { Movie, Genre } from './models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private genres: Genre[] = [];
  private tmdbApiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {
    this.fetchGenres().subscribe((genres) => (this.genres = genres));
  }

  private fetchGenres(): Observable<Genre[]> {
    return this.http
      .get<{ genres: Genre[] }>(
        `${environment.tmdbApiUrl}/genre/movie/list?api_key=${this.tmdbApiKey}`
      )
      .pipe(map((response) => response.genres));
  }

  private mapGenreIdsToGenres(genreIds: number[]): Genre[] {
    return this.genres.filter((genre) => genreIds.includes(genre.id));
  }

  getPopularMovies(): Observable<{ results: Movie[] }> {
    return this.http
      .get<{ results: Movie[] }>(
        `${environment.tmdbApiUrl}/movie/popular?api_key=${this.tmdbApiKey}`
      )
      .pipe(
        map((response) => ({
          results: response.results.map((movie) => ({
            ...movie,
            genres: this.mapGenreIdsToGenres(movie.genre_ids),
          })),
        }))
      );
  }

  getMovieDetails(id: number): Observable<Movie> {
    return this.http.get<Movie>(
      `${environment.tmdbApiUrl}/movie/${id}?api_key=${this.tmdbApiKey}&append_to_response=credits,genres`
    );
  }

  searchMovies(query: string): Observable<{ results: Movie[] }> {
    return this.http
      .get<{ results: Movie[] }>(
        `${environment.tmdbApiUrl}/search/movie?api_key=${this.tmdbApiKey}&query=${query}`
      )
      .pipe(
        map((response) => ({
          results: response.results.map((movie) => ({
            ...movie,
            genres: this.mapGenreIdsToGenres(movie.genre_ids),
          })),
        }))
      );
  }
}
