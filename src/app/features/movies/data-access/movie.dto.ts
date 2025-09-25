export interface MovieDto {
  Title: string;
  Year?: string;
  imdbID: string;
  Type: string;
  Poster: string; // can be "N/A"
}

export interface SearchResponseDto {
  Search?: MovieDto[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}

export interface MovieDetailDto extends MovieDto {
  imdbRating: string;
  Rated: string;
  Plot: string;
}