import { inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import { AuthService } from './auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);

  // Rutas que NO deben llevar Authorization ni disparar refresh
  if (
    req.url.includes('/login') ||
    req.url.includes('/register') ||
    req.url.includes('/email_verification') ||
    req.url.includes('/resend_verification_email') || // 👈 añadido
    req.url.includes('/refresh-token')
  ) {
    return next(req);
  }

  const token = authService.getToken();
  const authReq = token ? addToken(req, token) : req;

  return next(authReq).pipe(
    catchError((error: any) => {
      // Si no es 401, dejamos que el error siga su curso
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // Si no hay refresh token, cerramos sesión
      if (!authService.getRefreshToken()) {
        authService.logout();
        return throwError(() => error);
      }

      // Si YA se está refrescando, nos enganchamos a ese proceso
      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter((t) => t != null),
          take(1),
          switchMap((newToken) => {
            const retryReq = addToken(req, newToken as string);
            return next(retryReq);
          })
        );
      }

      // Primer 401: disparamos refresh-token
      isRefreshing = true;
      refreshTokenSubject.next(null);

      return authService.refreshToken(true).pipe(
        switchMap((res) => {
          // refresh-token OK → actualizamos flag y notificamos el nuevo token
          isRefreshing = false;
          refreshTokenSubject.next(res.access_token);

          const retryReq = addToken(req, res.access_token);
          return next(retryReq);
        }),
        catchError((refreshError) => {
          // Si el refresh falla → logout y propagamos el error
          isRefreshing = false;
          authService.logout();
          return throwError(() => refreshError);
        })
      );
    })
  );
};

function addToken(
  req: HttpRequest<unknown>,
  token: string
): HttpRequest<unknown> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
