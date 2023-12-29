import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { AuthService } from '../controllers/services/auth/auth.service';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class HttpExceptionNotifier {
  private subject = new Subject<any>();

  constructor() {}

  public emitirError(error: any): void {
    this.subject.next(error);
  }

  public escuchar(): Observable<any> {
    return this.subject.asObservable();
  }
}

@Injectable({
  providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(
    private readonly authService: AuthService,
    private readonly httpExceptionNotifier: HttpExceptionNotifier,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const options: any = {
      withCredentials: true,
      headers: req.headers.set('modulos', this.authService.getModulos()),
    };

    const refreshToken = req.url.includes('refresh');

    return next.handle(req.clone(options)).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (!refreshToken) {
            return this.handle401Error(req, next, options);
          }

          this.authService.cerrarSesion().then((res) => {
            this.router.navigateByUrl('/auth/sesion-expirada');
          });
        }

        if (error.status === 403) {
          this.router.navigateByUrl('/acceso-denegado');
        }

        if (!(error.error instanceof Blob)) {
          this.httpExceptionNotifier.emitirError(error);
        }

        return throwError(() => error);
      })
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
    options: any
  ) {
    return this.authService.refresh().pipe(
      switchMap(() => {
        return next.handle(req.clone(options));
      })
    );
  }
}
