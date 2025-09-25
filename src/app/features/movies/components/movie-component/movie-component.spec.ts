// import 'zone.js/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie-component';
import { provideZonelessChangeDetection } from '@angular/core';
import { MovieService } from '../../service.ts/movie.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SearchResponse } from '../../data-access/movie.model';
import { ApiResult } from '../../../../core/api/api.response';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

const mapped: SearchResponse = {
      items: [{ id: 'tt0145487', title: 'Spider-Man', type: 'movie' }],
      totalCount: 1,
      isSuccess: true,
    };
const okResult: ApiResult<SearchResponse> = { ok: true, data: mapped } as const;
const movieServiceSpy = jasmine.createSpyObj<MovieService>('MovieService', {
  getMovies: of(okResult)
});
describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => movieServiceSpy.getMovies.calls.reset());
  it('ngOnInit: calls getMovies("SpiderMan") and sets movies + loading=false (success)', () => {
    // Act
    const fixture = TestBed.createComponent(MovieComponent);
    const cmp = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit -> searchMovies('SpiderMan')

    // Assert
    expect(movieServiceSpy.getMovies).toHaveBeenCalledWith('SpiderMan');
    expect(cmp.moviesState()).toEqual(mapped.items);
    expect(cmp.loading()).toBeFalse();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
