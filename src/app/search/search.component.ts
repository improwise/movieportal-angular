import { Component, Output, EventEmitter, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() search = new EventEmitter<string>();
  query = signal('');

  onQueryChange(newQuery: string) {
    this.query.set(newQuery);
    this.search.emit(newQuery);
  }

  clearSearch(): void {
    this.query.set('');
    this.search.emit('');
  }
}