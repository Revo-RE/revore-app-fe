// Dos dimensiones de captura:
//   negocio   — cómo se comercializa la unidad (venta | renta)
//   operacion — el movimiento (apartado | cierre | cancelacion)
// El estatus de la unidad se deriva en el backend y solo se muestra.
export type Negocio = 'venta' | 'renta';
export type Operacion = 'apartado' | 'cierre' | 'cancelacion';
export type OperationType = 'venta' | 'renta' | 'apartado' | 'cancelacion';

export const NEGOCIO_LABELS: Record<Negocio, string> = {
  venta: 'Venta',
  renta: 'Renta',
};

export const OPERACION_LABELS: Record<Operacion, string> = {
  apartado: 'Apartado',
  cierre: 'Cierre',
  cancelacion: 'Cancelación',
};

export const OPERATION_TYPE_LABELS: Record<OperationType, string> = {
  venta: 'Venta',
  renta: 'Renta',
  apartado: 'Apartado',
  cancelacion: 'Cancelación',
};

export interface ProjectInventoryRow {
  project_id: string;
  project_name: string | null;
  total: number;
  disponibles: number;
  vendidas: number;
  apartadas: number;
  otras: number;
  ventas_monto: number;
  avance_pct: number;
}

export interface InventorySummary {
  proyectos: number;
  unidades_total: number;
  por_estatus: Record<string, number>;
  valor_inventario_disponible: number;
  operaciones_por_tipo: Record<string, number>;
  ventas_registradas: number;
  ventas_monto: number;
  por_proyecto: ProjectInventoryRow[];
}

export interface SalesSummary {
  from: string | null;
  to: string | null;
  unidades_vendidas: number;
  monto_vendido: number;
  ventas_plataforma: number;
  ventas_base_datos: number;
  apartados: number;
  monto_apartados: number;
  vendidas_sin_precio: number;
}

export interface CatalogDeveloper {
  id: string;
  name: string | null;
}

export interface CatalogProject {
  id: string;
  name: string;
  developer_id: string | null;
  units_count: number;
}

export interface CatalogUnit {
  id: string;
  unit_number: string | null;
  typology: string | null;
  status: string | null;
  price: number | null;
  project_id: string;
}

/** Unidad completa para la tabla estilo lista de precios */
export interface UnitRow extends CatalogUnit {
  level: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  total_area: number | null;
  m2_interior: number | null;
  m2_exterior: number | null;
  price_m2: number | null;
}

export interface CatalogAdvisor {
  id: string;
  project_id: string | null;
  name: string | null;
}

export interface InventoryCatalog {
  developers: CatalogDeveloper[];
  projects: CatalogProject[];
  units: CatalogUnit[];
  advisors: CatalogAdvisor[];
}

export interface InventoryOperation {
  id: string;
  fecha: string;
  type: OperationType;
  negocio: Negocio | null;
  operacion: Operacion | null;
  amount: number | null;
  currency: string;
  notas: string | null;
  project_id: string;
  project_name: string | null;
  unit_id: string;
  unit_number: string | null;
  typology: string | null;
  unit_status: string | null;
  advisor_id: string | null;
  advisor_name: string | null;
  created_at: string;
  /** Solo presente en la respuesta del POST: estatus resultante de la unidad */
  unit_new_status?: string;
}

export interface OperationCreate {
  project_id: string;
  unit_id: string;
  negocio: Negocio;
  operacion: Operacion;
  fecha: string;
  amount: number;
  advisor_id: string | null;
  /** Nombre capturado a mano cuando el asesor no está en el catálogo */
  advisor_name?: string;
  notas?: string;
}
