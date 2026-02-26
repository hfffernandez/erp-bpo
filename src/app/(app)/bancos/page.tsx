'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/Sidebar';
import { DataTable, StatusBadge, ProgressRing } from '@/components/ui';
import { mockMovBancarios, mockCxC, formatCLP } from '@/lib/mockData';
import type { MovimientoBancario, DocumentoCobro } from '@/types';
import {
    Landmark, RefreshCw, CheckCircle, AlertTriangle, Clock,
    Link2, Download, Search, Filter, ArrowUpRight, ArrowDownRight,
    Activity, BarChart3,
} from 'lucide-react';

// ─── Conciliación Bancaria Page ───────────────────────────────

export default function BancosPage() {
    const [matchedIds, setMatchedIds] = useState<string[]>(['mov-001', 'mov-002']);

    const movColumns = [
        {
            key: 'fecha', header: 'Fecha', width: '90px',
            render: (m: MovimientoBancario) => (
                <span style={{ fontSize: '0.83rem', color: 'var(--color-text-secondary)' }}>
                    {m.fecha.toLocaleDateString('es-CL')}
                </span>
            ),
        },
        {
            key: 'descripcion', header: 'Descripción / Banco',
            render: (m: MovimientoBancario) => (
                <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>{m.descripcion}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                        {m.banco} · Cta {m.cuentaBancaria} · Ref: {m.referencia || '—'}
                    </div>
                </div>
            ),
        },
        {
            key: 'monto', header: 'Monto', align: 'right' as const, width: '140px',
            render: (m: MovimientoBancario) => (
                <span style={{
                    fontFamily: 'monospace', fontWeight: 700, fontSize: '0.88rem',
                    color: m.monto > 0 ? 'var(--color-accent)' : 'var(--color-danger)',
                    display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end',
                }}>
                    {m.monto > 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                    {formatCLP(Math.abs(m.monto))}
                </span>
            ),
        },
        {
            key: 'estado', header: 'Estado Conciliación', width: '180px',
            render: (m: MovimientoBancario) => (
                <div>
                    <StatusBadge status={m.estado} />
                    {m.matchScore !== undefined && m.matchScore > 0 && (
                        <div style={{ marginTop: 3, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <div style={{ width: 40, height: 3, background: 'var(--color-border)', borderRadius: 2, overflow: 'hidden' }}>
                                <div style={{
                                    height: '100%', borderRadius: 2,
                                    width: `${m.matchScore}%`,
                                    background: m.matchScore > 90 ? 'var(--color-accent)' : m.matchScore > 60 ? 'var(--color-warning)' : 'var(--color-danger)',
                                }} />
                            </div>
                            <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                                {m.matchScore}% match
                            </span>
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'accion', header: '', width: '120px',
            render: (m: MovimientoBancario) => {
                if (m.estado === 'CONCILIADO') {
                    return <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>✓ Conciliado</span>;
                }
                if (m.estado === 'EN_REVISION') {
                    return (
                        <button className="btn btn-primary btn-sm">
                            <Link2 size={11} /> Conciliar
                        </button>
                    );
                }
                return (
                    <button onClick={() => setMatchedIds(p => [...p, m.id])} className="btn btn-secondary btn-sm">
                        <CheckCircle size={11} /> Revisar
                    </button>
                );
            }
        },
    ];

    const cxcColumns = [
        {
            key: 'empresa', header: 'RUT / Empresa',
            render: (c: DocumentoCobro) => (
                <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{c.razonSocial}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{c.rutContraparted}</div>
                </div>
            ),
        },
        {
            key: 'folio', header: 'Documento', width: '120px',
            render: (c: DocumentoCobro) => (
                <div style={{ fontSize: '0.83rem' }}>
                    <div>{c.tipoDTE}</div>
                    <div style={{ fontFamily: 'monospace', color: 'var(--color-text-muted)', fontSize: '0.72rem' }}>N° {c.folioDTE}</div>
                </div>
            ),
        },
        {
            key: 'vencimiento', header: 'Vencimiento', width: '115px',
            render: (c: DocumentoCobro) => (
                <div>
                    <div style={{ fontSize: '0.83rem' }}>{c.fechaVencimiento.toLocaleDateString('es-CL')}</div>
                    {c.diasVencimiento > 0 && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-danger)', fontWeight: 600 }}>
                            +{c.diasVencimiento} días
                        </div>
                    )}
                </div>
            ),
        },
        {
            key: 'monto', header: 'Pendiente', align: 'right' as const, width: '130px',
            render: (c: DocumentoCobro) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem', color: c.estado === 'VENCIDO' ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>
                    {formatCLP(c.montoPendiente)}
                </span>
            ),
        },
        {
            key: 'estado', header: 'Estado', width: '100px',
            render: (c: DocumentoCobro) => <StatusBadge status={c.estado} />,
        },
        {
            key: 'accion', header: '', width: '110px',
            render: (c: DocumentoCobro) => (
                c.estado !== 'PAGADO' ? (
                    <button className="btn btn-primary btn-sm">
                        Enviar cobro
                    </button>
                ) : (
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>✓ Pagado</span>
                )
            ),
        },
    ];

    const conciliadosCount = mockMovBancarios.filter(m => m.estado === 'CONCILIADO').length;
    const totalMovimientos = mockMovBancarios.length;
    const pctConciliado = Math.round((conciliadosCount / totalMovimientos) * 100);

    return (
        <>
            <Topbar
                title="Bancos & Conciliación"
                subtitle="Módulo E.3 · Conciliación bancaria automática · 8 bancos conectados"
                alertCount={1}
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm">
                            <RefreshCw size={13} /> Importar cartola
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <CheckCircle size={13} /> Conciliar todo
                        </button>
                    </div>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* ── Bancos conectados ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 10 }}>
                    {[
                        { banco: 'BCI', color: '#0050A0', cuentas: 2, saldo: 48320000 },
                        { banco: 'B.Chile', color: '#E30613', cuentas: 1, saldo: 9870000 },
                        { banco: 'Santander', color: '#EC0000', cuentas: 1, saldo: 22100000 },
                        { banco: 'Scotiabank', color: '#E8112D', cuentas: 1, saldo: 31500000 },
                        { banco: 'Itaú', color: '#F06E00', cuentas: 1, saldo: 67200000 },
                        { banco: 'BICE', color: '#004F9F', cuentas: 1, saldo: 4200000 },
                        { banco: 'Security', color: '#009A44', cuentas: 1, saldo: 12000000 },
                        { banco: 'BancoEstado', color: '#006A4E', cuentas: 2, saldo: 8400000 },
                    ].map(({ banco, color, cuentas, saldo }) => (
                        <div key={banco} style={{
                            background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                            borderTop: `3px solid ${color}`, borderRadius: 'var(--radius-md)', padding: '10px',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 3 }}>
                                {banco}
                            </div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--color-accent)', marginBottom: 4 }}>
                                {cuentas} cta{cuentas > 1 ? 's' : ''}. ●{' '}
                                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>Online</span>
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                                {formatCLP(saldo).replace('$', '')}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── KPIs + Circuito Automatico ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16 }}>

                    {/* Progress Ring Card */}
                    <div className="card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 20, minWidth: 280 }}>
                        <ProgressRing
                            value={pctConciliado}
                            size={90}
                            strokeWidth={8}
                            color="var(--color-accent)"
                            label={`${pctConciliado}%`}
                        />
                        <div>
                            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                                {conciliadosCount}/{totalMovimientos}
                            </div>
                            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>
                                Movimientos conciliados
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <div style={{ display: 'flex', gap: 8, fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-accent)' }}>●</span>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Auto-conciliados: {conciliadosCount}</span>
                                </div>
                                <div style={{ display: 'flex', gap: 8, fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-warning)' }}>●</span>
                                    <span style={{ color: 'var(--color-text-muted)' }}>En revisión: 1</span>
                                </div>
                                <div style={{ display: 'flex', gap: 8, fontSize: '0.75rem' }}>
                                    <span style={{ color: 'var(--color-danger)' }}>●</span>
                                    <span style={{ color: 'var(--color-text-muted)' }}>Diferencias: 1</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Flujo Automatico */}
                    <div style={{
                        background: 'rgba(99,179,255,0.05)', border: '1px solid rgba(99,179,255,0.2)',
                        borderRadius: 'var(--radius-lg)', padding: '16px 20px',
                        display: 'flex', flexDirection: 'column', gap: 12,
                    }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-info)' }}>
                            🏦 Flujo Automático de Conciliación
                        </h3>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', overflowX: 'auto' }}>
                            {[
                                { step: '1. Importación cartola', status: 'done', note: 'Diaria 00:00 hrs' },
                                { step: '2. Motor Multi-criterio', status: 'done', note: 'Monto ± fecha ± referencia' },
                                { step: '3. Match perfecto', status: 'done', note: 'Auto-concilia + asiento' },
                                { step: '4. Match dudoso', status: 'pending', note: 'Cola revisión manual' },
                                { step: '5. Papeles de trabajo', status: 'pending', note: 'PDF/Excel exportable' },
                            ].map(({ step, status, note }, i) => (
                                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{
                                        background: status === 'done' ? 'rgba(37,211,102,0.15)' : 'rgba(99,179,255,0.1)',
                                        border: `1px solid ${status === 'done' ? 'rgba(37,211,102,0.4)' : 'rgba(99,179,255,0.3)'}`,
                                        borderRadius: 8, padding: '8px 12px', fontSize: '0.75rem', whiteSpace: 'nowrap',
                                    }}>
                                        <div style={{ color: status === 'done' ? 'var(--color-accent)' : 'var(--color-info)', fontWeight: 600 }}>
                                            {status === 'done' ? '✓' : '○'} {step}
                                        </div>
                                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: 2 }}>{note}</div>
                                    </div>
                                    {i < 4 && <span style={{ color: 'var(--color-text-muted)', fontSize: 18 }}>→</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Movimientos Bancarios ──── */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            Movimientos Bancarios — BCI Cta. 10-000-12345-6
                        </h2>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-secondary btn-sm"><Filter size={12} /></button>
                            <button className="btn btn-secondary btn-sm"><Download size={12} /> Papel trabajo</button>
                        </div>
                    </div>
                    <DataTable
                        columns={movColumns}
                        data={mockMovBancarios}
                        keyExtractor={(m) => m.id}
                    />
                </div>

                {/* ── CxC Aging Report ──── */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                        <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                            📊 Aging Report — Cuentas por Cobrar (Todas las empresas)
                        </h2>
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button className="btn btn-primary btn-sm">
                                🔗 Enviar cobro masivo
                            </button>
                        </div>
                    </div>

                    {/* Aging buckets */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 14 }}>
                        {[
                            { bucket: 'Por vencer', days: '0-30 días', monto: 2499999, count: 1, color: 'var(--color-accent)' },
                            { bucket: 'Vencido', days: '31-60 días', monto: 10000000, count: 1, color: 'var(--color-warning)' },
                            { bucket: 'Vencido', days: '61-90 días', monto: 3800000, count: 1, color: 'var(--color-danger)' },
                            { bucket: 'Crítico', days: '91-120 días', monto: 0, count: 0, color: 'var(--color-danger)' },
                            { bucket: 'Incobrable', days: '+121 días', monto: 0, count: 0, color: '#555' },
                        ].map(({ bucket, days, monto, count, color }) => (
                            <div key={days} style={{
                                background: 'var(--color-bg-card)', border: `1px solid ${color}30`,
                                borderTop: `3px solid ${color}`, borderRadius: 'var(--radius-md)', padding: '12px',
                            }}>
                                <div style={{ fontSize: '0.72rem', color, fontWeight: 700, marginBottom: 3 }}>{bucket}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>{days}</div>
                                <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.88rem', color: monto > 0 ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                                    {monto > 0 ? formatCLP(monto) : '—'}
                                </div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                                    {count} documento{count !== 1 ? 's' : ''}
                                </div>
                            </div>
                        ))}
                    </div>

                    <DataTable
                        columns={cxcColumns}
                        data={mockCxC}
                        keyExtractor={(c) => c.id}
                    />
                </div>

            </div>
        </>
    );
}
