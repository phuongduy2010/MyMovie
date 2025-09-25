import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailComponent } from './movie-detail-component';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MovieService } from '../../service.ts/movie.service';
import { MovieDetail } from '../../data-access/movie.model';
import { ApiResult } from '../../../../core/api/api.response';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
  let component: MovieDetailComponent;
  let fixture: ComponentFixture<MovieDetailComponent>;
   const detail: MovieDetail = {
      id: 'tt10872600',
      title: 'Spider-Man: No Way Home',
      year: 2021,
      type: 'movie',
      poster: 'N/A',
      plot: 'Multiverse chaos',
      imdbRating: 8.2
    } as any;

  const okResult: ApiResult<MovieDetail> = { ok: true, data: detail } as const;
  const movieSvcSpy = jasmine.createSpyObj<MovieService>('MovieService', 
    {
      getMovieDetail: of(okResult)
    });
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailComponent],
      providers: [
          {provide: MovieService, useValue: movieSvcSpy},
          {
            provide: ActivatedRoute,
              useValue: { snapshot: { paramMap: convertToParamMap({ id: 'tt10872600' }) } }
          },
          provideZonelessChangeDetection(),
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting,
      ]
    }).compileComponents();
    
    
    fixture = TestBed.createComponent(MovieDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => movieSvcSpy.getMovieDetail.calls.reset());
  it('loads and renders movie detail for the given id', () => {
    // Act
    const fixture = TestBed.createComponent(MovieDetailComponent);
    const el: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();

    // Assert
    expect(movieSvcSpy.getMovieDetail).toHaveBeenCalledWith('tt10872600');
    expect(el.textContent).toContain('Spider-Man: No Way Home');
    expect(el.textContent).toContain('2021');
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
