import { HttpInterceptorFn } from "@angular/common/http";
import { inject, InjectionToken } from "@angular/core";

export const OMDB_API_KEY = new InjectionToken<string>('OMDB_API_KEY');

export const omdbInterceptor : HttpInterceptorFn = (req, next) => {
    if(req.url.includes('omdbapi.com')){
        const key = inject(OMDB_API_KEY);
        req = req.clone({setParams: {apikey : key}});
    }
    return next(req);
}