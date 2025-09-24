import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../services/movieService';
import { MovieDetail } from '../models/movie-detail';

@Component({
  selector: 'app-movie-detail-component',
  imports: [RouterLink],
  templateUrl: './movie-detail-component.html',
  styleUrl: './movie-detail-component.css'
})
export class MovieDetailComponent {
  movie: MovieDetail = {} as MovieDetail;
  movieState = signal<MovieDetail>({} as MovieDetail);
  loading = signal(true);
  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(id!).subscribe(result => {
      this.movieState.set(result);
      this.loading.set(false);
    });
  }
}
