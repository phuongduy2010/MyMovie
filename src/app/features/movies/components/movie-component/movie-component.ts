import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Movie } from '../../data-access/movie.model';
import { MovieService } from '../../service.ts/movie.service';



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
            if(response.ok){
                this.moviesState.set(response.data.items || []);
            }
            this.loading.set(false);
        });
   }

   onSearch(): void {
        if (this.searchTerm.trim()) {
            this.searchMovies(this.searchTerm);
        }
    }
}
