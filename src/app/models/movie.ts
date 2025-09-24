export type MovieType = 'movie' | 'series' | 'episode' | 'game' | 'N/A';

export interface Movie {
  Title: string;
  Year?: string;
  imdbID: string;
  Type: MovieType;
  Poster: string; // can be "N/A"
}

export interface OmdbSearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
}