'use client';

import { Topbar } from '@/components/layout/Sidebar';
import { KPICard } from '@/components/ui';
import { mockTrabajadores, formatCLP } from '@/lib/mockData';
import {
    Users, Plus, Download, CheckCircle, Clock,
    DollarSign, Building2, Activity,
} from 'lucide-react';

// ─── Remuneraciones Page ──────────────────────────────────────

export default function RemuneracionesPage() {
    const totalSueldobBase = mockTrabajadores.reduce((sum, t) => sum + t.sueldoBase, 0);
    const totalDescuentos = Math.round(totalSueldobBase * 0.235); // AFP + Isapre approx

    return (
        <>
            <Topbar
                title="Remuneraciones"
                subtitle="Módulo A.5 · Liquidación de sueldos y asientos automáticos"
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm"><Download size={13} /> Export Excel</button>
                        <button className="btn btn-primary btn-sm"><Plus size={13} /> Nuevo Trabajador</button>
                    </div>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    <KPICard title="Trabajadores Activos" value={mockTrabajadores.length} accentColor="var(--color-accent)" icon={<Users size={15} />} />
                    <KPICard title="Gasto Total Sueldos" value={totalSueldobBase} format="currency" accentColor="var(--color-info)" icon={<DollarSign size={15} />} />
                    <KPICard title="Total Descuentos" value={totalDescuentos} format="currency" accentColor="var(--color-warning)" subvalue="AFP + Isapre/Fonasa + AFC" />
                    <KPICard title="Líquido a Pagar" value={totalSueldobBase - totalDescuentos} format="currency" accentColor="var(--color-accent)" />
                </div>

                {/* Flujo Automatico */}
                <div style={{
                    background: 'rgba(128,90,213,0.07)', border: '1px solid rgba(128,90,213,0.3)',
                    borderRadius: 'var(--radius-lg)', padding: '16px 20px',
                }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-purple)', marginBottom: 10 }}>
                        👥 Flujo Cierre de Remuneraciones — Enero 2026
                    </h3>
                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
                        {[
                            { label: 'Liquidar sueldos', done: true },
                            { label: 'Calc. cotiz. previsionales', done: true },
                            { label: 'Generar asiento contable', done: true },
                            { label: 'Declarar PreviRed', done: false },
                            { label: 'Pagar cotizaciones', done: false },
                            { label: 'Libro de Remuneraciones', done: false },
                        ].map(({ label, done }, i) => (
                            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
                                <div style={{
                                    background: done ? 'rgba(37,211,102,0.15)' : 'rgba(128,90,213,0.1)',
                                    border: `1px solid ${done ? 'rgba(37,211,102,0.4)' : 'rgba(128,90,213,0.3)'}`,
                                    borderRadius: 8, padding: '7px 12px', fontSize: '0.76rem',
                                    color: done ? 'var(--color-accent)' : 'var(--color-purple)', fontWeight: 600,
                                    display: 'flex', alignItems: 'center', gap: 5,
                                }}>
                                    {done ? <CheckCircle size={12} /> : <Clock size={12} />}
                                    {label}
                                </div>
                                {i < 5 && <span style={{ color: 'var(--color-text-muted)' }}>→</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tabla Trabajadores */}
                <div className="card" style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: 14, color: 'var(--color-text-primary)' }}>
                        📋 Nómina — Inversiones Meridian SpA (Enero 2026)
                    </h3>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Trabajador</th>
                                    <th>RUT</th>
                                    <th>Cargo</th>
                                    <th>Centro Costo</th>
                                    <th>AFP</th>
                                    <th>Isapre/Fonasa</th>
                                    <th style={{ textAlign: 'right' }}>Sueldo Base</th>
                                    <th style={{ textAlign: 'right' }}>Descuentos</th>
                                    <th style={{ textAlign: 'right' }}>Líquido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockTrabajadores.map(t => {
                                    const descuentos = Math.round(t.sueldoBase * 0.235);
                                    const liquido = t.sueldoBase - descuentos;
                                    return (
                                        <tr key={t.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                    <div style={{
                                                        width: 30, height: 30, borderRadius: '50%',
                                                        background: 'var(--color-primary)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontSize: '0.65rem', fontWeight: 700, color: '#fff',
                                                    }}>
                                                        {t.nombre.charAt(0)}{t.apellido.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{t.nombre} {t.apellido}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.rut}</td>
                                            <td style={{ fontSize: '0.83rem' }}>{t.cargo}</td>
                                            <td><span className="badge badge-muted">{t.centroCosto}</span></td>
                                            <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.afp}</td>
                                            <td style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{t.isapre}</td>
                                            <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 600 }}>{formatCLP(t.sueldoBase)}</td>
                                            <td style={{ textAlign: 'right', fontFamily: 'monospace', color: 'var(--color-danger)' }}>({formatCLP(descuentos)})</td>
                                            <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-accent)' }}>{formatCLP(liquido)}</td>
                                        </tr>
                                    );
                                })}
                                <tr style={{ borderTop: '2px solid var(--color-border)' }}>
                                    <td colSpan={6} style={{ fontWeight: 700, fontSize: '0.85rem' }}>TOTALES</td>
                                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700 }}>{formatCLP(totalSueldobBase)}</td>
                                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-danger)' }}>({formatCLP(totalDescuentos)})</td>
                                    <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: 800, color: 'var(--color-accent)' }}>{formatCLP(totalSueldobBase - totalDescuentos)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Asiento generado */}
                    <div style={{ marginTop: 16 }}>
                        <h4 style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 10, color: 'var(--color-text-secondary)' }}>
                            📒 Asiento Contable Generado Automáticamente (Asiento #1844 — Estado: Borrador)
                        </h4>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Cuenta</th><th>Descripción</th>
                                        <th style={{ textAlign: 'right' }}>Debe</th>
                                        <th style={{ textAlign: 'right' }}>Haber</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { cuenta: '5201', desc: 'Remuneraciones', debe: 7200000, haber: 0 },
                                        { cuenta: '5202', desc: 'Previsión social costo empleador', debe: 1250000, haber: 0 },
                                        { cuenta: '2201', desc: 'Remuneraciones por pagar (líquido)', debe: 0, haber: 6100000 },
                                        { cuenta: '2202', desc: 'AFP / Isapre / AFC por pagar', debe: 0, haber: 2350000 },
                                    ].map(row => (
                                        <tr key={row.cuenta}>
                                            <td><span style={{ fontFamily: 'monospace', color: 'var(--color-accent)', fontWeight: 600 }}>{row.cuenta}</span></td>
                                            <td>{row.desc}</td>
                                            <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>{row.debe > 0 ? formatCLP(row.debe) : '—'}</td>
                                            <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>{row.haber > 0 ? formatCLP(row.haber) : '—'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                            <button className="btn btn-primary btn-sm"><CheckCircle size={12} /> Aprobar Asiento</button>
                            <button className="btn btn-secondary btn-sm">Ver detalle completo</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
