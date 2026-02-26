'use client';

import { Topbar } from '@/components/layout/Sidebar';
import { KPICard } from '@/components/ui';
import { mockDTEs, formatCLP } from '@/lib/mockData';
import {
    ShieldCheck, AlertTriangle, CheckCircle, RefreshCw,
    BarChart3, FileText, TrendingUp,
} from 'lucide-react';

// ─── Monitor SII Page ─────────────────────────────────────────

const ESTADOS_MONITOR = [
    {
        empresa: 'INVERSIONES MERIDIAN SpA',
        rut: '76.123.456-7',
        periodo: 'Enero 2026',
        estadoSII: 'SIN_DIFERENCIAS',
        dteSII: 12,
        dteERP: 12,
        debitoSII: 9850000,
        debitoERP: 9850000,
        creditoSII: 3200000,
        creditoERP: 3200000,
        ivaAPagarSII: 6650000,
        ivaAPagarERP: 6650000,
    },
    {
        empresa: 'COMERCIALIZADORA DEL SUR Ltda.',
        rut: '77.654.321-K',
        periodo: 'Enero 2026',
        estadoSII: 'DIFERENCIAS_MENORES',
        dteSII: 24,
        dteERP: 23,
        debitoSII: 19000000,
        debitoERP: 19000000,
        creditoSII: 12400000,
        creditoERP: 12050000,
        ivaAPagarSII: 6600000,
        ivaAPagarERP: 6950000,
    },
    {
        empresa: 'CONSTRUCTORA ANDINA SA',
        rut: '76.889.100-3',
        periodo: 'Dic 2025',
        estadoSII: 'DIFERENCIAS_CRITICAS',
        dteSII: 8,
        dteERP: 8,
        debitoSII: 149000000,
        debitoERP: 146660000,
        creditoSII: 38000000,
        creditoERP: 38000000,
        ivaAPagarSII: 111000000,
        ivaAPagarERP: 108660000,
    },
    {
        empresa: 'AGRÍCOLA SANTA ELENA SpA',
        rut: '78.456.789-2',
        periodo: 'Enero 2026',
        estadoSII: 'SIN_DIFERENCIAS',
        dteSII: 15,
        dteERP: 15,
        debitoSII: 0,
        debitoERP: 0,
        creditoSII: 4200000,
        creditoERP: 4200000,
        ivaAPagarSII: -4200000,
        ivaAPagarERP: -4200000,
    },
];

export default function SIIPage() {
    const getEstadoConfig = (estado: string) => {
        if (estado === 'SIN_DIFERENCIAS') return { label: 'Sin diferencias', icon: '🟢', color: 'var(--color-accent)', cls: 'badge-success' };
        if (estado === 'DIFERENCIAS_MENORES') return { label: 'Dif. menores', icon: '🟡', color: 'var(--color-warning)', cls: 'badge-warning' };
        return { label: 'DIFERENCIAS CRÍTICAS', icon: '🔴', color: 'var(--color-danger)', cls: 'badge-danger' };
    };

    return (
        <>
            <Topbar
                title="Monitor SII · RCV en Tiempo Real"
                subtitle="Módulo C · Registro de Compras y Ventas — ERP vs SII"
                alertCount={2}
                actions={
                    <button className="btn btn-primary btn-sm">
                        <RefreshCw size={13} /> Sync RCV Ahora
                    </button>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    <KPICard title="Empresas Sincronizadas" value="6/6" accentColor="var(--color-accent)" subvalue="Certificados digitales activos" />
                    <KPICard title="Sin Diferencias" value={ESTADOS_MONITOR.filter(e => e.estadoSII === 'SIN_DIFERENCIAS').length} accentColor="var(--color-accent)" />
                    <KPICard title="Dif. Menores" value={ESTADOS_MONITOR.filter(e => e.estadoSII === 'DIFERENCIAS_MENORES').length} accentColor="var(--color-warning)" subvalue="Requieren revisión" />
                    <KPICard title="Dif. Críticas" value={ESTADOS_MONITOR.filter(e => e.estadoSII === 'DIFERENCIAS_CRITICAS').length} accentColor="var(--color-danger)" subvalue="Acción inmediata" />
                </div>

                {/* Info banner de conexion SII */}
                <div className="alert alert-success">
                    <ShieldCheck size={16} />
                    <div>
                        <strong>Conexión SII activa.</strong> Última sincronización: 26/02/2026 16:00 hrs.
                        Se consumen los servicios web SOAP del SII (autenticación por certificado digital) para cada empresa gestionada.
                        Polling automático cada 15 minutos. El sistema compara el RCV del SII contra los registros del ERP en tiempo real.
                    </div>
                </div>

                {/* Monitor por empresa */}
                <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                    Dashboard RCV — Semáforo de Estado por Empresa
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {ESTADOS_MONITOR.map((empresa) => {
                        const cfg = getEstadoConfig(empresa.estadoSII);
                        const diffDTE = empresa.dteSII - empresa.dteERP;
                        const diffDebito = empresa.debitoSII - empresa.debitoERP;
                        const diffIVA = empresa.ivaAPagarSII - empresa.ivaAPagarERP;

                        return (
                            <div key={empresa.rut} className="card" style={{ padding: '20px', borderLeft: `4px solid ${cfg.color}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                                            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                                {empresa.empresa}
                                            </h3>
                                            <span className={`badge ${cfg.cls}`}>{cfg.icon} {cfg.label}</span>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                                            RUT {empresa.rut} · Período: {empresa.periodo}
                                        </div>
                                    </div>
                                    {empresa.estadoSII !== 'SIN_DIFERENCIAS' && (
                                        <button className="btn btn-primary btn-sm">
                                            Resolver diferencias
                                        </button>
                                    )}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                                    {/* DTE Count */}
                                    <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 8, padding: '12px' }}>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>
                                            <FileText size={11} style={{ display: 'inline', marginRight: 4 }} />
                                            Documentos
                                        </div>
                                        <div style={{ display: 'flex', gap: 16 }}>
                                            <div>
                                                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>SII</div>
                                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{empresa.dteSII}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>ERP</div>
                                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{empresa.dteERP}</div>
                                            </div>
                                            <div>
                                                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Diff</div>
                                                <div style={{ fontWeight: 700, fontSize: '1rem', color: diffDTE !== 0 ? 'var(--color-danger)' : 'var(--color-accent)' }}>
                                                    {diffDTE !== 0 ? `${diffDTE > 0 ? '+' : ''}${diffDTE}` : '✓'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Débito Fiscal */}
                                    <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 8, padding: '12px' }}>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>
                                            <TrendingUp size={11} style={{ display: 'inline', marginRight: 4 }} />
                                            Débito Fiscal
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>SII:</span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{formatCLP(empresa.debitoSII)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>ERP:</span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{formatCLP(empresa.debitoERP)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: 3 }}>
                                                <span style={{ color: diffDebito !== 0 ? 'var(--color-danger)' : 'var(--color-accent)' }}>Δ:</span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: diffDebito !== 0 ? 'var(--color-danger)' : 'var(--color-accent)' }}>
                                                    {diffDebito !== 0 ? formatCLP(diffDebito) : '✓ OK'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Crédito Fiscal */}
                                    <div style={{ background: 'var(--color-bg-elevated)', borderRadius: 8, padding: '12px' }}>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>
                                            <BarChart3 size={11} style={{ display: 'inline', marginRight: 4 }} />
                                            Crédito Fiscal
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>SII:</span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{formatCLP(empresa.creditoSII)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>ERP:</span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>{formatCLP(empresa.creditoERP)}</span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', borderTop: '1px solid var(--color-border)', paddingTop: 3 }}>
                                                <span style={{ color: empresa.creditoSII !== empresa.creditoERP ? 'var(--color-danger)' : 'var(--color-accent)' }}>Δ:</span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: empresa.creditoSII !== empresa.creditoERP ? 'var(--color-danger)' : 'var(--color-accent)' }}>
                                                    {empresa.creditoSII !== empresa.creditoERP ? formatCLP(empresa.creditoSII - empresa.creditoERP) : '✓ OK'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* IVA a Pagar */}
                                    <div style={{
                                        background: diffIVA !== 0 ? 'rgba(229,62,62,0.08)' : 'rgba(37,211,102,0.08)',
                                        border: `1px solid ${diffIVA !== 0 ? 'rgba(229,62,62,0.3)' : 'rgba(37,211,102,0.3)'}`,
                                        borderRadius: 8, padding: '12px',
                                    }}>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>
                                            🧾 IVA a Pagar (F29)
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>SII:</span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: empresa.ivaAPagarSII < 0 ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
                                                    {formatCLP(Math.abs(empresa.ivaAPagarSII))}{empresa.ivaAPagarSII < 0 ? ' (Remanente)' : ''}
                                                </span>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                                <span style={{ color: 'var(--color-text-muted)' }}>ERP:</span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                                    {formatCLP(Math.abs(empresa.ivaAPagarERP))}{empresa.ivaAPagarERP < 0 ? ' (Remanente)' : ''}
                                                </span>
                                            </div>
                                            <div style={{
                                                display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem',
                                                borderTop: '1px solid var(--color-border)', paddingTop: 3, marginTop: 1,
                                            }}>
                                                <span style={{ color: diffIVA !== 0 ? 'var(--color-danger)' : 'var(--color-accent)', fontWeight: 700 }}>
                                                    {diffIVA !== 0 ? '⚠️ Δ:' : '✓ Cuadra:'}
                                                </span>
                                                <span style={{ fontFamily: 'monospace', fontWeight: 800, color: diffIVA !== 0 ? 'var(--color-danger)' : 'var(--color-accent)' }}>
                                                    {diffIVA !== 0 ? formatCLP(Math.abs(diffIVA)) : 'CORRECTO'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {empresa.estadoSII === 'DIFERENCIAS_CRITICAS' && (
                                    <div className="alert alert-danger" style={{ marginTop: 12 }}>
                                        <AlertTriangle size={14} />
                                        <div>
                                            <strong>Diferencia crítica detectada: {formatCLP(Math.abs(diffIVA))} en IVA a pagar.</strong>
                                            {' '}El RCV del SII no coincide con los registros del ERP para {empresa.periodo}.
                                            Esto puede generar inconsistencias en la declaración del F29.
                                            <strong> Acción requerida: Revisar facturas pendientes de ingreso en ERP antes del cierre del período.</strong>
                                        </div>
                                    </div>
                                )}

                                {empresa.estadoSII === 'DIFERENCIAS_MENORES' && (
                                    <div className="alert alert-warning" style={{ marginTop: 12 }}>
                                        <AlertTriangle size={14} />
                                        <div>
                                            <strong>1 DTE presente en SII pero no en ERP</strong> (diferencia de 1 documento).
                                            Verificar si existe una factura de proveedor sin ingresar. Crédito fiscal diferencial: {formatCLP(Math.abs(350000))}.
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>
        </>
    );
}
