import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, of } from "rxjs";
import { MovieDetail, SearchResponse } from "../data-access/movie.model";
import { movieMapper } from "../data-access/movie.mapper";
import { MovieDetailDto, SearchResponseDto } from "../data-access/movie.dto";
import { ApiResult, toApiError } from "../../../core/api/api.response";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class MovieService {
    constructor(private http: HttpClient) { }
    getMovies(term: string): Observable<ApiResult<SearchResponse>> {
        const url = `https://www.omdbapi.com/?apikey=fe2f6c44&s=${encodeURIComponent(term)}`;
        return this.http.get<SearchResponseDto>(url).pipe(
            map(dto => ({ ok: true as const, data: movieMapper.mapSearchResponse(dto) })),
            catchError(err => of({ ok: false as const, error: toApiError(err) }))
        );
    }

    getMovieDetail(id: string): Observable<ApiResult<MovieDetail>> {
        const url = `https://www.omdbapi.com/?apikey=fe2f6c44&i=${id}&plot=full`;
        return this.http.get<MovieDetailDto>(url).pipe(
            map(dto => ({ ok: true as const, data: movieMapper.mapToMovieDetail(dto) })),
            catchError(err => of({ ok: false as const, error: toApiError(err) }))
        );
    }
}