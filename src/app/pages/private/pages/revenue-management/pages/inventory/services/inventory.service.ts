import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environments.local';
import { Observable } from 'rxjs';
import {
  InventoryCatalog,
  InventoryOperation,
  InventorySummary,
  OperationCreate,
  SalesSummary,
  TowersView,
  UnitRow,
} from '../models/inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.revore.backendUrl}/api/inventory`;

  summary(): Observable<InventorySummary> {
    return this.http.get<InventorySummary>(`${this.base}/summary`);
  }

  sales(from?: string, to?: string): Observable<SalesSummary> {
    const params: Record<string, string> = {};
    if (from) params['from'] = from;
    if (to) params['to'] = to;
    return this.http.get<SalesSummary>(`${this.base}/sales`, { params });
  }

  catalog(): Observable<InventoryCatalog> {
    return this.http.get<InventoryCatalog>(`${this.base}/catalog`);
  }

  units(projectId: string): Observable<UnitRow[]> {
    return this.http.get<UnitRow[]>(`${this.base}/units`, { params: { project_id: projectId } });
  }

  /** Inventario agrupado por torre y nivel para la vista tipo stacking plan. */
  towers(projectId: string): Observable<TowersView> {
    return this.http.get<TowersView>(`${this.base}/towers`, {
      params: { project_id: projectId },
    });
  }

  operations(): Observable<InventoryOperation[]> {
    return this.http.get<InventoryOperation[]>(`${this.base}/operations`);
  }

  createOperation(body: OperationCreate): Observable<InventoryOperation> {
    return this.http.post<InventoryOperation>(`${this.base}/operations`, body);
  }
}
