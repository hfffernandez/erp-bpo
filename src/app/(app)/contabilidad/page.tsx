'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Topbar } from '@/components/layout/Sidebar';
import { KPICard } from '@/components/ui';
import { formatCLP, mockEmpresas } from '@/lib/mockData';
import { BookOpen, Plus, RefreshCw, Filter, Building2 } from 'lucide-react';

const PLAN_CUENTAS = [
    { codigo: '1', descripcion: 'ACTIVOS', tipo: 'ACTIVO', nivel: 1, saldo: 96670000 },
    { codigo: '11', descripcion: 'Activos Corrientes', tipo: 'ACTIVO', nivel: 2, saldo: 63970000 },
    { codigo: '1101', descripcion: 'Caja y Bancos', tipo: 'ACTIVO', nivel: 3, saldo: 48320000 },
    { codigo: '1102', descripcion: 'Cuentas por Cobrar', tipo: 'ACTIVO', nivel: 3, saldo: 12450000 },
    { codigo: '1103', descripcion: 'Inventario', tipo: 'ACTIVO', nivel: 3, saldo: 3200000 },
    { codigo: '12', descripcion: 'Activos No Corrientes', tipo: 'ACTIVO', nivel: 2, saldo: 32700000 },
    { codigo: '1201', descripcion: 'Activos Fijos Brutos', tipo: 'ACTIVO', nivel: 3, saldo: 45000000 },
    { codigo: '1202', descripcion: 'Depreciación Acumulada', tipo: 'ACTIVO', nivel: 3, saldo: -16500000 },
    { codigo: '2', descripcion: 'PASIVOS', tipo: 'PASIVO', nivel: 1, saldo: 35950000 },
    { codigo: '21', descripcion: 'Pasivos Corrientes', tipo: 'PASIVO', nivel: 2, saldo: 20950000 },
    { codigo: '2101', descripcion: 'Cuentas por Pagar', tipo: 'PASIVO', nivel: 3, saldo: 8200000 },
    { codigo: '2102', descripcion: 'IVA Débito Fiscal', tipo: 'PASIVO', nivel: 3, saldo: 6650000 },
    { codigo: '2201', descripcion: 'Remuneraciones por Pagar', tipo: 'PASIVO', nivel: 3, saldo: 6100000 },
    { codigo: '3', descripcion: 'PATRIMONIO', tipo: 'PATRIMONIO', nivel: 1, saldo: 60720000 },
    { codigo: '31', descripcion: 'Capital Pagado', tipo: 'PATRIMONIO', nivel: 2, saldo: 55350000 },
    { codigo: '32', descripcion: 'Resultado del Ejercicio', tipo: 'PATRIMONIO', nivel: 2, saldo: 5370000 },
    { codigo: '4', descripcion: 'INGRESOS', tipo: 'INGRESO', nivel: 1, saldo: 22000000 },
    { codigo: '4101', descripcion: 'Ventas netas', tipo: 'INGRESO', nivel: 2, saldo: 22000000 },
    { codigo: '5', descripcion: 'COSTOS Y GASTOS', tipo: 'GASTO', nivel: 1, saldo: 16630000 },
    { codigo: '5101', descripcion: 'Costo de ventas', tipo: 'COSTO', nivel: 2, saldo: 9460000 },
    { codigo: '5201', descripcion: 'Remuneraciones personal', tipo: 'GASTO', nivel: 2, saldo: 3600000 },
    { codigo: '5202', descripcion: 'Gastos generales de administración', tipo: 'GASTO', nivel: 2, saldo: 3200000 },
    { codigo: '5301', descripcion: 'Depreciación del ejercicio', tipo: 'GASTO', nivel: 2, saldo: 370000 },
];

const TIPO_COLORS: Record<string, string> = {
    ACTIVO: 'var(--color-info)',
    PASIVO: 'var(--color-danger)',
    PATRIMONIO: 'var(--color-purple)',
    INGRESO: 'var(--color-accent)',
    COSTO: 'var(--color-warning)',
    GASTO: 'var(--color-warning)',
};

export default function ContabilidadPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const empresaId = searchParams.get('empresaId');

    const activeEmpresa = mockEmpresas.find(e => e.id === empresaId);

    if (!empresaId) {
        return (
            <>
                <Topbar title="Libro Mayor y Balances" subtitle="Selección de empresa requerida" />
                <div style={{
                    height: '70vh', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 24
                }}>
                    <div style={{
                        width: 100, height: 100, borderRadius: '50%', background: 'rgba(60,2,19,0.05)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)'
                    }}>
                        <Building2 size={48} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-heading)' }}>Selecciona una Empresa</h2>
                        <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)', maxWidth: 360, margin: '12px auto 32px', lineHeight: 1.6 }}>
                            Para ver el Libro Mayor y el Balance, primero debes seleccionar un cliente de tu portafolio.
                        </p>
                        <button
                            onClick={() => router.push('/clientes')}
                            className="btn btn-primary"
                            style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: 10 }}
                        >
                            Ir al Portafolio
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Topbar
                title={`Contabilidad: ${activeEmpresa?.razonSocial}`}
                subtitle={`Módulo B · Motor contable IFRS · ${activeEmpresa?.rut}`}
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm"><Filter size={13} /> Filtros</button>
                        <button className="btn btn-primary btn-sm"><Plus size={13} /> Nueva Cuenta</button>
                    </div>
                }
            />
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    <KPICard title="Total Cuentas" value={PLAN_CUENTAS.length} accentColor="var(--color-accent)" />
                    <KPICard title="Total Activos" value={96670000} format="currency" accentColor="var(--color-info)" />
                    <KPICard title="Total Pasivos" value={35950000} format="currency" accentColor="var(--color-danger)" />
                    <KPICard title="Patrimonio Neto" value={60720000} format="currency" accentColor="var(--color-accent)" subvalue="Activos = Pasivo + Patrimonio ✓" />
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Plan de Cuentas — IFRS / PCGA Chile</h3>
                        <div style={{ display: 'flex', gap: 6 }}>
                            {['ACTIVO', 'PASIVO', 'PATRIMONIO', 'INGRESO', 'GASTO'].map(tipo => (
                                <span key={tipo} style={{
                                    fontSize: '0.7rem', padding: '2px 8px', borderRadius: 9999,
                                    background: `${TIPO_COLORS[tipo]}20`, color: TIPO_COLORS[tipo], fontWeight: 600,
                                }}>{tipo}</span>
                            ))}
                        </div>
                    </div>
                    <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Código</th>
                                    <th>Descripción</th>
                                    <th>Tipo</th>
                                    <th>Nivel</th>
                                    <th style={{ textAlign: 'right' }}>Saldo Actual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PLAN_CUENTAS.map(cuenta => (
                                    <tr key={cuenta.codigo}>
                                        <td>
                                            <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-accent)', fontSize: '0.85rem' }}>
                                                {cuenta.codigo}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                paddingLeft: `${(cuenta.nivel - 1) * 20}px`,
                                                fontWeight: cuenta.nivel === 1 ? 800 : cuenta.nivel === 2 ? 600 : 400,
                                                fontSize: cuenta.nivel === 1 ? '0.88rem' : '0.83rem',
                                                color: cuenta.nivel === 1 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                                display: 'block',
                                            }}>
                                                {cuenta.nivel === 1 ? '▸ ' : cuenta.nivel === 2 ? '  ◦ ' : '    · '}
                                                {cuenta.descripcion}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{
                                                fontSize: '0.72rem', padding: '2px 8px', borderRadius: 9999,
                                                background: `${TIPO_COLORS[cuenta.tipo] || '#555'}20`,
                                                color: TIPO_COLORS[cuenta.tipo] || '#555', fontWeight: 600,
                                            }}>
                                                {cuenta.tipo}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                            N{cuenta.nivel}
                                        </td>
                                        <td style={{
                                            textAlign: 'right', fontFamily: 'monospace', fontWeight: cuenta.nivel === 1 ? 800 : 600, fontSize: '0.85rem',
                                            color: cuenta.saldo < 0 ? 'var(--color-danger)' : cuenta.nivel === 1 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                                        }}>
                                            {formatCLP(cuenta.saldo)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
