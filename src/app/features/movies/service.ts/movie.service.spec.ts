import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { MovieService } from './movie.service';
import { MovieDetailDto, SearchResponseDto } from '../data-access/movie.dto';
import { MovieDetail, SearchResponse } from '../data-access/movie.model';
import { provideZonelessChangeDetection } from '@angular/core';
import { movieMapper } from '../data-access/movie.mapper';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MovieService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ]
    });

    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('getMovies: calls OMDb and maps success to { ok: true, data }', (done) => {
    // Arrange
    const term = 'Spider Man';
    const dto: SearchResponseDto = {
      Search: [
        { Title: 'Spider-Man', Year: '2002', imdbID: 'tt0145487', Type: 'movie', Poster: 'N/A' }
      ],
      totalResults: '1',
      Response: 'True'
    } as any;

    const mapped: SearchResponse = {
      items: [{ id: 'tt0145487', title: 'Spider-Man', type: 'movie', poster: 'N/A' }]
    } as any;

    // Spy on mapper to isolate service behavior
    spyOn(movieMapper, 'mapSearchResponse').and.returnValue(mapped);

    // Act
    service.getMovies(term).subscribe(res => {
      // Assert
      expect(res.ok).toBeTrue();
      if (res.ok) {
        expect(res.data).toEqual(mapped);
      }
      else {
        fail(`Expected ok=true, got error: ${res.error.message}`);
      }
      done();
    });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.url.startsWith('https://www.omdbapi.com/') &&
      r.urlWithParams.includes('apikey=fe2f6c44') &&
      r.urlWithParams.includes(`s=${encodeURIComponent(term)}`)
    );

    req.flush(dto);
  });

  it('getMovies: wraps HTTP error into { ok: false, error }', (done) => {
    service.getMovies('Spider').subscribe(res => {
      expect(res.ok).toBeFalse();
      if (!res.ok) {
        expect(res.error.status).toBe(500);
        expect(res.error.message).toBeTruthy();
      }
      done();
    });

    const req = httpMock.expectOne(() => true);
    req.flush({ message: 'boom' }, { status: 500, statusText: 'Server Error' });
  });

  it('getMovieDetail: calls OMDb and maps success to { ok: true, data }', (done) => {
    const id = 'tt10872600';
    const dto: MovieDetailDto = {
      Title: 'Spider-Man: No Way Home',
      Year: '2021',
      imdbID: id,
      Type: 'movie',
      Poster: 'N/A',
      Plot: 'Multiverse chaos',
      imdbRating: '8.2'
    } as any;

    const mapped: MovieDetail = {
      id,
      title: 'Spider-Man: No Way Home',
      year: 2021,
      type: 'movie',
      poster: undefined,
      plot: 'Multiverse chaos',
      imdbRating: 8.2
    } as any;

    spyOn(movieMapper, 'mapToMovieDetail').and.returnValue(mapped);

    service.getMovieDetail(id).subscribe(res => {
      expect(res.ok).toBeTrue();
      if (res.ok) {
        expect(res.data).toEqual(mapped);
      }
      done();
    });

    const req = httpMock.expectOne(r =>
      r.method === 'GET' &&
      r.urlWithParams.includes(`i=${encodeURIComponent(id)}`) &&
      r.urlWithParams.includes('plot=full')
    );
    req.flush(dto);
  });

  it('getMovieDetail: wraps HTTP error into { ok: false, error }', (done) => {
    const id = 'y.ly-id';
    service.getMovieDetail(id).subscribe(res => {
      expect(res.ok).toBeFalse();
      if (!res.ok) {
        expect(res.error.status).toBe(404);
      }
      done();
    });

    const req = httpMock.expectOne(() => true);
    req.flush({ message: 'not found' }, { status: 404, statusText: 'Not Found' });
  });
});
