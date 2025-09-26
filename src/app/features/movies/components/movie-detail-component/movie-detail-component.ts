import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieDetail } from '../../data-access/movie.model';
import { MovieService } from '../../service.ts/movie.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-detail-component',
  imports: [RouterLink],
  templateUrl: './movie-detail-component.html',
  styleUrl: './movie-detail-component.css'
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  movie: MovieDetail = {} as MovieDetail;
  movieState = signal<MovieDetail>({} as MovieDetail);
  loading = signal(true);
  private movieSub?: Subscription;
  constructor(private route: ActivatedRoute, private movieService: MovieService) {}
  ngOnDestroy(): void {
    this.unsubscribe();
  }
  ngOnInit(): void {
    this.getMovie();
  }
  private unsubscribe(): void{
    this.movieSub?.unsubscribe();
  }
  private getMovie(){
    this.unsubscribe();
    const id = this.route.snapshot.paramMap.get('id');
    this.movieSub = this.movieService.getMovieDetail(id!).subscribe(response => {
      if(response.ok){
        this.movieState.set(response.data);
      }
      this.loading.set(false);
    });
  }
}
