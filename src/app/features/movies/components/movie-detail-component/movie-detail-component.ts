import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieDetail } from '../../data-access/movie.model';
import { MovieService } from '../../service.ts/movie.service';

@Component({
  selector: 'app-movie-detail-component',
  imports: [RouterLink],
  templateUrl: './movie-detail-component.html',
  styleUrl: './movie-detail-component.css'
})
export class MovieDetailComponent implements OnInit {
  movie: MovieDetail = {} as MovieDetail;
  movieState = signal<MovieDetail>({} as MovieDetail);
  loading = signal(true);
  constructor(private route: ActivatedRoute, private movieService: MovieService) {}
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovieDetail(id!).subscribe(response => {
      if(response.ok){
        this.movieState.set(response.data);
      }
      this.loading.set(false);
    });
  }
}
