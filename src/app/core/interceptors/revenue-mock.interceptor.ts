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
  MOCK_TOWERS,
  MOCK_TOWERS_BY_PROJECT,
  MOCK_UNITS_BY_PROJECT,
  MOCK_INVENTORY_CATALOG,
  MOCK_INVENTORY_SUMMARY,
  MOCK_INVENTORY_SALES,
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

    // OJO: req.url NO incluye el query string — Angular lo guarda aparte en
    // req.params y solo lo serializa al armar la petición real. Hay que usar
    // req.urlWithParams para poder leer project_id aquí; si se usa req.url
    // (como estaba antes), project_id siempre sale null y el mock regresa
    // catálogos/unidades vacíos sin importar el proyecto elegido.
    const url = req.urlWithParams;
    const match = (path: string) => url.includes(path);

    let body: any = null;

    if (match('/api/parameters/all')) body = MOCK_PARAMS;
    else if (match('/api/appreciations/all')) body = MOCK_APPRECIATION_COLS;
    else if (match('/api/appreciations-process/all')) body = MOCK_APPRECIATION_PROCESS;
    else if (match('/api/revenue-model/all')) body = MOCK_REVENUE_MODEL;
    else if (match('/api/dashboard/all')) body = MOCK_DASHBOARD;
    else if (match('/api/departments/all')) body = MOCK_DEPARTMENTS;
    // Vista Torre (stacking plan) — inventario agrupado por torre y nivel,
    // según el project_id que pida el frontend (cada proyecto demo tiene su
    // propio reparto de torres).
    else if (match('/api/inventory/towers')) {
      const projectId = new URL(url, 'http://mock.local').searchParams.get('project_id');
      body = (projectId && MOCK_TOWERS_BY_PROJECT[projectId]) || MOCK_TOWERS;
    }
    else if (match('/api/inventory/catalog')) body = MOCK_INVENTORY_CATALOG;
    // Unidades de un proyecto — Registrar Operaciones (selector de unidad).
    else if (match('/api/inventory/units')) {
      const projectId = new URL(url, 'http://mock.local').searchParams.get('project_id');
      body = (projectId && MOCK_UNITS_BY_PROJECT[projectId]) || [];
    }
    // Resumen de Inventario — KPIs y ventas del portafolio ficticio.
    else if (match('/api/inventory/summary')) body = MOCK_INVENTORY_SUMMARY;
    else if (match('/api/inventory/sales')) body = MOCK_INVENTORY_SALES;

    if (body !== null) {
      // Pequeño delay para simular red y que se vean los estados de carga.
      return of(new HttpResponse({ status: 200, body })).pipe(delay(250));
    }

    return next.handle(req);
  }
}
