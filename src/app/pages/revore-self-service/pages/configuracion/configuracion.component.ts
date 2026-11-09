import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelfServiceService } from '@revore/services/self-service.service';
import {
    DbDesarrollador, DbProyecto, MetaWithRelations, GoalType, GOAL_TYPES,
    DbCategoria, DbReferenciaPlataforma, DbOrigen, OrigenPayload,
} from '@revore/models/database.types';

/** Fila de la tabla de Orígenes con los nombres ya resueltos (evita lookups por fila en cada render). */
interface OrigenRow extends DbOrigen {
    desarrolladorId: string;
    desarrollador: string;
    proyecto: string;
    categoria: string;
    referencia: string;
    nombreNorm: string;
}

/** Valor del filtro de categoría para orígenes sin categoría asignada (los crea la ingesta de leads). */
const SIN_CATEGORIA = '__sin_categoria__';

/** Minúsculas, sin acentos y con espacios colapsados: para buscar y comparar nombres. */
function normalizar(s: string | null | undefined): string {
    return (s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim();
}

@Component({
    selector: 'app-revore-configuracion',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './configuracion.component.html',
    styleUrl: './configuracion.component.scss',
})
export class ConfiguracionComponent implements OnInit {

    isLoading = true;

    /** Sub-sección activa dentro de Configuración. 'none' muestra el selector. */
    selectedConfig: 'none' | 'metas' | 'origenes' = 'none';

    // Metas
    desarrolladores: DbDesarrollador[] = [];
    proyectos: DbProyecto[] = [];
    proyectosFiltrados: DbProyecto[] = [];
    metas: MetaWithRelations[] = [];
    metasLoading = false;
    selectedMetaDesarrolladorId = '';
    selectedMetaProyectoId = '';
    selectedMetaGoalType = '';

    showMetaModal = false;
    isEditingMeta = false;
    editingMetaId: string | null = null;
    isSavingMeta = false;
    metaError = '';
    confirmDeleteMetaId: string | null = null;
    metaForm!: FormGroup;

    readonly GOAL_TYPES = GOAL_TYPES;

    // Orígenes
    categorias: DbCategoria[] = [];
    referencias: DbReferenciaPlataforma[] = [];
    origenes: OrigenRow[] = [];
    origenesFiltrados: OrigenRow[] = [];
    origenesLoading = false;
    origenesLoaded = false;
    origenesLoadError = '';
    filtroOrigenDesarrolladorId = '';
    filtroOrigenProyectoId = '';
    filtroOrigenCategoriaId = '';
    busquedaOrigen = '';

    showOrigenModal = false;
    isEditingOrigen = false;
    editingOrigenId: string | null = null;
    isSavingOrigen = false;
    origenError = '';
    proyectosOrigenForm: DbProyecto[] = [];
    origenForm!: FormGroup;

    confirmDeleteOrigen: OrigenRow | null = null;
    isDeletingOrigen = false;
    deleteOrigenError = '';

    readonly SIN_CATEGORIA = SIN_CATEGORIA;

    constructor(private svc: SelfServiceService, private fb: FormBuilder) {}

    async ngOnInit(): Promise<void> {
        const [desarrolladores, proyectos, metas] = await Promise.all([
            this.svc.getDesarrolladores(),
            this.svc.getProyectos(),
            this.svc.getMetas(),
        ]);
        this.desarrolladores = desarrolladores;
        this.proyectos = proyectos;
        this.metas = metas;
        this.isLoading = false;
        this.buildForms();
    }

    private buildForms(): void {
        this.metaForm = this.fb.group({
            desarrollador_id: ['', Validators.required],
            Proyecto_id:      ['', Validators.required],
            goal_type:        ['Digital' as GoalType, Validators.required],
            period:           [this.currentPeriod(), Validators.required],
            Inversion:        [0, [Validators.min(0)]],
            Leads:            [0, [Validators.required, Validators.min(0)]],
            Visitas:          [0, [Validators.required, Validators.min(0)]],
            Apartados:        [0, [Validators.required, Validators.min(0)]],
            Ventas:           [0, [Validators.required, Validators.min(0)]],
        });

        // Sub-proyecto se habilita al elegir desarrollador; Referencia solo con categoría Digital.
        this.origenForm = this.fb.group({
            desarrollador_id:         ['', Validators.required],
            Proyecto_id:              [{ value: '', disabled: true }, Validators.required],
            Nombre:                   ['', [Validators.required, Validators.pattern(/\S/)]],
            Categoria_id:             ['', Validators.required],
            Referencia_plataforma_id: [{ value: '', disabled: true }],
        });
    }

    /** Primer día del mes actual en formato YYYY-MM-DD (el CHECK de la tabla lo exige). */
    private currentPeriod(): string {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    }

    proyectoNombre(id: string): string {
        return this.proyectos.find(p => p.id === id)?.Nombre ?? '—';
    }

    desarrolladorNombre(id: string): string {
        return this.desarrolladores.find(d => d.id === id)?.Desarrollador ?? '—';
    }

    desarrolladorDeProyecto(proyectoId: string): string {
        const p = this.proyectos.find(x => x.id === proyectoId);
        return p ? this.desarrolladorNombre(p.Desarrollador_id) : '—';
    }

    /** Etiqueta legible para mes (ej. "Mayo 2026"). Espera ISO YYYY-MM-DD. */
    periodLabel(iso: string): string {
        if (!iso) return '—';
        const [y, m] = iso.split('-');
        const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        return `${meses[Number(m) - 1]} ${y}`;
    }

    async onMetaDesarrolladorFilter(id: string): Promise<void> {
        this.selectedMetaDesarrolladorId = id;
        this.selectedMetaProyectoId = '';
        await this.reloadMetas();
    }

    async onMetaProyectoFilter(id: string): Promise<void> {
        this.selectedMetaProyectoId = id;
        await this.reloadMetas();
    }

    private async reloadMetas(): Promise<void> {
        this.metasLoading = true;
        this.metas = await this.svc.getMetas({
            desarrolladorId: this.selectedMetaDesarrolladorId || undefined,
            proyectoId:      this.selectedMetaProyectoId || undefined,
        });
        this.metasLoading = false;
    }

    proyectosDelFiltro(): DbProyecto[] {
        if (!this.selectedMetaDesarrolladorId) return this.proyectos;
        return this.proyectos.filter(p => p.Desarrollador_id === this.selectedMetaDesarrolladorId);
    }

    onMetaDesarrolladorChangeInForm(desarrolladorId: string): void {
        this.metaForm.patchValue({ desarrollador_id: desarrolladorId, Proyecto_id: '' });
        this.proyectosFiltrados = this.proyectos.filter(p => p.Desarrollador_id === desarrolladorId);
    }

    openCreateMeta(): void {
        this.isEditingMeta = false;
        this.editingMetaId = null;
        this.metaError = '';
        this.proyectosFiltrados = [];
        this.metaForm.reset({
            desarrollador_id: '',
            Proyecto_id: '',
            goal_type: 'Digital',
            period: this.currentPeriod(),
            Inversion: 0, Leads: 0, Visitas: 0, Apartados: 0, Ventas: 0,
        });
        this.showMetaModal = true;
    }

    openEditMeta(m: MetaWithRelations): void {
        this.isEditingMeta = true;
        this.editingMetaId = m.id;
        this.metaError = '';
        const proyecto = this.proyectos.find(p => p.id === m.Proyecto_id);
        const desarrolladorId = proyecto?.Desarrollador_id ?? '';
        this.proyectosFiltrados = this.proyectos.filter(p => p.Desarrollador_id === desarrolladorId);
        this.metaForm.patchValue({
            desarrollador_id: desarrolladorId,
            Proyecto_id:      m.Proyecto_id,
            goal_type:        m.goal_type,
            period:           m.period,
            Inversion:        m.details?.Inversion ?? 0,
            Leads:            m.details?.Leads ?? 0,
            Visitas:          m.details?.Visitas ?? 0,
            Apartados:        m.details?.Apartados ?? 0,
            Ventas:           m.details?.Ventas ?? 0,
        });
        this.showMetaModal = true;
    }

    closeMetaModal(): void {
        this.showMetaModal = false;
        this.metaError = '';
    }

    /** Normaliza al primer día del mes (el CHECK de la tabla lo exige). */
    private normalizePeriod(period: string): string {
        if (!period) return this.currentPeriod();
        const [y, m] = period.split('-');
        return `${y}-${String(m).padStart(2, '0')}-01`;
    }

    async saveMeta(): Promise<void> {
        if (this.metaForm.invalid) return;
        this.isSavingMeta = true;
        this.metaError = '';
        const v = this.metaForm.value;

        const details: Record<string, number> = {
            Leads:     Number(v.Leads),
            Visitas:   Number(v.Visitas),
            Apartados: Number(v.Apartados),
            Ventas:    Number(v.Ventas),
        };
        if (v.goal_type !== 'General') {
            details['Inversion'] = Number(v.Inversion ?? 0);
        }

        const payload = {
            Proyecto_id: v.Proyecto_id,
            goal_type:   v.goal_type as GoalType,
            period:      this.normalizePeriod(v.period),
            details:     details as any,
        };

        const { error } = this.isEditingMeta && this.editingMetaId
            ? await this.svc.updateMeta(this.editingMetaId, payload)
            : await this.svc.createMeta(payload);

        if (error) {
            this.metaError = error.message;
            this.isSavingMeta = false;
            return;
        }

        await this.reloadMetas();
        this.isSavingMeta = false;
        this.closeMetaModal();
    }

    requestDeleteMeta(id: string): void { this.confirmDeleteMetaId = id; }
    cancelDeleteMeta(): void { this.confirmDeleteMetaId = null; }

    async confirmDeleteMeta(): Promise<void> {
        if (!this.confirmDeleteMetaId) return;
        await this.svc.deleteMeta(this.confirmDeleteMetaId);
        this.metas = this.metas.filter(m => m.id !== this.confirmDeleteMetaId);
        this.confirmDeleteMetaId = null;
    }

    // ── Orígenes ──────────────────────────────────────────────────────────────

    /** Entra a la sección; los orígenes se cargan la primera vez (no frenan la carga de Metas). */
    async openOrigenes(): Promise<void> {
        this.selectedConfig = 'origenes';
        if (!this.origenesLoaded && !this.origenesLoading) {
            await this.loadOrigenes();
        }
    }

    private async loadOrigenes(): Promise<void> {
        this.origenesLoading = true;
        this.origenesLoadError = '';
        try {
            const [categorias, referencias, origenes] = await Promise.all([
                this.categorias.length ? Promise.resolve(this.categorias) : this.svc.getCategorias(),
                this.referencias.length ? Promise.resolve(this.referencias) : this.svc.getReferenciasPlataformas(),
                this.svc.getOrigenes(),
            ]);
            this.categorias = categorias;
            this.referencias = referencias;
            this.origenes = this.buildOrigenRows(origenes);
            this.origenesLoaded = true;
            this.applyOrigenFilters();
        } catch (e: any) {
            this.origenesLoadError = e?.message || 'No se pudieron cargar los orígenes.';
        } finally {
            this.origenesLoading = false;
        }
    }

    private buildOrigenRows(origenes: DbOrigen[]): OrigenRow[] {
        const proyectos = new Map(this.proyectos.map(p => [p.id, p]));
        const desarrolladores = new Map(this.desarrolladores.map(d => [d.id, d.Desarrollador]));
        const categorias = new Map(this.categorias.map(c => [c.id, c.Nombre]));
        const referencias = new Map(this.referencias.map(r => [r.id, r.Nombre]));

        return origenes.map(o => {
            const proyecto = o.Proyecto_id ? proyectos.get(o.Proyecto_id) : undefined;
            const desarrolladorId = proyecto?.Desarrollador_id ?? '';
            return {
                ...o,
                desarrolladorId,
                desarrollador: desarrolladores.get(desarrolladorId) ?? '',
                proyecto:      proyecto?.Nombre ?? '',
                categoria:     (o.Categoria_id && categorias.get(o.Categoria_id)) || '',
                referencia:    (o.Referencia_plataforma_id && referencias.get(o.Referencia_plataforma_id)) || '',
                nombreNorm:    normalizar(o.Nombre),
            };
        });
    }

    applyOrigenFilters(): void {
        const dev = this.filtroOrigenDesarrolladorId;
        const proy = this.filtroOrigenProyectoId;
        const cat = this.filtroOrigenCategoriaId;
        const q = normalizar(this.busquedaOrigen);

        this.origenesFiltrados = this.origenes.filter(o =>
            (!dev  || o.desarrolladorId === dev) &&
            (!proy || o.Proyecto_id === proy) &&
            (!cat  || (cat === SIN_CATEGORIA ? !o.Categoria_id : o.Categoria_id === cat)) &&
            (!q    || o.nombreNorm.includes(q))
        );
    }

    onOrigenDesarrolladorFilter(id: string): void {
        this.filtroOrigenDesarrolladorId = id;
        this.filtroOrigenProyectoId = '';
        this.applyOrigenFilters();
    }

    onOrigenProyectoFilter(id: string): void {
        this.filtroOrigenProyectoId = id;
        this.applyOrigenFilters();
    }

    onOrigenCategoriaFilter(id: string): void {
        this.filtroOrigenCategoriaId = id;
        this.applyOrigenFilters();
    }

    onOrigenBusqueda(texto: string): void {
        this.busquedaOrigen = texto;
        this.applyOrigenFilters();
    }

    proyectosDelFiltroOrigen(): DbProyecto[] {
        if (!this.filtroOrigenDesarrolladorId) return this.proyectos;
        return this.proyectos.filter(p => p.Desarrollador_id === this.filtroOrigenDesarrolladorId);
    }

    /** La referencia de plataforma solo aplica a la categoría Digital. */
    private esCategoriaDigital(categoriaId: string | null | undefined): boolean {
        const categoria = this.categorias.find(c => c.id === categoriaId);
        return normalizar(categoria?.Nombre) === 'digital';
    }

    onOrigenDesarrolladorChangeInForm(desarrolladorId: string): void {
        this.proyectosOrigenForm = this.proyectos.filter(p => p.Desarrollador_id === desarrolladorId);
        this.origenForm.get('Proyecto_id')!.setValue('');
        this.toggleProyectoOrigen(!!desarrolladorId);
    }

    private toggleProyectoOrigen(enabled: boolean): void {
        const proyecto = this.origenForm.get('Proyecto_id')!;
        if (enabled) proyecto.enable();
        else proyecto.disable();
    }

    onOrigenCategoriaChangeInForm(categoriaId: string): void {
        const referencia = this.origenForm.get('Referencia_plataforma_id')!;
        if (this.esCategoriaDigital(categoriaId)) {
            referencia.enable();
        } else {
            referencia.setValue('');
            referencia.disable();
        }
    }

    openCreateOrigen(): void {
        this.isEditingOrigen = false;
        this.editingOrigenId = null;
        this.origenError = '';
        this.proyectosOrigenForm = [];
        this.origenForm.reset({
            desarrollador_id: '', Proyecto_id: '', Nombre: '', Categoria_id: '', Referencia_plataforma_id: '',
        });
        this.toggleProyectoOrigen(false);
        this.origenForm.get('Referencia_plataforma_id')!.disable();
        this.showOrigenModal = true;
    }

    openEditOrigen(o: OrigenRow): void {
        this.isEditingOrigen = true;
        this.editingOrigenId = o.id;
        this.origenError = '';
        this.proyectosOrigenForm = this.proyectos.filter(p => p.Desarrollador_id === o.desarrolladorId);
        this.origenForm.reset({
            desarrollador_id:         o.desarrolladorId,
            Proyecto_id:              o.desarrolladorId ? (o.Proyecto_id ?? '') : '',
            Nombre:                   o.Nombre,
            Categoria_id:             o.Categoria_id ?? '',
            Referencia_plataforma_id: o.Referencia_plataforma_id ?? '',
        });
        this.toggleProyectoOrigen(!!o.desarrolladorId);
        this.onOrigenCategoriaChangeInForm(o.Categoria_id ?? '');
        this.showOrigenModal = true;
    }

    closeOrigenModal(): void {
        this.showOrigenModal = false;
        this.origenError = '';
    }

    async saveOrigen(): Promise<void> {
        if (this.origenForm.invalid || this.isSavingOrigen) return;
        const v = this.origenForm.getRawValue();
        const nombre = String(v.Nombre).trim();

        // La ingesta de leads identifica el origen por (lower(trim(Nombre)), Proyecto_id):
        // un duplicado haría ambiguo a cuál se asignan los leads nuevos.
        const duplicado = this.origenes.some(o =>
            o.id !== this.editingOrigenId &&
            o.Proyecto_id === v.Proyecto_id &&
            o.Nombre.trim().toLowerCase() === nombre.toLowerCase()
        );
        if (duplicado) {
            this.origenError = `Ya existe el origen "${nombre}" en este sub-proyecto.`;
            return;
        }

        const payload: OrigenPayload = {
            Nombre:                   nombre,
            Proyecto_id:              v.Proyecto_id,
            Categoria_id:             v.Categoria_id,
            Referencia_plataforma_id: this.esCategoriaDigital(v.Categoria_id) && v.Referencia_plataforma_id
                ? v.Referencia_plataforma_id
                : null,
        };

        this.isSavingOrigen = true;
        this.origenError = '';
        const { error } = this.isEditingOrigen && this.editingOrigenId
            ? await this.svc.updateOrigen(this.editingOrigenId, payload)
            : await this.svc.createOrigen(payload);

        if (error) {
            this.origenError = error.message;
            this.isSavingOrigen = false;
            return;
        }

        await this.loadOrigenes();
        this.isSavingOrigen = false;
        this.closeOrigenModal();
    }

    requestDeleteOrigen(o: OrigenRow): void {
        this.deleteOrigenError = '';
        this.confirmDeleteOrigen = o;
    }

    cancelDeleteOrigen(): void {
        this.confirmDeleteOrigen = null;
        this.deleteOrigenError = '';
    }

    async confirmDeleteOrigenAction(): Promise<void> {
        const origen = this.confirmDeleteOrigen;
        if (!origen || this.isDeletingOrigen) return;
        this.isDeletingOrigen = true;
        this.deleteOrigenError = '';

        const { error } = await this.svc.deleteOrigen(origen.id);
        this.isDeletingOrigen = false;

        if (error) {
            // 23503 = violación de FK: el origen ya tiene leads asociados (lead_creations.source_id).
            this.deleteOrigenError = error.code === '23503'
                ? 'Este origen ya tiene leads asociados y no se puede eliminar. Puedes editarlo para cambiar su categoría.'
                : error.message;
            return;
        }

        this.origenes = this.origenes.filter(o => o.id !== origen.id);
        this.applyOrigenFilters();
        this.confirmDeleteOrigen = null;
    }
}
