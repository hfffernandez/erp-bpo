'use client';

import { Topbar } from '@/components/layout/Sidebar';
import { DataTable, StatusBadge, KPICard } from '@/components/ui';
import { mockEmpresas, formatCLP } from '@/lib/mockData';
import type { Empresa } from '@/types';
import {
    Building2, Plus, Search, Filter, RefreshCw, AlertTriangle,
    ChevronRight, MoreHorizontal, Eye,
} from 'lucide-react';

// ─── Empresas Page ────────────────────────────────────────────

export default function EmpresasPage() {
    const empresasColumns = [
        {
            key: 'empresa', header: 'Empresa',
            render: (e: Empresa) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: `linear-gradient(135deg, var(--color-primary), #5a0320)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                        boxShadow: 'var(--shadow-sm)',
                    }}>
                        {e.nombreFantasia.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-text-primary)', marginBottom: 1 }}>
                            {e.razonSocial}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                            RUT: {e.rut} · {e.giro.slice(0, 35)}{e.giro.length > 35 ? '…' : ''}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'regimen', header: 'Régimen', width: '100px',
            render: (e: Empresa) => (
                <span className="badge badge-purple" style={{ fontSize: '0.72rem' }}>
                    Art. {e.regimen}
                </span>
            ),
        },
        {
            key: 'cierre', header: 'Estado Período', width: '140px',
            render: (e: Empresa) => (
                <div>
                    <StatusBadge status={e.estadoCierre} />
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                        {e.periodoActual}
                    </div>
                </div>
            ),
        },
        {
            key: 'equipo', header: 'Equipo Asignado', width: '180px',
            render: (e: Empresa) => (
                <div style={{ fontSize: '0.82rem' }}>
                    <div style={{ color: 'var(--color-text-secondary)', marginBottom: 1 }}>
                        🧾 {e.contadorResponsable}
                    </div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                        💬 {e.ejecutivoAsignado}
                    </div>
                </div>
            ),
        },
        {
            key: 'financiero', header: 'Saldo Banco / CxC', align: 'right' as const, width: '160px',
            render: (e: Empresa) => (
                <div style={{ textAlign: 'right', fontSize: '0.82rem' }}>
                    <div style={{ fontWeight: 700, fontFamily: 'monospace' }}>{formatCLP(e.saldoBancario)}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                        CxC: {formatCLP(e.cxcTotal)}
                    </div>
                </div>
            ),
        },
        {
            key: 'alertas', header: 'Alertas', align: 'center' as const, width: '80px',
            render: (e: Empresa) => (
                e.alertas > 0 ? (
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        background: e.alertas > 5 ? 'rgba(229,62,62,0.15)' : 'rgba(245,166,35,0.15)',
                        color: e.alertas > 5 ? 'var(--color-danger)' : 'var(--color-warning)',
                        borderRadius: 9999, padding: '2px 8px', fontSize: '0.75rem', fontWeight: 700,
                    }}>
                        <AlertTriangle size={11} />
                        {e.alertas}
                    </div>
                ) : (
                    <span style={{ color: 'var(--color-accent)', fontSize: '0.75rem' }}>◉ OK</span>
                )
            ),
        },
        {
            key: 'acciones', header: '', width: '80px',
            render: (e: Empresa) => (
                <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn-icon" style={{ padding: 6 }}><Eye size={13} /></button>
                    <button className="btn-icon" style={{ padding: 6 }}><MoreHorizontal size={13} /></button>
                </div>
            ),
        },
    ];

    const byEstado = (estado: string) => mockEmpresas.filter(e => e.estadoCierre === estado).length;

    return (
        <>
            <Topbar
                title="Cartera de Empresas"
                subtitle="Gestión multi-empresa · Vista consolidada del BPO"
                alertCount={mockEmpresas.reduce((sum, e) => sum + e.alertas, 0)}
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm">
                            <RefreshCw size={13} /> Sync Todo
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <Plus size={13} /> Nueva Empresa
                        </button>
                    </div>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* ── Resumen Cartera ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    <KPICard title="Total Empresas" value={mockEmpresas.length} trend={8.3} trendLabel="este mes" accentColor="var(--color-accent)" />
                    <KPICard title="Al Día" value={byEstado('AL_DIA')} accentColor="var(--color-accent)" subvalue={`${Math.round((byEstado('AL_DIA') / mockEmpresas.length) * 100)}% de la cartera`} />
                    <KPICard title="Con Alertas" value={mockEmpresas.filter(e => e.alertas > 0).length} accentColor="var(--color-warning)" subvalue="Requieren atención" />
                    <KPICard title="Bloqueadas" value={byEstado('BLOQUEADO')} accentColor="var(--color-danger)" subvalue="Períodos sin cerrar" />
                </div>

                {/* ── Estado por régimen ──── */}
                <div style={{
                    display: 'flex', gap: 12, flexWrap: 'wrap',
                    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)', padding: '16px 20px',
                }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', alignSelf: 'center', marginRight: 8, fontWeight: 600 }}>
                        Por Régimen:
                    </span>
                    {[
                        { label: 'Art. 14A', count: mockEmpresas.filter(e => e.regimen === '14A').length, color: 'var(--color-purple)' },
                        { label: 'Art. 14D Semi-integrado', count: mockEmpresas.filter(e => e.regimen === '14D').length, color: 'var(--color-info)' },
                        { label: 'Art. 14D N°8 ProPyme', count: mockEmpresas.filter(e => e.regimen === '14D8').length, color: 'var(--color-accent)' },
                    ].map(({ label, count, color }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 14px' }}>
                            <span style={{ color, fontWeight: 700, fontSize: '1.1rem' }}>{count}</span>
                            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)' }}>{label}</span>
                        </div>
                    ))}
                    <div style={{ width: 1, background: 'var(--color-border)', alignSelf: 'stretch' }} />
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', alignSelf: 'center', marginRight: 8, fontWeight: 600 }}>
                        Por Sector:
                    </span>
                    {['SERVICIOS', 'RETAIL', 'CONSTRUCCION', 'AGRICOLA', 'INMOBILIARIO'].map(sector => (
                        <div key={sector} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem' }}>
                            <span style={{ color: 'var(--color-text-secondary)' }}>
                                {sector === 'SERVICIOS' ? '💼' : sector === 'RETAIL' ? '🛍️' : sector === 'CONSTRUCCION' ? '🏗️' : sector === 'AGRICOLA' ? '🌾' : '🏢'}
                                {' '}{sector.charAt(0) + sector.slice(1).toLowerCase()}
                            </span>
                            <span style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                {mockEmpresas.filter(e => e.sector === sector).length}
                            </span>
                        </div>
                    ))}
                </div>

                {/* ── Filters ──── */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '8px 12px', flex: 1, maxWidth: 380 }}>
                        <Search size={14} color="var(--color-text-muted)" />
                        <input placeholder="Buscar por RUT, razón social, giro, contador..." className="input" style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.83rem' }} />
                    </div>
                    <select className="input" style={{ width: 'auto', padding: '8px 12px' }}>
                        <option>Todos los estados</option>
                        <option>Al día</option>
                        <option>Pendientes</option>
                        <option>Atrasadas</option>
                        <option>Bloqueadas</option>
                    </select>
                    <select className="input" style={{ width: 'auto', padding: '8px 12px' }}>
                        <option>Todos los contadores</option>
                        <option>Catalina Fuentes</option>
                        <option>Andrés Morales</option>
                        <option>Francisca Pinto</option>
                    </select>
                    <button className="btn btn-secondary btn-sm">
                        <Filter size={13} /> Más filtros
                    </button>
                </div>

                {/* ── Tabla ──── */}
                <DataTable
                    columns={empresasColumns}
                    data={mockEmpresas}
                    keyExtractor={(e) => e.id}
                />

                {/* ── Alertas criticas ──── */}
                <div style={{
                    background: 'rgba(229,62,62,0.05)', border: '1px solid rgba(229,62,62,0.2)',
                    borderRadius: 'var(--radius-lg)', padding: '16px 20px',
                }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-danger)', marginBottom: 10 }}>
                        ⚠️ Empresas que Requieren Acción Inmediata
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {mockEmpresas.filter(e => e.estadoCierre === 'ATRASADO' || e.estadoCierre === 'BLOQUEADO').map(e => (
                            <div key={e.id} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)',
                                borderRadius: 8, padding: '10px 14px',
                            }}>
                                <AlertTriangle size={16} color={e.estadoCierre === 'BLOQUEADO' ? 'var(--color-danger)' : 'var(--color-warning)'} />
                                <div style={{ flex: 1 }}>
                                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>{e.razonSocial}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginLeft: 8 }}>
                                        Período {e.periodoActual} sin cerrar · {e.alertas} alertas activas
                                    </span>
                                </div>
                                <StatusBadge status={e.estadoCierre} />
                                <button className="btn btn-secondary btn-sm">
                                    Resolver <ChevronRight size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}
