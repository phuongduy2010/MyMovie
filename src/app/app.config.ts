import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { OMDB_API_KEY, omdbInterceptor } from './core/services/auth.interceptor';
import { environment } from './environment';
import { errorLoggingInterceptor } from './core/services/logging.interceptor';
import { resultInterceptor } from './core/services/result.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    {provide: OMDB_API_KEY, useValue: environment.omdbApiKey},
    provideHttpClient(
      // functional interceptors
      withInterceptors([omdbInterceptor, resultInterceptor, errorLoggingInterceptor]),
      // class-based interceptors
      withInterceptorsFromDi(),
  ),
    provideRouter(routes)
  ]
};
