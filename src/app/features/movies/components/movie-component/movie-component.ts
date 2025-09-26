import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Movie } from '../../data-access/movie.model';
import { MovieService } from '../../service.ts/movie.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-movie-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './movie-component.html',
  styleUrl: './movie-component.css'
})
export class MovieComponent implements OnInit, OnDestroy {
   searchTerm: string = '';
   movies: Array<Movie> = [];
   moviesState = signal<Movie[]>([]);
   loading = signal(false);
   private lastSearchSub?: Subscription;
   constructor(private movieSvc: MovieService) {}
    ngOnDestroy(): void {
        this.unsubscribe();
    }
    ngOnInit(): void {
        this.searchMovies('SpiderMan');
    }

   onSearch(): void {
        if (this.searchTerm.trim()) {
            this.searchMovies(this.searchTerm);
        }
    }

    private unsubscribe(): void {
        this.lastSearchSub?.unsubscribe();
    }

    private searchMovies(title: string): void {
        this.unsubscribe();
        this.loading.set(true);
        this.lastSearchSub = this.movieSvc.getMovies(title)
        .subscribe(response => {
            if(response.ok){
                this.moviesState.set(response.data.items || []);
            }
            this.loading.set(false);
        });
   }
}
