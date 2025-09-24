import { Routes } from '@angular/router';
import { MovieDetailComponent } from './movie-detail-component/movie-detail-component';
import { MovieComponent } from './movie-component/movie-component';

export const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'movie/:id', component: MovieDetailComponent },
  { path: '**', redirectTo: '' }
];
