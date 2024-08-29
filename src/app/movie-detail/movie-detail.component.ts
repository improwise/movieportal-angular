import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../movie.service';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon'; // Add this import
import { Movie, Genre } from '../models/movie.model';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule, MatChipsModule, MatIconModule], // Add MatIconModule here
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);
  movie: Movie | null = null;

  get topCastMembers(): string {
    return this.movie?.credits.cast.slice(0, 5).map(actor => actor.name).join(', ') || '';
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovieDetails(+id).subscribe({
        next: (data: Movie) => {
          this.movie = data;
        },
        error: error => console.error('Error fetching movie details:', error)
      });
    }
  }
}