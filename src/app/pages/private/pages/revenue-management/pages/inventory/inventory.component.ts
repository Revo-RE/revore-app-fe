import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  private readonly route = inject(ActivatedRoute);

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
  stage_filter = '';
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

  /** Fases/torres distintas presentes en las unidades del proyecto (para el filtro). */
  get availableStages(): string[] {
    const stages = new Set<string>();
    for (const u of this.units()) {
      const s = (u.stage || '').trim();
      if (s) stages.add(s);
    }
    return Array.from(stages).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }

  /** Unidades a listar en el selector, filtradas por fase si hay una elegida.
   * Existe para desambiguar unidades con el mismo número en distintas torres/fases. */
  get filteredUnits(): UnitRow[] {
    if (!this.stage_filter) return this.units();
    return this.units().filter(u => (u.stage || '') === this.stage_filter);
  }

  unitLabel(u: UnitRow): string {
    const parts = [u.unit_number || 'S/N'];
    if (u.stage) parts.push(u.stage);
    if (u.typology) parts.push(u.typology);
    if (u.status) parts.push(u.status);
    return parts.join(' · ');
  }

  ngOnInit(): void {
    this.svc.catalog().subscribe({
      next: cat => {
        this.catalog.set(cat);
        this.applyPreselection();
      },
      error: () => this.error.set('No se pudo cargar el catálogo de proyectos.'),
    });
    this.reloadOperations();
  }

  /** Precarga el contexto cuando se llega desde la Vista de Torre
   * (?project_id=…&unit_id=…&stage=…) para no volver a capturarlo a mano. */
  private applyPreselection(): void {
    const qp = this.route.snapshot.queryParamMap;
    const projectId = qp.get('project_id');
    const unitId = qp.get('unit_id');
    if (!projectId) return;

    const cat = this.catalog();
    const project = cat?.projects.find(p => p.id === projectId);
    if (!project) return;

    this.developer_id = project.developer_id || '';
    this.project_id = project.id;
    this.stage_filter = qp.get('stage') || '';

    // Las unidades llegan por separado: se fija la unidad al terminar la carga.
    this.loadingUnits.set(true);
    this.svc.units(project.id).subscribe({
      next: rows => {
        this.units.set(rows);
        this.loadingUnits.set(false);
        if (unitId && rows.some(u => u.id === unitId)) {
          this.unit_id = unitId;
          this.onUnitChange();
        }
      },
      error: () => {
        this.error.set('No se pudieron cargar las unidades del proyecto.');
        this.loadingUnits.set(false);
      },
    });
  }

  onDeveloperChange(): void {
    this.project_id = '';
    this.stage_filter = '';
    this.unit_id = '';
    this.units.set([]);
  }

  onProjectChange(): void {
    this.stage_filter = '';
    this.unit_id = '';
    this.loadUnits();
  }

  onStageFilterChange(): void {
    // Si la unidad elegida ya no aplica al filtrar por fase, se limpia.
    if (this.unit_id && !this.filteredUnits.some(u => u.id === this.unit_id)) {
      this.unit_id = '';
    }
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
    this.stage_filter = '';
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
