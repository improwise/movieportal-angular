import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../movie.service';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SearchComponent } from '../search/search.component';
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, SearchComponent],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  private movieService = inject(MovieService);
  movies: Movie[] = [];

  ngOnInit(): void {
    this.loadPopularMovies();
  }

  loadPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe({
      next: (data: { results: Movie[] }) => {
        this.movies = data.results;
      },
      error: (error) => console.error('Error fetching popular movies:', error)
    });
  }

  onSearch(query: string): void {
    if (query) {
      this.movieService.searchMovies(query).subscribe({
        next: (data: { results: Movie[] }) => {
          this.movies = data.results;
        },
        error: (error) => console.error('Error searching movies:', error)
      });
    } else {
      this.loadPopularMovies();
    }
  }
}