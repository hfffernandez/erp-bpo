// ============================================================
// BPO-CORE CHILE — Domain Types
// Strict separation: Types only, no UI or business logic
// ============================================================

// ─── Core Entities ───────────────────────────────────────────

export type TenantId = string;   // RUT del estudio contable
export type EmpresaId = string;  // RUT de la empresa cliente
export type UserId = string;

export interface Tenant {
    id: TenantId;
    rut: string;
    razonSocial: string;
    nombreFantasia: string;
    plan: 'starter' | 'professional' | 'enterprise';
    empresasCount: number;
    usuariosCount: number;
    createdAt: Date;
    activePeriod: string; // 'YYYY-MM'
}

export interface Empresa {
    id: EmpresaId;
    tenantId: TenantId;
    rut: string;
    razonSocial: string;
    nombreFantasia: string;
    giro: string;
    regimen: '14A' | '14D' | '14D8' | 'SIMPLIFICADO';
    sector: 'RETAIL' | 'MANUFACTURA' | 'SERVICIOS' | 'CONSTRUCCION' | 'AGRICOLA' | 'INMOBILIARIO' | 'OTRO';
    contadorResponsable: string;
    ejecutivoAsignado: string;
    estadoCierre: 'AL_DIA' | 'PENDIENTE' | 'ATRASADO' | 'BLOQUEADO';
    periodoActual: string;
    alertas: number;
    saldoBancario: number;
    cxcTotal: number;
    cxpTotal: number;
    createdAt: Date;
}

// ─── DTE & SII ───────────────────────────────────────────────

export type TipoDTE = '33' | '34' | '39' | '41' | '52' | '56' | '61' | '110';
export type EstadoDTE = 'BORRADOR' | 'ENVIADO' | 'ACEPTADO' | 'RECHAZADO' | 'ANULADO';

export interface DTE {
    id: string;
    empresaId: EmpresaId;
    tipo: TipoDTE;
    tipoDescripcion: string;
    folio: number;
    rutEmisor: string;
    rutReceptor: string;
    razonSocialReceptor: string;
    fechaEmision: Date;
    fechaVencimiento?: Date;
    montoNeto: number;
    montoIva: number;
    montoTotal: number;
    estado: EstadoDTE;
    estadoSII: string;
    cuentaContable?: string;
    centroCosto?: string;
    asientoId?: string;
    clasificacionAI: number; // 0-100 confidence
}

// ─── Contabilidad ─────────────────────────────────────────────

export type TipoAsiento = 'VENTA' | 'COMPRA' | 'BANCO' | 'REMUNERACION' | 'DEPRECIACION' | 'AJUSTE' | 'CIERRE' | 'MANUAL';
export type EstadoAsiento = 'BORRADOR' | 'EN_REVISION' | 'DEFINITIVO' | 'ANULADO';

export interface Asiento {
    id: string;
    empresaId: EmpresaId;
    numero: number;
    fecha: Date;
    glosa: string;
    tipo: TipoAsiento;
    estado: EstadoAsiento;
    origenId?: string;   // DTE id, pago id, etc.
    origenTipo?: string;
    totalDebe: number;
    totalHaber: number;
    cuadrado: boolean;
    lineas: AsientoLinea[];
    creadoPor: string;
    aprobadoPor?: string;
    confianzaAI?: number;
}

export interface AsientoLinea {
    id: string;
    cuenta: string;         // Código de cuenta
    cuentaDescripcion: string;
    debe: number;
    haber: number;
    centroCosto?: string;
    descripcion?: string;
}

// ─── Cuentas & Plan de Cuentas ────────────────────────────────

export type TipoCuenta = 'ACTIVO' | 'PASIVO' | 'PATRIMONIO' | 'INGRESO' | 'COSTO' | 'GASTO';

export interface Cuenta {
    codigo: string;
    descripcion: string;
    tipo: TipoCuenta;
    nivel: number;
    padre?: string;
    saldo: number;
    esAjusteInflacion: boolean;
}

// ─── Bancos & Conciliación ────────────────────────────────────

export type EstadoConciliacion = 'CONCILIADO' | 'PENDIENTE' | 'EN_REVISION' | 'DIFERENCIA';

export interface MovimientoBancario {
    id: string;
    empresaId: EmpresaId;
    cuentaBancaria: string;
    banco: string;
    fecha: Date;
    descripcion: string;
    monto: number; // positivo = crédito, negativo = débito
    referencia?: string;
    estado: EstadoConciliacion;
    asientoId?: string;
    matchScore?: number;
}

// ─── CxC / CxP ───────────────────────────────────────────────

export type EstadoDocumento = 'VIGENTE' | 'VENCIDO' | 'PAGADO' | 'ANULADO';

export interface DocumentoCobro {
    id: string;
    empresaId: EmpresaId;
    tipo: 'CXC' | 'CXP';
    rutContraparted: string;
    razonSocial: string;
    folioDTE: number;
    tipoDTE: string;
    fechaEmision: Date;
    fechaVencimiento: Date;
    montoTotal: number;
    montoPagado: number;
    montoPendiente: number;
    estado: EstadoDocumento;
    diasVencimiento: number; // positivos = vencido hace N días
}

// ─── CRM & Tickets ───────────────────────────────────────────

export type CanalCRM = 'WHATSAPP' | 'EMAIL' | 'TELEGRAM' | 'TELEFONO' | 'VIDEO' | 'PORTAL';
export type EstadoTicket = 'NUEVO' | 'EN_REVISION' | 'ESPERANDO_CLIENTE' | 'RESUELTO' | 'CERRADO';
export type PrioridadTicket = 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE';
export type TipoTicket = 'CONSULTA_CONTABLE' | 'INSTRUCCION_OPERACIONAL' | 'RECLAMO' | 'SOLICITUD_REPORTE' | 'URGENCIA_TRIBUTARIA' | 'SOPORTE_TEC';

export interface Ticket {
    id: string;
    tenantId: TenantId;
    empresaId: EmpresaId;
    razonSocialEmpresa: string;
    canal: CanalCRM;
    tipo: TipoTicket;
    prioridad: PrioridadTicket;
    estado: EstadoTicket;
    asunto: string;
    descripcion: string;
    asignadoA: string;
    creadoEn: Date;
    actualizadoEn: Date;
    slaLimite: Date;
    slaEstado: 'OK' | 'EN_RIESGO' | 'VENCIDO';
    mensajes: MensajeCRM[];
    vinculoERP?: { tipo: string; id: string; descripcion: string };
}

export interface MensajeCRM {
    id: string;
    ticketId: string;
    canal: CanalCRM;
    autor: string;
    autorTipo: 'CLIENTE' | 'EJECUTIVO' | 'SISTEMA';
    contenido: string;
    fecha: Date;
    interno: boolean; // nota interna vs mensaje al cliente
}

// ─── KPIs & Dashboard ─────────────────────────────────────────

export interface KPIEmpresa {
    empresaId: EmpresaId;
    periodo: string;
    dso: number;                // Days Sales Outstanding
    dpo: number;                // Days Payable Outstanding
    currentRatio: number;
    acidTest: number;
    ebitda: number;
    margenBruto: number;
    margenNeto: number;
    cxcVencidaPct: number;      // % CxC vencida / total
    liquidez: number;
    ingresosMes: number;
    gastosMes: number;
    resultadoMes: number;
    saldoBancario: number;
}

export interface AlertaSistema {
    id: string;
    empresaId: EmpresaId;
    razonSocial: string;
    tipo: 'DTE_SIN_CLASIFICAR' | 'DISCREPANCIA_SII' | 'CXC_VENCIDA' | 'CONCILIACION_PENDIENTE' | 'CIERRE_PROXIMO' | 'SLA_RIESGO';
    titulo: string;
    descripcion: string;
    severidad: 'INFO' | 'ADVERTENCIA' | 'CRITICA';
    fecha: Date;
    resuelta: boolean;
}

// ─── Remuneraciones ──────────────────────────────────────────

export interface Trabajador {
    id: string;
    empresaId: EmpresaId;
    rut: string;
    nombre: string;
    apellido: string;
    cargo: string;
    centroCosto: string;
    sueldoBase: number;
    afp: string;
    isapre: string;
    fechaIngreso: Date;
    activo: boolean;
}

// ─── Navegación ───────────────────────────────────────────────

export interface NavItem {
    id: string;
    label: string;
    icon: string;
    href: string;
    badge?: number;
    children?: NavItem[];
    module: ModuleId;
}

export type ModuleId =
    | 'dashboard'
    | 'empresas'
    | 'facturacion'
    | 'contabilidad'
    | 'bancos'
    | 'cobranza'
    | 'remuneraciones'
    | 'activos'
    | 'sii'
    | 'reportes'
    | 'crm'
    | 'configuracion';
