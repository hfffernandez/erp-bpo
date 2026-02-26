// ============================================================
// BPO-CORE CHILE — Mock Data Layer
// Realistic mock data for Chilean accounting BPO context
// ============================================================

import type {
    Empresa, DTE, Asiento, MovimientoBancario,
    DocumentoCobro, Ticket, AlertaSistema, KPIEmpresa, Trabajador
} from '@/types';

// ─── Empresas Cliente ─────────────────────────────────────────

export const mockEmpresas: Empresa[] = [
    {
        id: 'emp-001', tenantId: 'tenant-braddan', rut: '76.123.456-7',
        razonSocial: 'INVERSIONES MERIDIAN SpA', nombreFantasia: 'Meridian',
        giro: 'Inversiones y holding', regimen: '14D', sector: 'SERVICIOS',
        contadorResponsable: 'Catalina Fuentes', ejecutivoAsignado: 'Roberto Vásquez',
        estadoCierre: 'AL_DIA', periodoActual: '2026-01',
        alertas: 2, saldoBancario: 48320000, cxcTotal: 12450000, cxpTotal: 8200000,
        createdAt: new Date('2023-03-01'),
    },
    {
        id: 'emp-002', tenantId: 'tenant-braddan', rut: '77.654.321-K',
        razonSocial: 'COMERCIALIZADORA DEL SUR Ltda.', nombreFantasia: 'ComSur',
        giro: 'Comercio al por mayor', regimen: '14D8', sector: 'RETAIL',
        contadorResponsable: 'Andrés Morales', ejecutivoAsignado: 'Patricia Lagos',
        estadoCierre: 'PENDIENTE', periodoActual: '2026-01',
        alertas: 5, saldoBancario: 9870000, cxcTotal: 31200000, cxpTotal: 19800000,
        createdAt: new Date('2022-08-15'),
    },
    {
        id: 'emp-003', tenantId: 'tenant-braddan', rut: '76.889.100-3',
        razonSocial: 'CONSTRUCTORA ANDINA SA', nombreFantasia: 'Constructora Andina',
        giro: 'Construcción de edificios', regimen: '14A', sector: 'CONSTRUCCION',
        contadorResponsable: 'Catalina Fuentes', ejecutivoAsignado: 'Roberto Vásquez',
        estadoCierre: 'ATRASADO', periodoActual: '2025-12',
        alertas: 8, saldoBancario: 22100000, cxcTotal: 85400000, cxpTotal: 44300000,
        createdAt: new Date('2021-11-20'),
    },
    {
        id: 'emp-004', tenantId: 'tenant-braddan', rut: '78.456.789-2',
        razonSocial: 'AGRÍCOLA SANTA ELENA SpA', nombreFantasia: 'Santa Elena',
        giro: 'Producción agrícola de exportación', regimen: '14D', sector: 'AGRICOLA',
        contadorResponsable: 'Francisca Pinto', ejecutivoAsignado: 'Diego Araya',
        estadoCierre: 'AL_DIA', periodoActual: '2026-01',
        alertas: 0, saldoBancario: 31500000, cxcTotal: 42000000, cxpTotal: 15600000,
        createdAt: new Date('2020-05-10'),
    },
    {
        id: 'emp-005', tenantId: 'tenant-braddan', rut: '76.321.000-5',
        razonSocial: 'TECH SOLUTIONS CHILE SpA', nombreFantasia: 'TechCL',
        giro: 'Desarrollo de software y consultoría TI', regimen: '14D8', sector: 'SERVICIOS',
        contadorResponsable: 'Andrés Morales', ejecutivoAsignado: 'Patricia Lagos',
        estadoCierre: 'AL_DIA', periodoActual: '2026-01',
        alertas: 1, saldoBancario: 67200000, cxcTotal: 18900000, cxpTotal: 4200000,
        createdAt: new Date('2024-01-08'),
    },
    {
        id: 'emp-006', tenantId: 'tenant-braddan', rut: '77.100.200-9',
        razonSocial: 'INMOBILIARIA CORDILLERA SA', nombreFantasia: 'Cordillera',
        giro: 'Arriendo y administración de bienes raíces', regimen: '14A', sector: 'INMOBILIARIO',
        contadorResponsable: 'Francisca Pinto', ejecutivoAsignado: 'Diego Araya',
        estadoCierre: 'BLOQUEADO', periodoActual: '2025-11',
        alertas: 12, saldoBancario: 4200000, cxcTotal: 156000000, cxpTotal: 98000000,
        createdAt: new Date('2019-09-01'),
    },
];

// ─── KPIs Dashboard ──────────────────────────────────────────

export const mockKPIs: KPIEmpresa[] = [
    {
        empresaId: 'emp-001', periodo: '2026-01',
        dso: 28, dpo: 35, currentRatio: 2.1, acidTest: 1.8,
        ebitda: 8400000, margenBruto: 42.3, margenNeto: 18.7,
        cxcVencidaPct: 12, liquidez: 2.1,
        ingresosMes: 22000000, gastosMes: 13600000, resultadoMes: 4120000, saldoBancario: 48320000,
    },
    {
        empresaId: 'emp-002', periodo: '2026-01',
        dso: 52, dpo: 40, currentRatio: 0.9, acidTest: 0.6,
        ebitda: -1200000, margenBruto: 18.4, margenNeto: -4.2,
        cxcVencidaPct: 38, liquidez: 0.9,
        ingresosMes: 45000000, gastosMes: 46900000, resultadoMes: -1890000, saldoBancario: 9870000,
    },
];

// ─── DTE Mock ─────────────────────────────────────────────────

export const mockDTEs: DTE[] = [
    {
        id: 'dte-001', empresaId: 'emp-001', tipo: '33',
        tipoDescripcion: 'Factura Electrónica', folio: 10542,
        rutEmisor: '76.123.456-7', rutReceptor: '96.500.760-0',
        razonSocialReceptor: 'FALABELLA SA', fechaEmision: new Date('2026-01-15'),
        fechaVencimiento: new Date('2026-02-14'),
        montoNeto: 5042016, montoIva: 958983, montoTotal: 6000999,
        estado: 'ACEPTADO', estadoSII: 'ACEPTADO', cuentaContable: '11010101',
        centroCosto: 'VENTAS-CL', asientoId: 'asi-001', clasificacionAI: 97,
    },
    {
        id: 'dte-002', empresaId: 'emp-001', tipo: '33',
        tipoDescripcion: 'Factura Electrónica', folio: 10543,
        rutEmisor: '76.123.456-7', rutReceptor: '76.321.000-5',
        razonSocialReceptor: 'TECH SOLUTIONS CHILE SpA', fechaEmision: new Date('2026-01-20'),
        fechaVencimiento: new Date('2026-02-19'),
        montoNeto: 2100840, montoIva: 399159, montoTotal: 2499999,
        estado: 'ACEPTADO', estadoSII: 'ACEPTADO', cuentaContable: '11010101',
        centroCosto: 'VENTAS-CL', asientoId: 'asi-002', clasificacionAI: 99,
    },
    {
        id: 'dte-003', empresaId: 'emp-002', tipo: '33',
        tipoDescripcion: 'Factura Electrónica', folio: 8721,
        rutEmisor: '77.654.321-K', rutReceptor: '78.901.234-5',
        razonSocialReceptor: 'SUPERMERCADO NORTE Ltda.', fechaEmision: new Date('2026-01-22'),
        fechaVencimiento: new Date('2026-02-21'),
        montoNeto: 8403360, montoIva: 1596640, montoTotal: 10000000,
        estado: 'ACEPTADO', estadoSII: 'ACEPTADO', clasificacionAI: 45,
        // Sin cuenta asignada — requiere revisión del contador
    },
    {
        id: 'dte-004', empresaId: 'emp-001', tipo: '61',
        tipoDescripcion: 'Nota de Crédito Electrónica', folio: 312,
        rutEmisor: '96.500.760-0', rutReceptor: '76.123.456-7',
        razonSocialReceptor: 'INVERSIONES MERIDIAN SpA', fechaEmision: new Date('2026-01-18'),
        montoNeto: 500000, montoIva: 95000, montoTotal: 595000,
        estado: 'ACEPTADO', estadoSII: 'ACEPTADO', cuentaContable: '21010101', clasificacionAI: 92,
    },
    {
        id: 'dte-005', empresaId: 'emp-003', tipo: '33',
        tipoDescripcion: 'Factura Electrónica', folio: 4500,
        rutEmisor: '76.889.100-3', rutReceptor: '79.500.001-K',
        razonSocialReceptor: 'MINISTERIO DE VIVIENDA', fechaEmision: new Date('2025-12-28'),
        fechaVencimiento: new Date('2026-01-27'),
        montoNeto: 125210084, montoIva: 23789916, montoTotal: 149000000,
        estado: 'ENVIADO', estadoSII: 'PENDIENTE', clasificacionAI: 78,
    },
];

// ─── Asientos Contables ───────────────────────────────────────

export const mockAsientos: Asiento[] = [
    {
        id: 'asi-001', empresaId: 'emp-001', numero: 1842,
        fecha: new Date('2026-01-15'), glosa: 'Factura 10542 - Falabella SA', tipo: 'VENTA',
        estado: 'DEFINITIVO', origenId: 'dte-001', origenTipo: 'DTE',
        totalDebe: 6000999, totalHaber: 6000999, cuadrado: true,
        creadoPor: 'Sistema IA', aprobadoPor: 'Catalina Fuentes', confianzaAI: 97,
        lineas: [
            { id: 'l1', cuenta: '1101', cuentaDescripcion: 'Clientes', debe: 6000999, haber: 0, descripcion: 'Por devengo venta' },
            { id: 'l2', cuenta: '4101', cuentaDescripcion: 'Ventas', debe: 0, haber: 5042016 },
            { id: 'l3', cuenta: '2102', cuentaDescripcion: 'IVA Débito Fiscal', debe: 0, haber: 958983 },
        ],
    },
    {
        id: 'asi-002', empresaId: 'emp-001', numero: 1843,
        fecha: new Date('2026-01-20'), glosa: 'Factura 10543 - Tech Solutions', tipo: 'VENTA',
        estado: 'DEFINITIVO', origenId: 'dte-002', origenTipo: 'DTE',
        totalDebe: 2499999, totalHaber: 2499999, cuadrado: true,
        creadoPor: 'Sistema IA', aprobadoPor: 'Catalina Fuentes', confianzaAI: 99,
        lineas: [
            { id: 'l4', cuenta: '1101', cuentaDescripcion: 'Clientes', debe: 2499999, haber: 0 },
            { id: 'l5', cuenta: '4101', cuentaDescripcion: 'Ventas', debe: 0, haber: 2100840 },
            { id: 'l6', cuenta: '2102', cuentaDescripcion: 'IVA Débito Fiscal', debe: 0, haber: 399159 },
        ],
    },
    {
        id: 'asi-003', empresaId: 'emp-001', numero: 1844,
        fecha: new Date('2026-01-25'), glosa: 'Liquidación sueldos enero 2026', tipo: 'REMUNERACION',
        estado: 'BORRADOR', totalDebe: 8450000, totalHaber: 8450000, cuadrado: true,
        creadoPor: 'Sistema IA', confianzaAI: 88,
        lineas: [
            { id: 'l7', cuenta: '5201', cuentaDescripcion: 'Remuneraciones', debe: 7200000, haber: 0 },
            { id: 'l8', cuenta: '5202', cuentaDescripcion: 'Previsión social empleador', debe: 1250000, haber: 0 },
            { id: 'l9', cuenta: '2201', cuentaDescripcion: 'Remuneraciones por pagar', debe: 0, haber: 6100000 },
            { id: 'l10', cuenta: '2202', cuentaDescripcion: 'Cotizaciones por pagar', debe: 0, haber: 2350000 },
        ],
    },
];

// ─── Movimientos Bancarios ────────────────────────────────────

export const mockMovBancarios: MovimientoBancario[] = [
    {
        id: 'mov-001', empresaId: 'emp-001', cuentaBancaria: '10-000-12345-6',
        banco: 'BCI', fecha: new Date('2026-01-16'), monto: 6000999,
        descripcion: 'ABONO FALABELLA SA', referencia: 'TRF20260116', estado: 'CONCILIADO', asientoId: 'asi-001', matchScore: 98,
    },
    {
        id: 'mov-002', empresaId: 'emp-001', cuentaBancaria: '10-000-12345-6',
        banco: 'BCI', fecha: new Date('2026-01-22'), monto: 2500000,
        descripcion: 'ABONO TECH SOLUTIONS', referencia: 'TRF20260122', estado: 'CONCILIADO', asientoId: 'asi-002', matchScore: 95,
    },
    {
        id: 'mov-003', empresaId: 'emp-001', cuentaBancaria: '10-000-12345-6',
        banco: 'BCI', fecha: new Date('2026-01-30'), monto: -6100000,
        descripcion: 'PAGO REMUNERACIONES', referencia: 'PAG20260130', estado: 'PENDIENTE', matchScore: 0,
    },
    {
        id: 'mov-004', empresaId: 'emp-001', cuentaBancaria: '10-000-12345-6',
        banco: 'BCI', fecha: new Date('2026-01-28'), monto: 850000,
        descripcion: 'ABONO CLIENTE DESCONOCIDO', referencia: 'ABC123', estado: 'EN_REVISION', matchScore: 42,
    },
];

// ─── CxC / CxP ───────────────────────────────────────────────

export const mockCxC: DocumentoCobro[] = [
    {
        id: 'cxc-001', empresaId: 'emp-001', tipo: 'CXC',
        rutContraparted: '96.500.760-0', razonSocial: 'FALABELLA SA',
        folioDTE: 10542, tipoDTE: 'Factura Electrónica',
        fechaEmision: new Date('2026-01-15'), fechaVencimiento: new Date('2026-02-14'),
        montoTotal: 6000999, montoPagado: 6000999, montoPendiente: 0,
        estado: 'PAGADO', diasVencimiento: 0,
    },
    {
        id: 'cxc-002', empresaId: 'emp-001', tipo: 'CXC',
        rutContraparted: '76.321.000-5', razonSocial: 'TECH SOLUTIONS CHILE SpA',
        folioDTE: 10543, tipoDTE: 'Factura Electrónica',
        fechaEmision: new Date('2026-01-20'), fechaVencimiento: new Date('2026-02-19'),
        montoTotal: 2499999, montoPagado: 0, montoPendiente: 2499999,
        estado: 'VIGENTE', diasVencimiento: -22,
    },
    {
        id: 'cxc-003', empresaId: 'emp-002', tipo: 'CXC',
        rutContraparted: '78.901.234-5', razonSocial: 'SUPERMERCADO NORTE Ltda.',
        folioDTE: 8721, tipoDTE: 'Factura Electrónica',
        fechaEmision: new Date('2025-12-10'), fechaVencimiento: new Date('2026-01-09'),
        montoTotal: 10000000, montoPagado: 0, montoPendiente: 10000000,
        estado: 'VENCIDO', diasVencimiento: 48,
    },
    {
        id: 'cxc-004', empresaId: 'emp-002', tipo: 'CXC',
        rutContraparted: '79.100.200-1', razonSocial: 'DISTRIBUIDORA CENTRAL SA',
        folioDTE: 8698, tipoDTE: 'Factura Electrónica',
        fechaEmision: new Date('2025-11-15'), fechaVencimiento: new Date('2025-12-15'),
        montoTotal: 5800000, montoPagado: 2000000, montoPendiente: 3800000,
        estado: 'VENCIDO', diasVencimiento: 73,
    },
];

// ─── Tickets CRM ──────────────────────────────────────────────

export const mockTickets: Ticket[] = [
    {
        id: 'tkt-001', tenantId: 'tenant-braddan', empresaId: 'emp-002',
        razonSocialEmpresa: 'COMERCIALIZADORA DEL SUR Ltda.',
        canal: 'WHATSAPP', tipo: 'INSTRUCCION_OPERACIONAL', prioridad: 'ALTA',
        estado: 'EN_REVISION',
        asunto: 'Reclasificar Factura 8721 de CxC a Incobrables',
        descripcion: 'Por favor reclasificar la factura 8721 de cuentas por cobrar a cartera incobrable. El cliente no ha pagado en 90 días.',
        asignadoA: 'Andrés Morales', creadoEn: new Date('2026-02-25T09:30:00'),
        actualizadoEn: new Date('2026-02-25T10:15:00'),
        slaLimite: new Date('2026-02-25T17:30:00'), slaEstado: 'EN_RIESGO',
        vinculoERP: { tipo: 'DTE', id: 'dte-003', descripcion: 'Factura 8721 - Supermercado Norte' },
        mensajes: [
            {
                id: 'msg-001', ticketId: 'tkt-001', canal: 'WHATSAPP',
                autor: 'María González (ComSur)', autorTipo: 'CLIENTE',
                contenido: 'Buenos días, necesitamos reclasificar la factura 8721, el cliente no pagará.', fecha: new Date('2026-02-25T09:30:00'), interno: false,
            },
            {
                id: 'msg-002', ticketId: 'tkt-001', canal: 'WHATSAPP',
                autor: 'Andrés Morales', autorTipo: 'EJECUTIVO',
                contenido: 'Recibido. Revisando el caso y verifica si hay garantías asociadas antes de reclasificar.', fecha: new Date('2026-02-25T10:15:00'), interno: false,
            },
        ],
    },
    {
        id: 'tkt-002', tenantId: 'tenant-braddan', empresaId: 'emp-003',
        razonSocialEmpresa: 'CONSTRUCTORA ANDINA SA',
        canal: 'EMAIL', tipo: 'URGENCIA_TRIBUTARIA', prioridad: 'URGENTE',
        estado: 'NUEVO',
        asunto: 'F29 Enero 2026 - Diferencia IVA no conciliada',
        descripcion: 'El sistema detecta una diferencia de $2.340.000 entre el débito fiscal según ERP y el RCV del SII para enero 2026.',
        asignadoA: 'Catalina Fuentes', creadoEn: new Date('2026-02-26T08:00:00'),
        actualizadoEn: new Date('2026-02-26T08:00:00'),
        slaLimite: new Date('2026-02-26T10:00:00'), slaEstado: 'VENCIDO',
        mensajes: [
            {
                id: 'msg-003', ticketId: 'tkt-002', canal: 'EMAIL',
                autor: 'Sistema BPO-Core', autorTipo: 'SISTEMA',
                contenido: 'Alerta automática: Diferencia IVA detectada en el monitor SII vs ERP. Empresa: Constructora Andina SA. Período: 2025-12. Diferencia: $2.340.000 en débito fiscal.', fecha: new Date('2026-02-26T08:00:00'), interno: false,
            },
        ],
    },
    {
        id: 'tkt-003', tenantId: 'tenant-braddan', empresaId: 'emp-001',
        razonSocialEmpresa: 'INVERSIONES MERIDIAN SpA',
        canal: 'PORTAL', tipo: 'SOLICITUD_REPORTE', prioridad: 'MEDIA',
        estado: 'RESUELTO',
        asunto: 'Estado de Resultados Enero 2026',
        descripcion: 'Solicitud de Estado de Resultados comparativo enero 2026 vs enero 2025 para presentación a directorio.',
        asignadoA: 'Roberto Vásquez', creadoEn: new Date('2026-02-20T14:00:00'),
        actualizadoEn: new Date('2026-02-21T09:30:00'),
        slaLimite: new Date('2026-02-21T18:00:00'), slaEstado: 'OK',
        mensajes: [],
    },
];

// ─── Alertas ─────────────────────────────────────────────────

export const mockAlertas: AlertaSistema[] = [
    {
        id: 'alr-001', empresaId: 'emp-002', razonSocial: 'COMERCIALIZADORA DEL SUR',
        tipo: 'CXC_VENCIDA', severidad: 'CRITICA',
        titulo: 'Cartera vencida supera el 38%',
        descripcion: '$13.800.000 en facturas vencidas hace más de 30 días (38% de la cartera total)',
        fecha: new Date('2026-02-26T08:00:00'), resuelta: false,
    },
    {
        id: 'alr-002', empresaId: 'emp-003', razonSocial: 'CONSTRUCTORA ANDINA SA',
        tipo: 'DISCREPANCIA_SII', severidad: 'CRITICA',
        titulo: 'Diferencia en RCV: $2.340.000',
        descripcion: 'El débito fiscal en ERP difiere del Registro de Compras y Ventas del SII para dic-2025',
        fecha: new Date('2026-02-25T19:00:00'), resuelta: false,
    },
    {
        id: 'alr-003', empresaId: 'emp-002', razonSocial: 'COMERCIALIZADORA DEL SUR',
        tipo: 'DTE_SIN_CLASIFICAR', severidad: 'ADVERTENCIA',
        titulo: '3 DTE sin clasificar contable',
        descripcion: 'Facturas de compra pendientes de asignación de cuenta contable por el contador',
        fecha: new Date('2026-02-26T10:30:00'), resuelta: false,
    },
    {
        id: 'alr-004', empresaId: 'emp-006', razonSocial: 'INMOBILIARIA CORDILLERA',
        tipo: 'CIERRE_PROXIMO', severidad: 'ADVERTENCIA',
        titulo: 'Período nov-2025 sin cerrar',
        descripcion: 'Llevan 3 períodos sin cierre contable. Bloquear acceso de edición inmediatamente.',
        fecha: new Date('2026-02-20T00:00:00'), resuelta: false,
    },
    {
        id: 'alr-005', empresaId: 'emp-001', razonSocial: 'INVERSIONES MERIDIAN SpA',
        tipo: 'CONCILIACION_PENDIENTE', severidad: 'INFO',
        titulo: '1 partida bancaria sin conciliar',
        descripcion: 'Abono de $850.000 sin match en el ERP. Requiere revisión manual.',
        fecha: new Date('2026-02-26T09:00:00'), resuelta: false,
    },
];

// ─── Trabajadores ─────────────────────────────────────────────

export const mockTrabajadores: Trabajador[] = [
    {
        id: 'trab-001', empresaId: 'emp-001', rut: '12.345.678-9',
        nombre: 'Juan Carlos', apellido: 'Pérez Muñoz', cargo: 'Gerente Comercial',
        centroCosto: 'ADMINISTRACION', sueldoBase: 4500000,
        afp: 'Habitat', isapre: 'Colmena', fechaIngreso: new Date('2020-03-01'), activo: true,
    },
    {
        id: 'trab-002', empresaId: 'emp-001', rut: '14.567.890-K',
        nombre: 'María Paz', apellido: 'González Rojas', cargo: 'Analista Contable',
        centroCosto: 'FINANZAS', sueldoBase: 1950000,
        afp: 'ProVida', isapre: 'Fonasa', fechaIngreso: new Date('2022-06-01'), activo: true,
    },
    {
        id: 'trab-003', empresaId: 'emp-001', rut: '16.789.012-3',
        nombre: 'Rodrigo', apellido: 'Castro Vidal', cargo: 'Vendedor Senior',
        centroCosto: 'VENTAS', sueldoBase: 1500000,
        afp: 'Capital', isapre: 'Fonasa', fechaIngreso: new Date('2023-01-15'), activo: true,
    },
];

// ─── Chart Data ───────────────────────────────────────────────

export const mockChartData = {
    ingresosMensuales: [
        { mes: 'Ago', ingresos: 18400000, gastos: 12200000, resultado: 6200000 },
        { mes: 'Sep', ingresos: 21300000, gastos: 14100000, resultado: 7200000 },
        { mes: 'Oct', ingresos: 19800000, gastos: 13800000, resultado: 6000000 },
        { mes: 'Nov', ingresos: 25100000, gastos: 16300000, resultado: 8800000 },
        { mes: 'Dic', ingresos: 28400000, gastos: 18900000, resultado: 9500000 },
        { mes: 'Ene', ingresos: 22000000, gastos: 13600000, resultado: 8400000 },
    ],
    estadoCierre: [
        { name: 'Al día', value: 18, color: '#25D366' },
        { name: 'Pendientes', value: 8, color: '#f5a623' },
        { name: 'Atrasadas', value: 4, color: '#e53e3e' },
        { name: 'Bloqueadas', value: 2, color: '#805ad5' },
    ],
    canalTickets: [
        { canal: 'WhatsApp', value: 142, color: '#25D366' },
        { canal: 'Email', value: 89, color: '#63b3ff' },
        { canal: 'Portal', value: 54, color: '#805ad5' },
        { canal: 'Teléfono', value: 27, color: '#f5a623' },
        { canal: 'Telegram', value: 18, color: '#e53e3e' },
    ],
};

// ─── Helpers ──────────────────────────────────────────────────

export const formatCLP = (amount: number): string =>
    new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(amount);

export const formatRUT = (rut: string): string => rut;

export const getTotalesDashboard = () => ({
    totalEmpresas: mockEmpresas.length,
    alertasCriticas: mockAlertas.filter(a => a.severidad === 'CRITICA' && !a.resuelta).length,
    ticketsAbiertos: mockTickets.filter(t => !['RESUELTO', 'CERRADO'].includes(t.estado)).length,
    dteSinClasificar: mockDTEs.filter(d => !d.cuentaContable).length,
    asientosBorrador: mockAsientos.filter(a => a.estado === 'BORRADOR').length,
    cxcVencida: mockCxC.filter(c => c.estado === 'VENCIDO').reduce((s, c) => s + c.montoPendiente, 0),
    totalCxC: mockCxC.reduce((s, c) => s + c.montoPendiente, 0),
    empresasConAtraso: mockEmpresas.filter(e => e.estadoCierre === 'ATRASADO' || e.estadoCierre === 'BLOQUEADO').length,
});
