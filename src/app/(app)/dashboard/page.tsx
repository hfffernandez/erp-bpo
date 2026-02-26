'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/Sidebar';
import { KPICard, AlertBanner, DataTable, StatusBadge, SectorBadge } from '@/components/ui';
import {
    mockEmpresas, mockAlertas, mockTickets, mockChartData,
    getTotalesDashboard, formatCLP,
} from '@/lib/mockData';
import type { Empresa } from '@/types';
import {
    Plus, RefreshCw, Building2, AlertTriangle, MessageSquare,
    FileText, BookOpen, DollarSign, Zap, CheckCircle,
    TrendingUp, Activity, Database, Wifi, Server,
} from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

// ─── Colores semánticos para charts (light-mode friendly) ─────
const CHART_GREEN = '#25D366';
const CHART_RED = '#C0392B';
const CHART_BLUE = '#2980B9';
const CHART_PURPLE = '#7D3C98';
const CHART_AMBER = '#E67E22';

const PIE_COLORS = [CHART_GREEN, CHART_BLUE, CHART_AMBER, CHART_PURPLE, CHART_RED];

// ─── Tooltip compartido ───────────────────────────────────────
const ChartTooltipStyle = {
    contentStyle: {
        background: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: 6,
        fontSize: '0.79rem',
        color: '#444',
        boxShadow: '0 4px 12px rgba(0,0,0,0.10)',
    },
};

// ─── Dashboard Page ───────────────────────────────────────────
export default function DashboardPage() {
    const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);
    const totales = getTotalesDashboard();

    const empresaColumns = [
        {
            key: 'empresa', header: 'Empresa',
            render: (e: Empresa) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 6,
                        background: 'var(--color-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.68rem', fontWeight: 800, color: '#fff', flexShrink: 0,
                    }}>
                        {e.nombreFantasia.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text-heading)', lineHeight: 1.2 }}>
                            {e.razonSocial}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                            {e.rut} · {e.giro.slice(0, 30)}…
                        </div>
                    </div>
                </div>
            ),
        },
        {
            key: 'sector', header: 'Sector', width: '130px',
            render: (e: Empresa) => <SectorBadge sector={e.sector} />,
        },
        {
            key: 'cierre', header: 'Estado Cierre', width: '140px',
            render: (e: Empresa) => (
                <div>
                    <StatusBadge status={e.estadoCierre} />
                    <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)', marginTop: 2 }}>{e.periodoActual}</div>
                </div>
            ),
        },
        {
            key: 'contador', header: 'Contador', width: '160px',
            render: (e: Empresa) => (
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{e.contadorResponsable}</span>
            ),
        },
        {
            key: 'saldo', header: 'Saldo Banco', align: 'right' as const, width: '140px',
            render: (e: Empresa) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.85rem', color: 'var(--color-text-heading)' }}>
                    {formatCLP(e.saldoBancario)}
                </span>
            ),
        },
        {
            key: 'alertas', header: 'Alertas', align: 'center' as const, width: '70px',
            render: (e: Empresa) => (
                e.alertas > 0 ? (
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 3,
                        background: e.alertas > 5 ? 'rgba(192,57,43,0.10)' : 'rgba(230,126,34,0.10)',
                        color: e.alertas > 5 ? 'var(--color-danger)' : 'var(--color-warning)',
                        fontSize: '0.72rem', fontWeight: 700,
                        padding: '2px 8px', borderRadius: 4,
                    }}>
                        <AlertTriangle size={11} /> {e.alertas}
                    </span>
                ) : (
                    <span style={{ color: 'var(--color-success)', fontSize: '0.78rem', fontWeight: 600 }}>✓ OK</span>
                )
            ),
        },
    ];

    const activeAlerts = mockAlertas.filter(a => !dismissedAlerts.includes(a.id));

    return (
        <>
            <Topbar
                title="Dashboard BPO"
                subtitle={`Braddan BPO · ${mockEmpresas.length} empresas · Período: Enero 2026`}
                alertCount={activeAlerts.length}
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm">
                            <RefreshCw size={13} /> Sync SII
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <Plus size={13} /> Nueva Empresa
                        </button>
                    </div>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* ── KPIs ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12 }}>
                    <KPICard
                        title="Empresas Activas"
                        value={totales.totalEmpresas}
                        trend={8.3} trendLabel="vs mes anterior"
                        accentColor="var(--color-accent)"
                        icon={<Building2 size={15} />}
                    />
                    <KPICard
                        title="Alertas Críticas"
                        value={activeAlerts.filter(a => a.severidad === 'CRITICA').length}
                        subvalue="Requieren acción inmediata"
                        accentColor="var(--color-danger)"
                        icon={<AlertTriangle size={15} />}
                    />
                    <KPICard
                        title="Tickets Abiertos"
                        value={mockTickets.filter(t => t.estado !== 'RESUELTO').length}
                        trend={-12.5} trendLabel="vs semana pasada"
                        accentColor="var(--color-info)"
                        icon={<MessageSquare size={15} />}
                    />
                    <KPICard
                        title="DTE s/ Clasificar"
                        value={totales.dteSinClasificar}
                        subvalue="3 con IA < 60% confianza"
                        accentColor="var(--color-warning)"
                        icon={<FileText size={15} />}
                    />
                    <KPICard
                        title="Asientos Borrador"
                        value={totales.asientosBorrador}
                        subvalue="Pendientes de aprobación"
                        accentColor="var(--color-purple)"
                        icon={<BookOpen size={15} />}
                    />
                    <KPICard
                        title="CxC Vencida"
                        value={totales.cxcVencida}
                        format="currency"
                        trend={-5.2}
                        subvalue={`${Math.round((totales.cxcVencida / totales.totalCxC) * 100)}% del total CxC`}
                        accentColor="var(--color-danger)"
                        icon={<DollarSign size={15} />}
                    />
                </div>

                {/* ── Alertas Activas ──── */}
                {activeAlerts.length > 0 && (
                    <div>
                        <h2 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <AlertTriangle size={15} color="var(--color-danger)" />
                            Alertas Activas ({activeAlerts.length})
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {activeAlerts.map(alert => (
                                <AlertBanner
                                    key={alert.id}
                                    alert={alert}
                                    onResolve={(id) => setDismissedAlerts(prev => [...prev, id])}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* ── Charts Row ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 16 }}>

                    {/* Ingresos vs Gastos */}
                    <div className="card" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 4 }}>
                            Ingresos vs Gastos — 6 meses
                        </h3>
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 14 }}>Consolidado todas las empresas</p>
                        <ResponsiveContainer width="100%" height={180}>
                            <AreaChart data={mockChartData.ingresosMensuales}>
                                <defs>
                                    <linearGradient id="gIngresos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={CHART_GREEN} stopOpacity={0.15} />
                                        <stop offset="95%" stopColor={CHART_GREEN} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="gGastos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={CHART_RED} stopOpacity={0.12} />
                                        <stop offset="95%" stopColor={CHART_RED} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" />
                                <XAxis dataKey="mes" tick={{ fill: '#AAAAAA', fontSize: 11 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fill: '#AAAAAA', fontSize: 10 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} axisLine={false} tickLine={false} />
                                <Tooltip {...ChartTooltipStyle} formatter={(v: any) => [formatCLP(v), '']} />
                                <Legend />
                                <Area type="monotone" dataKey="ingresos" name="Ingresos" stroke={CHART_GREEN} fill="url(#gIngresos)" strokeWidth={2} />
                                <Area type="monotone" dataKey="gastos" name="Gastos" stroke={CHART_RED} fill="url(#gGastos)" strokeWidth={2} strokeDasharray="5 5" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Estado de cierres */}
                    <div className="card" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 4 }}>
                            Estado Cierres
                        </h3>
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 14 }}>Enero 2026</p>
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={mockChartData.estadoCierre} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#EBEBEB" horizontal={false} />
                                <XAxis type="number" tick={{ fill: '#AAAAAA', fontSize: 10 }} axisLine={false} tickLine={false} />
                                <YAxis type="category" dataKey="estado" tick={{ fill: '#888', fontSize: 10 }} axisLine={false} tickLine={false} width={65} />
                                <Tooltip {...ChartTooltipStyle} />
                                <Bar dataKey="cantidad" radius={[0, 3, 3, 0]}>
                                    {mockChartData.estadoCierre.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={[CHART_GREEN, CHART_AMBER, CHART_RED, CHART_PURPLE][index % 4]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Tickets por canal */}
                    <div className="card" style={{ padding: '20px' }}>
                        <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 4 }}>
                            Tickets por Canal
                        </h3>
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 14 }}>Distribución CRM</p>
                        <ResponsiveContainer width="100%" height={140}>
                            <PieChart>
                                <Pie data={mockChartData.canalTickets} cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={3} dataKey="value">
                                    {mockChartData.canalTickets.map((_: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip {...ChartTooltipStyle} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 8 }}>
                            {mockChartData.canalTickets.map((item: any, i: number) => (
                                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--color-text-secondary)' }}>
                                        <span style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS[i % PIE_COLORS.length], display: 'inline-block' }} />
                                        {item.name}
                                    </span>
                                    <span style={{ fontWeight: 700, color: 'var(--color-text-heading)' }}>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Empresas Table + Side Panel ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16, alignItems: 'start' }}>

                    {/* Tabla empresas */}
                    <div>
                        <h2 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 12 }}>
                            Cartera de Empresas
                        </h2>
                        <DataTable
                            columns={empresaColumns}
                            data={mockEmpresas}
                            keyExtractor={(e) => e.id}
                        />
                    </div>

                    {/* Side Panel */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                        {/* Acciones Rápidas */}
                        <div className="card" style={{ padding: '16px' }}>
                            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 10 }}>
                                ⚡ Acciones Rápidas
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                {[
                                    { label: 'Emitir Factura', icon: <FileText size={13} />, primary: true },
                                    { label: 'Conciliar Bancos', icon: <Activity size={13} /> },
                                    { label: 'Aprobar Asientos', icon: <CheckCircle size={13} /> },
                                    { label: 'Generar Reportes', icon: <TrendingUp size={13} /> },
                                    { label: 'Sincronizar SII', icon: <Zap size={13} /> },
                                ].map(({ label, icon, primary }) => (
                                    <button
                                        key={label}
                                        className={`btn ${primary ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                                        style={{ width: '100%', justifyContent: 'flex-start' }}
                                    >
                                        {icon} {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tickets Recientes */}
                        <div className="card" style={{ padding: '16px' }}>
                            <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 10 }}>
                                💬 Tickets Recientes
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {mockTickets.slice(0, 4).map(ticket => (
                                    <div key={ticket.id} style={{
                                        padding: '8px 10px',
                                        background: 'var(--color-bg-elevated)',
                                        borderRadius: 6,
                                        borderLeft: `3px solid ${ticket.prioridad === 'URGENTE' ? 'var(--color-danger)' : ticket.prioridad === 'ALTA' ? 'var(--color-warning)' : 'var(--color-info)'}`,
                                    }}>
                                        <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 2 }}>
                                            {ticket.asunto.slice(0, 38)}{ticket.asunto.length > 38 ? '…' : ''}
                                        </div>
                                        <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                                            {ticket.razonSocialEmpresa.slice(0, 25)} · {ticket.canal}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Footer Status Strip ──── */}
                <div style={{
                    background: 'var(--color-bg-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 8,
                    padding: '10px 20px',
                    display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center',
                }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                        Estado del Sistema:
                    </span>
                    {[
                        { label: 'Motor IA', status: 'Online', icon: <Zap size={11} />, color: 'var(--color-success)' },
                        { label: 'SII Sync', status: 'Conectado', icon: <Database size={11} />, color: 'var(--color-success)' },
                        { label: 'Bancos', status: '8 conectados', icon: <Wifi size={11} />, color: 'var(--color-success)' },
                        { label: 'API BPO', status: '98ms', icon: <Server size={11} />, color: 'var(--color-info)' },
                    ].map(({ label, status, icon, color }) => (
                        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem' }}>
                            <span style={{ color }}>{icon}</span>
                            <span style={{ color: 'var(--color-text-muted)' }}>{label}:</span>
                            <span style={{ color: 'var(--color-text-heading)', fontWeight: 600 }}>{status}</span>
                        </div>
                    ))}
                </div>

            </div>
        </>
    );
}
