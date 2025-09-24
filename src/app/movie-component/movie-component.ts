import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movieService';


@Component({
  selector: 'app-movie-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './movie-component.html',
  styleUrl: './movie-component.css'
})
export class MovieComponent implements OnInit {
   searchTerm: string = '';
   movies: Array<Movie> = [];
   moviesState = signal<Movie[]>([]);
   loading = signal(false);
   constructor(private movieSvc: MovieService) {}
    ngOnInit(): void {
        this.searchMovies('SpiderMan');
    }

   searchMovies(title: string): void {
        this.loading.set(true);
        this.movieSvc.getMovies(title).subscribe(response => {
            this.loading.set(false);
            this.moviesState.set(response || []);
        });
   }

   onSearch(): void {
        if (this.searchTerm.trim()) {
            this.searchMovies(this.searchTerm);
        }
    }
}
