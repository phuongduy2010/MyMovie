import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, OmdbSearchResponse } from '../models/movie';
import { MovieDetail } from '../models/movie-detail';


@Injectable({ providedIn: 'root' })
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovies(term: string): Observable<Movie[]> {
    const url = `https://www.omdbapi.com/?apikey=fe2f6c44&s=${encodeURIComponent(term)}`;
    return this.http.get<OmdbSearchResponse>(url).pipe(
      map(res => Array.isArray(res.Search) ? res.Search : [])
    );
  }

  getMovieDetail(id: string): Observable<MovieDetail> {
    const url = `https://www.omdbapi.com/?apikey=fe2f6c44&i=${id}&plot=full}`;
    return this.http.get<MovieDetail>(url).pipe(
      map(res => res as MovieDetail)
    );
  }
}