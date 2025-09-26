// result.interceptor.ts
import { HttpContextToken, HttpInterceptorFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { toApiError } from '../api/api.response';


export const resultInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(
    map(event => {
      if (!(event instanceof HttpResponse)) return event;
      // success -> wrap the body as { ok:true, data: body }
      return event.clone({ body: { ok: true as const, data: event.body } });
    }),
    catchError((e: HttpErrorResponse) => {
      // convert error channel into a successful HttpResponse carrying {ok:false}
      return of(new HttpResponse({ body: ({ ok: false as const, error: toApiError(e) }), url: req.urlWithParams, status: 200 }));
    })
  );
};
