import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CatalogAdvisor,
  InventoryCatalog,
  InventoryOperation,
  NEGOCIO_LABELS,
  Negocio,
  OPERACION_LABELS,
  OPERATION_TYPE_LABELS,
  Operacion,
  UnitRow,
} from './models/inventory.model';
import { InventoryService } from './services/inventory.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss',
})
export class InventoryComponent implements OnInit {
  private readonly svc = inject(InventoryService);

  readonly catalog = signal<InventoryCatalog | null>(null);
  readonly units = signal<UnitRow[]>([]);
  readonly operations = signal<InventoryOperation[]>([]);
  readonly loadingUnits = signal(false);
  readonly saving = signal(false);
  readonly error = signal<string | null>(null);
  readonly successOp = signal<InventoryOperation | null>(null);

  readonly typeLabels = OPERATION_TYPE_LABELS;
  readonly negocioLabels = NEGOCIO_LABELS;
  readonly operacionLabels = OPERACION_LABELS;
  readonly negocioOptions: Negocio[] = ['venta', 'renta'];
  readonly operacionOptions: Operacion[] = ['apartado', 'cierre', 'cancelacion'];

  // ── Selección de contexto ──
  developer_id = '';
  project_id = '';
  unit_id = '';

  // ── Formulario ──
  form = {
    negocio: '' as Negocio | '',
    operacion: '' as Operacion | '',
    fecha: '',
    amount: null as number | null,
    advisor_id: '',
    advisor_name: '',
  };

  get developerProjects() {
    const cat = this.catalog();
    if (!cat || !this.developer_id) return [];
    return cat.projects.filter(p => p.developer_id === this.developer_id);
  }

  get projectAdvisors(): CatalogAdvisor[] {
    const cat = this.catalog();
    // El asesor depende del proyecto: sin proyecto no se listan asesores.
    if (!cat || !this.project_id) return [];
    const own = cat.advisors.filter(a => a.project_id === this.project_id);
    // Descarta entradas basura y nombres duplicados
    const seen = new Set<string>();
    const clean: CatalogAdvisor[] = [];
    for (const a of own) {
      const name = (a.name || '').trim();
      if (!name || this.isJunkAdvisor(name)) continue;
      const key = name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      clean.push(a);
    }
    return clean.sort((x, y) => (x.name || '').localeCompare(y.name || ''));
  }

  private isJunkAdvisor(name: string): boolean {
    const n = name.toLowerCase();
    return n === 'otro' || n === 'sin asesor' || n.startsWith('id:');
  }

  get projectName(): string {
    return this.developerProjects.find(p => p.id === this.project_id)?.name || '';
  }

  get selectedUnit(): UnitRow | null {
    return this.units().find(u => u.id === this.unit_id) ?? null;
  }

  unitLabel(u: UnitRow): string {
    const parts = [u.unit_number || 'S/N'];
    if (u.typology) parts.push(u.typology);
    if (u.status) parts.push(u.status);
    return parts.join(' · ');
  }

  ngOnInit(): void {
    this.svc.catalog().subscribe({
      next: cat => this.catalog.set(cat),
      error: () => this.error.set('No se pudo cargar el catálogo de proyectos.'),
    });
    this.reloadOperations();
  }

  onDeveloperChange(): void {
    this.project_id = '';
    this.unit_id = '';
    this.units.set([]);
  }

  onProjectChange(): void {
    this.unit_id = '';
    this.loadUnits();
  }

  onUnitChange(): void {
    // Pre-llena el precio con el de lista de la unidad seleccionada
    const u = this.selectedUnit;
    if (u && (this.form.amount === null || this.form.amount === 0)) {
      this.form.amount = u.price ?? null;
    }
  }

  onAdvisorChange(): void {
    if (this.form.advisor_id !== '__manual__') this.form.advisor_name = '';
  }

  loadUnits(): void {
    if (!this.project_id) { this.units.set([]); return; }
    this.loadingUnits.set(true);
    this.svc.units(this.project_id).subscribe({
      next: rows => { this.units.set(rows); this.loadingUnits.set(false); },
      error: () => {
        this.error.set('No se pudieron cargar las unidades del proyecto.');
        this.loadingUnits.set(false);
      },
    });
  }

  reloadOperations(): void {
    this.svc.operations().subscribe({
      next: ops => this.operations.set(ops),
      error: () => {},
    });
  }

  get formValid(): boolean {
    const manualOk =
      this.form.advisor_id !== '__manual__' || !!this.form.advisor_name.trim();
    return !!(
      this.unit_id &&
      this.form.negocio &&
      this.form.operacion &&
      this.form.fecha &&
      this.form.amount !== null &&
      this.form.amount >= 0 &&
      manualOk
    );
  }

  resetForm(): void {
    this.developer_id = '';
    this.project_id = '';
    this.unit_id = '';
    this.units.set([]);
    this.form = {
      negocio: '',
      operacion: '',
      fecha: '',
      amount: null,
      advisor_id: '',
      advisor_name: '',
    };
  }

  submit(): void {
    const unit = this.selectedUnit;
    if (!unit || !this.formValid || this.saving()) return;
    this.saving.set(true);
    this.error.set(null);

    const isManual = this.form.advisor_id === '__manual__';
    this.svc.createOperation({
      project_id: this.project_id,
      unit_id: unit.id,
      negocio: this.form.negocio as Negocio,
      operacion: this.form.operacion as Operacion,
      fecha: this.form.fecha,
      amount: this.form.amount ?? 0,
      advisor_id: isManual ? null : (this.form.advisor_id || null),
      advisor_name: isManual ? this.form.advisor_name.trim() : undefined,
    }).subscribe({
      next: op => {
        this.saving.set(false);
        this.successOp.set(op);
        this.resetForm();
        this.reloadOperations();
      },
      error: err => {
        this.saving.set(false);
        this.error.set(err?.error?.detail || 'No se pudo registrar la operación.');
      },
    });
  }

  closeSuccess(): void {
    this.successOp.set(null);
  }

  statusClass(value: string | null | undefined): string {
    const v = (value || '').toUpperCase();
    if (v === 'VENDIDO' || v === 'VENTA' || v === 'RENTA' || v === 'RENTADO') return 'st--ok';
    if (v === 'APARTADO') return 'st--warn';
    if (v === 'CANCELACION' || v === 'CANCELADO') return 'st--err';
    if (v === 'DISPONIBLE') return 'st--ink';
    return 'st--mut';
  }
}
