import { Routes } from '@angular/router';
import { MovieComponent } from './features/movies/components/movie-component/movie-component';
import { MovieDetailComponent } from './features/movies/components/movie-detail-component/movie-detail-component';


export const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' }
];
