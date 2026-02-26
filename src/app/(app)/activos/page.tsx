'use client';
import { Topbar } from '@/components/layout/Sidebar';
import { KPICard } from '@/components/ui';
import { formatCLP } from '@/lib/mockData';
import { Briefcase, Plus, Calculator } from 'lucide-react';

const ACTIVOS = [
    { id: 'af-001', descripcion: 'Camión Mitsubishi Fuso', categoria: 'Vehículos', fechaAdq: '2022-03-15', valorOrig: 28000000, vidaUtil: 60, deprecMensual: 466667, deprecAcum: 10733333, valorNeto: 17266667 },
    { id: 'af-002', descripcion: 'Computador MacBook Pro 16"', categoria: 'Equipos Comp.', fechaAdq: '2023-08-01', valorOrig: 3200000, vidaUtil: 36, deprecMensual: 88889, deprecAcum: 1688883, valorNeto: 1511117 },
    { id: 'af-003', descripcion: 'Maquinaria Industrial CNC', categoria: 'Maquinaria', fechaAdq: '2020-01-10', valorOrig: 85000000, vidaUtil: 120, deprecMensual: 708333, deprecAcum: 43208313, valorNeto: 41791687 },
    { id: 'af-004', descripcion: 'Mejoras al arrendamiento (oficina)', categoria: 'Instalaciones', fechaAdq: '2024-06-01', valorOrig: 6500000, vidaUtil: 48, deprecMensual: 135417, deprecAcum: 946919, valorNeto: 5553081 },
];

export default function ActivosPage() {
    const totalOriginal = ACTIVOS.reduce((s, a) => s + a.valorOrig, 0);
    const totalDeprecAcum = ACTIVOS.reduce((s, a) => s + a.deprecAcum, 0);
    const totalNeto = ACTIVOS.reduce((s, a) => s + a.valorNeto, 0);
    const deprecMensualTotal = ACTIVOS.reduce((s, a) => s + a.deprecMensual, 0);

    return (
        <>
            <Topbar title="Activos Fijos" subtitle="Módulo A.4 · Depreciación automática · Control de altas y bajas"
                actions={<button className="btn btn-primary btn-sm"><Plus size={13} /> Nuevo Activo</button>}
            />
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    <KPICard title="Valor Original Total" value={totalOriginal} format="currency" accentColor="var(--color-info)" />
                    <KPICard title="Deprec. Acumulada" value={totalDeprecAcum} format="currency" accentColor="var(--color-warning)" />
                    <KPICard title="Valor Neto Libros" value={totalNeto} format="currency" accentColor="var(--color-accent)" />
                    <KPICard title="Deprec. Mensual" value={deprecMensualTotal} format="currency" accentColor="var(--color-purple)" subvalue="Asiento auto al cierre" />
                </div>

                <div className="alert alert-success">
                    <Calculator size={15} />
                    <strong>Depreciación automática:</strong> El sistema genera el asiento de depreciación mensual al inicio de cada cierre de período, calculado según método Lineal (SII Art. 31 N°5).
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Registro de Activos Fijos</h3>
                    </div>
                    <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Descripción del Activo</th>
                                    <th>Categoría</th>
                                    <th>Fecha Adq.</th>
                                    <th>Vida Útil</th>
                                    <th style={{ textAlign: 'right' }}>Valor Original</th>
                                    <th style={{ textAlign: 'right' }}>Depreciación Mensual</th>
                                    <th style={{ textAlign: 'right' }}>Deprec. Acumulada</th>
                                    <th style={{ textAlign: 'right' }}>Valor Neto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ACTIVOS.map(a => (
                                    <tr key={a.id}>
                                        <td style={{ fontWeight: 600 }}>{a.descripcion}</td>
                                        <td><span className="badge badge-muted">{a.categoria}</span></td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{new Date(a.fechaAdq).toLocaleDateString('es-CL')}</td>
                                        <td style={{ fontSize: '0.8rem' }}>{a.vidaUtil} meses</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.85rem' }}>{formatCLP(a.valorOrig)}</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-warning)' }}>({formatCLP(a.deprecMensual)})</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-danger)' }}>({formatCLP(a.deprecAcum)})</td>
                                        <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-accent)' }}>{formatCLP(a.valorNeto)}</td>
                                    </tr>
                                ))}
                                <tr style={{ borderTop: '2px solid var(--color-border)' }}>
                                    <td colSpan={4} style={{ fontWeight: 700 }}>TOTALES</td>
                                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>{formatCLP(totalOriginal)}</td>
                                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-warning)' }}>({formatCLP(deprecMensualTotal)})</td>
                                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-danger)' }}>({formatCLP(totalDeprecAcum)})</td>
                                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 800, color: 'var(--color-accent)' }}>{formatCLP(totalNeto)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
