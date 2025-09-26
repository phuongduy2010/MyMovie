import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, finalize, throwError } from "rxjs";

export const errorLoggingInterceptor : HttpInterceptorFn = (req, next) => {
    const t0 = performance.now();
    return next(req).pipe(
        catchError((err: HttpErrorResponse) =>{
            console.error(`[HTTP] ${req.method} ${req.urlWithParams}`, err.status, err.message);
            return throwError(()=> err);
        }),
        finalize(()=>{
            const ms = Math.round(performance.now() - t0);
            console.log(`[HTTP] ${req.method} ${req.urlWithParams} - ${ms}ms`);
        })
    )
}