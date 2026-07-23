import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InventorySummary, SalesSummary } from '../inventory/models/inventory.model';
import { InventoryService } from '../inventory/services/inventory.service';

@Component({
  selector: 'app-revenue-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './revenue-dashboard.component.html',
  styleUrl: './revenue-dashboard.component.scss',
})
export class RevenueDashboardComponent implements OnInit {
  private readonly svc = inject(InventoryService);

  readonly summary = signal<InventorySummary | null>(null);
  readonly sales = signal<SalesSummary | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  // Rango de fechas para la sección Ventas (vacío = todo el histórico)
  range = { from: '', to: '' };

  ngOnInit(): void {
    this.svc.summary().subscribe({
      next: s => { this.summary.set(s); this.loading.set(false); },
      error: () => {
        this.error.set('No se pudo cargar el resumen. Verifica que el backend esté corriendo.');
        this.loading.set(false);
      },
    });
    this.loadSales();
  }

  loadSales(): void {
    this.svc.sales(this.range.from || undefined, this.range.to || undefined).subscribe({
      next: s => this.sales.set(s),
      error: () => {},
    });
  }

  clearRange(): void {
    this.range = { from: '', to: '' };
    this.loadSales();
  }
}
