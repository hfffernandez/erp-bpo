'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/Sidebar';
import { DataTable, StatusBadge, AIConfidenceBadge } from '@/components/ui';
import { mockDTEs, mockAsientos, formatCLP } from '@/lib/mockData';
import type { DTE, Asiento } from '@/types';
import {
    FileText, Plus, RefreshCw, Filter, Search, CheckCircle, Clock,
    AlertTriangle, Download, Eye, Zap, Building2, ChevronRight,
} from 'lucide-react';

// ─── Facturación DTE Page ─────────────────────────────────────

export default function FacturacionPage() {
    const [tab, setTab] = useState<'dte' | 'asientos'>('dte');
    const [filterEstado, setFilterEstado] = useState('TODOS');

    const filteredDTEs = mockDTEs.filter(d =>
        filterEstado === 'TODOS' || d.estado === filterEstado
    );

    const dteColumns = [
        {
            key: 'folio', header: 'Folio / Tipo', width: '200px',
            render: (d: DTE) => (
                <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.88rem' }}>
                        N° {d.folio}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                        Tipo {d.tipo} · {d.tipoDescripcion}
                    </div>
                </div>
            ),
        },
        {
            key: 'receptor', header: 'RUT Receptor / Empresa',
            render: (d: DTE) => (
                <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{d.razonSocialReceptor}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{d.rutReceptor}</div>
                </div>
            ),
        },
        {
            key: 'fecha', header: 'Fecha Emisión', width: '110px',
            render: (d: DTE) => (
                <span style={{ fontSize: '0.83rem', color: 'var(--color-text-secondary)' }}>
                    {d.fechaEmision.toLocaleDateString('es-CL')}
                </span>
            ),
        },
        {
            key: 'monto', header: 'Monto Total', align: 'right' as const, width: '140px',
            render: (d: DTE) => (
                <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', fontFamily: 'monospace' }}>{formatCLP(d.montoTotal)}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                        Neto: {formatCLP(d.montoNeto)} · IVA: {formatCLP(d.montoIva)}
                    </div>
                </div>
            ),
        },
        {
            key: 'estado', header: 'Estado SII', width: '110px',
            render: (d: DTE) => <StatusBadge status={d.estado} />,
        },
        {
            key: 'clasificacion', header: 'IA Contable', width: '150px',
            render: (d: DTE) => (
                <div>
                    {d.cuentaContable ? (
                        <div>
                            <div style={{ fontSize: '0.78rem', fontFamily: 'monospace', color: 'var(--color-accent)', marginBottom: 2 }}>
                                {d.cuentaContable}
                            </div>
                            <AIConfidenceBadge confidence={d.clasificacionAI} />
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <AlertTriangle size={13} color="var(--color-warning)" />
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-warning)' }}>Sin clasificar</span>
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'acciones', header: '', width: '80px',
            render: (d: DTE) => (
                <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn-icon" style={{ padding: 5 }}><Eye size={13} /></button>
                </div>
            ),
        },
    ];

    const asientoColumns = [
        {
            key: 'numero', header: 'N° Asiento', width: '120px',
            render: (a: Asiento) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    #{a.numero}
                </span>
            ),
        },
        {
            key: 'fecha', header: 'Fecha', width: '100px',
            render: (a: Asiento) => (
                <span style={{ fontSize: '0.83rem', color: 'var(--color-text-secondary)' }}>
                    {a.fecha.toLocaleDateString('es-CL')}
                </span>
            ),
        },
        {
            key: 'glosa', header: 'Glosa',
            render: (a: Asiento) => (
                <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{a.glosa}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                        Tipo: {a.tipo} · {a.lineas.length} líneas
                    </div>
                </div>
            ),
        },
        {
            key: 'debe', header: 'Total Debe', align: 'right' as const, width: '130px',
            render: (a: Asiento) => (
                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    {formatCLP(a.totalDebe)}
                </span>
            ),
        },
        {
            key: 'haber', header: 'Total Haber', align: 'right' as const, width: '130px',
            render: (a: Asiento) => (
                <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                    {formatCLP(a.totalHaber)}
                </span>
            ),
        },
        {
            key: 'estado', header: 'Estado', width: '120px',
            render: (a: Asiento) => (
                <div>
                    <StatusBadge status={a.estado} />
                    {a.confianzaAI && (
                        <div style={{ marginTop: 3 }}>
                            <AIConfidenceBadge confidence={a.confianzaAI} />
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'aprobacion', header: 'Aprobación',
            render: (a: Asiento) => (
                a.estado === 'BORRADOR' ? (
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-primary btn-sm">
                            <CheckCircle size={12} /> Aprobar
                        </button>
                    </div>
                ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        ✓ {a.aprobadoPor}
                    </span>
                )
            ),
        },
    ];

    return (
        <>
            <Topbar
                title="Facturación & DTE"
                subtitle="Módulo A · Portal de Clientes · Circuito Cerrado SII → Contabilidad"
                alertCount={3}
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm">
                            <RefreshCw size={13} /> Sync SII
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <Plus size={13} /> Emitir DTE
                        </button>
                    </div>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* ── Stats Row ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                    {[
                        { label: 'DTE Emitidos hoy', value: '4', icon: <FileText size={15} />, color: 'var(--color-accent)' },
                        { label: 'Aceptados SII', value: '12', icon: <CheckCircle size={15} />, color: 'var(--color-accent)' },
                        { label: 'Sin clasificar (IA)', value: '3', icon: <AlertTriangle size={15} />, color: 'var(--color-warning)' },
                        { label: 'Asientos Borrador', value: '3', icon: <Clock size={15} />, color: 'var(--color-purple)' },
                        { label: 'Auto-clasificados', value: '89%', icon: <Zap size={15} />, color: 'var(--color-info)' },
                    ].map(({ label, value, icon, color }) => (
                        <div key={label} className="kpi-card" style={{ '--accent-color': color, padding: '16px' } as any}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{label}</span>
                                <span style={{ color }}>{icon}</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{value}</div>
                        </div>
                    ))}
                </div>

                {/* ── Flujo Circuito Cerrado ──── */}
                <div style={{
                    background: 'rgba(37,211,102,0.05)', border: '1px solid rgba(37,211,102,0.2)',
                    borderRadius: 'var(--radius-lg)', padding: '16px 20px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, overflowX: 'auto' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', whiteSpace: 'nowrap' }}>
                            🔄 CIRCUITO CERRADO:
                        </span>
                        {[
                            'Cliente emite DTE',
                            'SII valida & acepta',
                            'Motor IA clasifica',
                            'Pre-asiento generado',
                            'Contador aprueba',
                            'Libro Mayor actualizado',
                            'RCV sincronizado',
                        ].map((step, i) => (
                            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                                <div style={{
                                    background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
                                    borderRadius: 20, padding: '4px 12px', fontSize: '0.75rem',
                                    color: i < 5 ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                                    fontWeight: i < 5 ? 600 : 400,
                                }}>
                                    {i + 1}. {step}
                                </div>
                                {i < 6 && <ChevronRight size={12} color="var(--color-text-muted)" />}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Tabs ──── */}
                <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--color-border)' }}>
                    {[
                        { key: 'dte', label: `DTE Emitidos/Recibidos (${mockDTEs.length})` },
                        { key: 'asientos', label: `Asientos Contables (${mockAsientos.length})` },
                    ].map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setTab(key as any)}
                            style={{
                                padding: '10px 20px', background: 'none', border: 'none',
                                borderBottom: `2px solid ${tab === key ? 'var(--color-accent)' : 'transparent'}`,
                                color: tab === key ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                cursor: 'pointer', fontSize: '0.86rem', fontWeight: tab === key ? 700 : 500,
                                marginBottom: -1, transition: 'all 150ms ease',
                            }}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* ── Filters ──── */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '8px 12px', flex: 1, maxWidth: 340 }}>
                        <Search size={14} color="var(--color-text-muted)" />
                        <input
                            placeholder="Buscar por folio, RUT, razón social..."
                            className="input"
                            style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.83rem' }}
                        />
                    </div>
                    <select
                        className="input"
                        style={{ width: 'auto', padding: '8px 12px' }}
                        value={filterEstado}
                        onChange={(e) => setFilterEstado(e.target.value)}
                    >
                        <option value="TODOS">Todos los estados</option>
                        <option value="ACEPTADO">Aceptados</option>
                        <option value="ENVIADO">Enviados</option>
                        <option value="RECHAZADO">Rechazados</option>
                        <option value="BORRADOR">Borrador</option>
                    </select>
                    <button className="btn btn-secondary btn-sm">
                        <Filter size={13} /> Filtros
                    </button>
                    <button className="btn btn-secondary btn-sm">
                        <Download size={13} /> Exportar
                    </button>
                </div>

                {/* ── Content ──── */}
                {tab === 'dte' ? (
                    <DataTable
                        columns={dteColumns}
                        data={filteredDTEs}
                        keyExtractor={(d) => d.id}
                    />
                ) : (
                    <div>
                        {/* Asientos pendientes banner */}
                        {mockAsientos.filter(a => a.estado === 'BORRADOR').length > 0 && (
                            <div className="alert alert-warning" style={{ marginBottom: 16 }}>
                                <Clock size={15} />
                                <div>
                                    <strong>{mockAsientos.filter(a => a.estado === 'BORRADOR').length} asientos en borrador</strong> pendientes de aprobación.
                                    <button className="btn btn-primary btn-sm" style={{ marginLeft: 12 }}>
                                        ✓ Aprobar todo en lote
                                    </button>
                                </div>
                            </div>
                        )}
                        <DataTable
                            columns={asientoColumns}
                            data={mockAsientos}
                            keyExtractor={(a) => a.id}
                        />
                        {/* Detalle de lineas del primer asiento */}
                        <div className="card" style={{ marginTop: 16, padding: '20px' }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-text-primary)' }}>
                                📋 Detalle Asiento #1842 — Generado por IA con 97% confianza
                            </h4>
                            <div className="table-container">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Cuenta</th>
                                            <th>Descripción</th>
                                            <th style={{ textAlign: 'right' }}>Debe</th>
                                            <th style={{ textAlign: 'right' }}>Haber</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockAsientos[0].lineas.map(linea => (
                                            <tr key={linea.id}>
                                                <td><span style={{ fontFamily: 'monospace', color: 'var(--color-accent)', fontWeight: 600 }}>{linea.cuenta}</span></td>
                                                <td>{linea.cuentaDescripcion}</td>
                                                <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                                                    {linea.debe > 0 ? formatCLP(linea.debe) : '—'}
                                                </td>
                                                <td style={{ textAlign: 'right', fontFamily: 'monospace' }}>
                                                    {linea.haber > 0 ? formatCLP(linea.haber) : '—'}
                                                </td>
                                            </tr>
                                        ))}
                                        <tr style={{ borderTop: '2px solid var(--color-border)' }}>
                                            <td colSpan={2} style={{ fontWeight: 700 }}>TOTALES</td>
                                            <td style={{ textAlign: 'right', fontWeight: 700, fontFamily: 'monospace' }}>
                                                {formatCLP(mockAsientos[0].totalDebe)}
                                            </td>
                                            <td style={{ textAlign: 'right', fontWeight: 700, fontFamily: 'monospace' }}>
                                                {formatCLP(mockAsientos[0].totalHaber)}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="alert alert-success" style={{ marginTop: 12 }}>
                                <CheckCircle size={14} />
                                <span>Asiento cuadrado correctamente (Debe = Haber). Aprobado por Catalina Fuentes el {mockAsientos[0].fecha.toLocaleDateString('es-CL')}.</span>
                            </div>
                        </div>
                    </div>
                )}

            </div >
        </>
    );
}
