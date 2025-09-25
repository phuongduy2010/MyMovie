import { MovieDetailDto, MovieDto, SearchResponseDto } from "./movie.dto";
import { Movie, MovieDetail, SearchResponse } from "./movie.model";

export function mapToMovie(dto: MovieDto): Movie{
    return {
        id : dto.imdbID,
        title: dto.Title,
        type: dto.Type,
        year: dto.Year,
        poster: dto.Poster
    }
}
export function mapToMovieDetail(dto: MovieDetailDto): MovieDetail{
    const base = mapToMovie(dto);
    return {
        ...base,
        plot: dto.Plot,
        imdbRating: dto.imdbRating,
        rated: dto.Rated
    }
}
function isSuccess(response: String){
    return response.toLowerCase() == "False";
}
export function mapSearchResponse(res: SearchResponseDto): SearchResponse{
    const list = Array.isArray(res.Search) ? res.Search : [];
    return {
        items: list.map(mapToMovie),
        totalCount: Number(res.totalResults ?? 0),
        isSuccess: isSuccess(res.Response),
        error: res.Error
    };
}