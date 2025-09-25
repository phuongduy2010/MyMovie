export interface Movie {
  id: string;
  title: string;
  year?: string;
  type: string;
  poster?: string;
}

export interface MovieDetail extends Movie {
  imdbRating: string;
  rated: string;
  plot: string;
}

export interface SearchResponse {
  items: Movie[];
  totalCount: number;
  isSuccess: boolean;
  error?: string;
}