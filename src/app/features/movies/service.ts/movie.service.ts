import { HttpClient } from "@angular/common/http";
import { map, Observable, of } from "rxjs";
import { MovieDetail, SearchResponse } from "../data-access/movie.model";
import { movieMapper } from "../data-access/movie.mapper";
import { MovieDetailDto, SearchResponseDto } from "../data-access/movie.dto";
import { ApiResult, toApiError } from "../../../core/api/api.response";
import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class MovieService {
    constructor(private http: HttpClient) { }
    getMovies(term: string): Observable<ApiResult<SearchResponse>> {
        const url = `https://www.omdbapi.com/?s=${encodeURIComponent(term)}`;
        return this.http.get<ApiResult<SearchResponseDto>>(url).pipe(
            map(result => result.ok ? ({ ok: true as const, data: movieMapper.mapSearchResponse(result.data) }): result),
        );
    }

    getMovieDetail(id: string): Observable<ApiResult<MovieDetail>> {
        const url = `https://www.omdbapi.com/?i=${id}&plot=full`;
        return this.http.get<ApiResult<MovieDetailDto>>(url).pipe(
            map(result => result.ok ? ({ ok: true as const, data: movieMapper.mapToMovieDetail(result.data) }) : result),
        );
    }
}