import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environments.local';
import { Observable, of, delay } from 'rxjs';
import {
  MOCK_PARAMS,
  MOCK_APPRECIATION_COLS,
  MOCK_APPRECIATION_PROCESS,
  MOCK_REVENUE_MODEL,
  MOCK_DASHBOARD,
  MOCK_DEPARTMENTS,
} from './revenue-mock.data';

/**
 * Interceptor SOLO para desarrollo local.
 *
 * Devuelve datos ficticios para los endpoints del Modelo de Revenue, tomados del
 * Excel real "Paralela.xlsx" (ver revenue-mock.data.ts), de modo que las tablas y
 * gráficas rendericen sin depender del backend legacy.
 *
 * Se activa únicamente cuando `environment.useRevenueMock === true`.
 * Para volver a consumir el API real, poner ese flag en false en
 * `environments.local.ts`. No afecta staging ni producción.
 */
@Injectable()
export class RevenueMockInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!(environment as any).useRevenueMock) {
      return next.handle(req);
    }

    const url = req.url;
    const match = (path: string) => url.includes(path);

    let body: any = null;

    if (match('/api/parameters/all')) body = MOCK_PARAMS;
    else if (match('/api/appreciations/all')) body = MOCK_APPRECIATION_COLS;
    else if (match('/api/appreciations-process/all')) body = MOCK_APPRECIATION_PROCESS;
    else if (match('/api/revenue-model/all')) body = MOCK_REVENUE_MODEL;
    else if (match('/api/dashboard/all')) body = MOCK_DASHBOARD;
    else if (match('/api/departments/all')) body = MOCK_DEPARTMENTS;

    if (body !== null) {
      // Pequeño delay para simular red y que se vean los estados de carga.
      return of(new HttpResponse({ status: 200, body })).pipe(delay(250));
    }

    return next.handle(req);
  }
}
