import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
  InventoryCatalog,
  Tower,
  TowerColorMode,
  TowerMatrix,
  TowerMatrixRow,
  TowerUnit,
  TowersView,
} from '../inventory/models/inventory.model';
import { InventoryService } from '../inventory/services/inventory.service';

/**
 * Vista Torre — stacking plan del inventario.
 *
 * Pinta el inventario como un corte de la torre: un renglón por nivel y un
 * chip por unidad, con el piso más alto arriba. Dos modos de color:
 *   · estatus  — verde disponible / ámbar apartado / navy vendido
 *   · heatmap  — escala por precio/m² para leer dónde está el precio caro
 *
 * Los datos vienen de GET /api/inventory/towers, que ya entrega el arreglo
 * agrupado por torre y nivel más el rango de precio/m² del proyecto.
 */
@Component({
  selector: 'app-tower-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tower-view.component.html',
  styleUrl: './tower-view.component.scss',
})
export class TowerViewComponent implements OnInit {
  private readonly svc = inject(InventoryService);
  private readonly router = inject(Router);

  readonly catalog = signal<InventoryCatalog | null>(null);
  readonly view = signal<TowersView | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  /** Unidad con el tooltip abierto (se fija al hacer clic, se mueve al hover). */
  readonly hovered = signal<TowerUnit | null>(null);

  // ── Controles ──
  developer_id = '';
  project_id = '';
  colorMode = signal<TowerColorMode>('status');
  typologyFilter = signal<string>('');

  get developerProjects() {
    const cat = this.catalog();
    if (!cat || !this.developer_id) return [];
    return cat.projects.filter(p => p.developer_id === this.developer_id);
  }

  get projectName(): string {
    return this.developerProjects.find(p => p.id === this.project_id)?.name || '';
  }

  /** Torres a pintar; si hay filtro de tipología se ocultan las demás unidades. */
  readonly towers = computed<Tower[]>(() => {
    const v = this.view();
    if (!v) return [];
    const typology = this.typologyFilter();
    if (!typology) return v.towers;
    return v.towers
      .map(t => ({
        ...t,
        levels: t.levels
          .map(l => ({ ...l, units: l.units.filter(u => u.typology === typology) }))
          .filter(l => l.units.length > 0),
      }))
      .filter(t => t.levels.length > 0);
  });

  /**
   * Matriz nivel × tipología por torre.
   *
   * Las columnas son las tipologías presentes en la torre y las filas los
   * niveles, de modo que se pueda leer en vertical (todas las unidades de una
   * tipología a lo largo de la torre) y en horizontal (qué hay en cada piso).
   * Las celdas vacías quedan visibles a propósito: un hueco es información.
   */
  readonly matrices = computed<TowerMatrix[]>(() =>
    this.towers().map(tower => {
      // Columnas: tipologías presentes en esta torre, en orden alfabético.
      const columns = Array.from(
        new Set(
          tower.levels
            .flatMap(l => l.units)
            .map(u => (u.typology || '').trim())
            .filter(Boolean),
        ),
      ).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

      const rows: TowerMatrixRow[] = tower.levels.map(l => ({
        level: l.level,
        cells: columns.map(typology => ({
          typology,
          // Puede haber más de una unidad de la misma tipología en un nivel.
          units: l.units.filter(u => (u.typology || '').trim() === typology),
        })),
      }));

      return { name: tower.name, units_total: tower.units_total, columns, rows };
    }),
  );

  /** grid-template-columns para la matriz: etiqueta de nivel + una por tipología. */
  gridTemplate(m: TowerMatrix): string {
    return `var(--twr-level-col) repeat(${m.columns.length}, minmax(78px, 1fr))`;
  }

  /** Conteos del proyecto para las cápsulas de resumen. */
  readonly counts = computed(() => {
    const v = this.view();
    const by = v?.por_estatus ?? {};
    const get = (...keys: string[]) =>
      keys.reduce((sum, k) => sum + (by[k] ?? 0), 0);
    return {
      total: v?.units_total ?? 0,
      disponibles: get('DISPONIBLE'),
      apartadas: get('APARTADO'),
      vendidas: get('VENDIDO', 'RENTADO'),
    };
  });

  ngOnInit(): void {
    this.svc.catalog().subscribe({
      next: cat => {
        this.catalog.set(cat);
        // Preselecciona el primer desarrollador con proyectos para que la
        // pantalla no arranque vacía.
        const firstDev = cat.developers[0];
        if (firstDev) {
          this.developer_id = firstDev.id;
          const firstProject = cat.projects.find(p => p.developer_id === firstDev.id);
          if (firstProject) {
            this.project_id = firstProject.id;
            this.loadTowers();
          }
        }
      },
      error: () => this.error.set('No se pudo cargar el catálogo de proyectos.'),
    });
  }

  onDeveloperChange(): void {
    this.project_id = '';
    this.view.set(null);
    this.typologyFilter.set('');
  }

  onProjectChange(): void {
    this.typologyFilter.set('');
    this.loadTowers();
  }

  loadTowers(): void {
    if (!this.project_id) {
      this.view.set(null);
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.svc.towers(this.project_id).subscribe({
      next: v => {
        this.view.set(v);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el inventario por torre.');
        this.loading.set(false);
      },
    });
  }

  setColorMode(mode: TowerColorMode): void {
    this.colorMode.set(mode);
  }

  // ── Presentación de la unidad ──

  /** Etiqueta completa para tooltip y lectores de pantalla. */
  unitLabel(u: TowerUnit): string {
    const num = u.unit_number || 'S/N';
    return u.typology ? `${num} · ${u.typology}` : num;
  }

  /** Texto del chip dentro de la matriz: solo el número, la tipología ya es
   * el encabezado de la columna. */
  chipLabel(u: TowerUnit): string {
    return u.unit_number || 'S/N';
  }

  levelLabel(level: number): string {
    return level > 0 ? `P${level}` : 'PB';
  }

  /** Clase de color por estatus (modo estatus). */
  statusClass(u: TowerUnit): string {
    const v = (u.status || '').toUpperCase();
    if (v === 'VENDIDO' || v === 'RENTADO') return 'is-sold';
    if (v === 'APARTADO') return 'is-reserved';
    if (v === 'DISPONIBLE') return 'is-available';
    return 'is-other';
  }

  /**
   * Color del chip en modo heatmap: interpola el precio/m² de la unidad dentro
   * del rango del proyecto sobre la escala navy del brand (claro = barato).
   */
  heatmapStyle(u: TowerUnit): Record<string, string> {
    const v = this.view();
    const value = u.price_m2;
    if (!v || !value || v.price_m2_min == null || v.price_m2_max == null) {
      return { background: '#E8E9ED', color: '#3E5170' };
    }
    const span = v.price_m2_max - v.price_m2_min;
    const t = span > 0 ? (value - v.price_m2_min) / span : 0.5;
    // Escala navy: #E8E9ED (barato) → #111B30 (caro).
    const from = { r: 232, g: 233, b: 237 };
    const to = { r: 17, g: 27, b: 48 };
    const mix = (a: number, b: number) => Math.round(a + (b - a) * t);
    const bg = `rgb(${mix(from.r, to.r)}, ${mix(from.g, to.g)}, ${mix(from.b, to.b)})`;
    return {
      background: bg,
      // Texto claro cuando el fondo ya está oscuro.
      color: t > 0.45 ? '#FFFFFF' : '#111B30',
    };
  }

  /** Percentil del precio/m² de la unidad, para el tooltip del heatmap. */
  heatmapPct(u: TowerUnit): number | null {
    const v = this.view();
    if (!v || !u.price_m2 || v.price_m2_min == null || v.price_m2_max == null) return null;
    const span = v.price_m2_max - v.price_m2_min;
    if (span <= 0) return 50;
    return Math.round(((u.price_m2 - v.price_m2_min) / span) * 100);
  }

  onUnitEnter(u: TowerUnit): void {
    this.hovered.set(u);
  }

  onUnitLeave(): void {
    this.hovered.set(null);
  }

  /** Clic en la unidad → registrar operación con la unidad ya en contexto. */
  goToOperation(u: TowerUnit): void {
    this.router.navigate(['/dashboard/revenue-management/inventory'], {
      queryParams: {
        project_id: this.project_id,
        unit_id: u.id,
        stage: u.stage || '',
      },
    });
  }
}
