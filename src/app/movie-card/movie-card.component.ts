import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'; // Add this import
import { Movie } from '../models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIconModule], // Add MatIconModule here
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input({ required: true }) movie!: Movie;

  getGenres(): string {
    return this.movie.genres.map((genre) => genre.name).join(', ');
  }
}
