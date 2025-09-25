import { HttpErrorResponse } from "@angular/common/http";

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: ApiError };
export type ApiError = { status: number; message: string; details?: any };

export function toApiError(err: HttpErrorResponse): ApiError {
  return {
    status: err.status,
    message: err.error?.message || err.message || 'Request failed',
    details: err.error
  };
}