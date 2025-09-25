// import { HttpClient, HttpErrorResponse } from "@angular/common/http";
// import { catchError, map, Observable, of, throwError } from "rxjs";
// import { MovieDetail, SearchResponse } from "./movie.model";
// import { MovieDetailDto, SearchResponseDto } from "./movie.dto";
// import { mapSearchResponse, mapToMovieDetail } from "./movie.mapper";

// export class MovieService {
//   constructor(private http: HttpClient) {}

//   getMovies(term: string): Observable<SearchResponse> {
//     const url = `https://www.omdbapi.com/?apikey=fe2f6c44&s=${encodeURIComponent(term)}`;
//     return this.http.get<SearchResponseDto>(url).pipe(
//         map(mapSearchResponse), catchError((error: HttpErrorResponse) => throwError(() => error))
//     );
//   }

//   getMovieDetail(id: string): Observable<MovieDetail> {
//     const url = `https://www.omdbapi.com/?apikey=fe2f6c44&i=${id}&plot=full}`;
//     return this.http.get<MovieDetailDto>(url).pipe(
//       map(mapToMovieDetail), catchError((error: HttpErrorResponse) => throwError(() => error))
//     );
//   }
// }