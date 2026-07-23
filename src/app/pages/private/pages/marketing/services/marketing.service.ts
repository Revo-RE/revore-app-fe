import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environments.local';
import { Observable } from 'rxjs';
import { MarketingPhoto } from '../models/photo.model';

@Injectable({ providedIn: 'root' })
export class MarketingService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.revore.backendUrl}/api/marketing`;

  photos(): Observable<MarketingPhoto[]> {
    return this.http.get<MarketingPhoto[]>(`${this.base}/photos`);
  }

  upload(files: File[]): Observable<MarketingPhoto[]> {
    const form = new FormData();
    for (const f of files) form.append('files', f, f.name);
    return this.http.post<MarketingPhoto[]>(`${this.base}/photos`, form);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/photos/${id}`);
  }
}
