'use client';

import { Topbar } from '@/components/layout/Sidebar';
import { KPICard } from '@/components/ui';
import { formatCLP } from '@/lib/mockData';
import {
    BarChart3, Download, Calendar, TrendingUp, TrendingDown, DollarSign,
    Activity, PieChart,
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';

// ─── Reportes Financieros Page ────────────────────────────────

const ESTADO_RESULTADOS = [
    { cuenta: 'Ingresos de explotación', tipo: 'INGRESO', monto: 22000000, anterior: 19800000 },
    { cuenta: 'Costo de ventas', tipo: 'COSTO', monto: -9460000, anterior: -8910000 },
    { cuenta: 'MARGEN BRUTO', tipo: 'SUBTOTAL', monto: 12540000, anterior: 10890000 },
    { cuenta: 'Gastos de administración', tipo: 'GASTO', monto: -3200000, anterior: -2900000 },
    { cuenta: 'Gastos de ventas', tipo: 'GASTO', monto: -1800000, anterior: -1600000 },
    { cuenta: 'Gastos financieros', tipo: 'GASTO', monto: -820000, anterior: -750000 },
    { cuenta: 'EBITDA', tipo: 'SUBTOTAL', monto: 6720000, anterior: 5640000 },
    { cuenta: 'Depreciaciones y amortizaciones', tipo: 'GASTO', monto: -420000, anterior: -380000 },
    { cuenta: 'RESULTADO OPERACIONAL', tipo: 'SUBTOTAL', monto: 6300000, anterior: 5260000 },
    { cuenta: 'Otros ingresos no operacionales', tipo: 'OTROS', monto: 250000, anterior: 0 },
    { cuenta: 'RESULTADO ANTES IMPUESTO', tipo: 'SUBTOTAL', monto: 6550000, anterior: 5260000 },
    { cuenta: 'Impto. a la renta provisión (PPM)', tipo: 'IMPUESTO', monto: -1180000, anterior: -947000 },
    { cuenta: 'RESULTADO DEL EJERCICIO', tipo: 'TOTAL', monto: 5370000, anterior: 4313000 },
];

const BALANCE_GENERAL = {
    activos: [
        { cuenta: 'Caja y bancos', monto: 48320000 },
        { cuenta: 'Cuentas por cobrar (neto)', monto: 12450000 },
        { cuenta: 'Inventario', monto: 3200000 },
        { cuenta: 'Activos corrientes TOTAL', monto: 63970000, esTotal: true },
        { cuenta: 'Activos fijos (neto deprec.)', monto: 28500000 },
        { cuenta: 'Otros activos no corrientes', monto: 4200000 },
        { cuenta: 'Activos no corrientes TOTAL', monto: 32700000, esTotal: true },
        { cuenta: 'TOTAL ACTIVOS', monto: 96670000, esGrandTotal: true },
    ],
    pasivoPatrimonio: [
        { cuenta: 'Cuentas por pagar', monto: 8200000 },
        { cuenta: 'Remuneraciones por pagar', monto: 6100000 },
        { cuenta: 'IVA débito por pagar', monto: 6650000 },
        { cuenta: 'Pasivos corrientes TOTAL', monto: 20950000, esTotal: true },
        { cuenta: 'Préstamos largo plazo', monto: 15000000 },
        { cuenta: 'Pasivos no corrientes TOTAL', monto: 15000000, esTotal: true },
        { cuenta: 'Capital pagado', monto: 55350000 },
        { cuenta: 'Resultado del ejercicio', monto: 5370000 },
        { cuenta: 'PATRIMONIO TOTAL', monto: 60720000, esTotal: true },
        { cuenta: 'PASIVO + PATRIMONIO', monto: 96670000, esGrandTotal: true },
    ],
};

const chartData = [
    { mes: 'Ago', ingresos: 18400000, EBITDA: 5200000 },
    { mes: 'Sep', ingresos: 21300000, EBITDA: 6100000 },
    { mes: 'Oct', ingresos: 19800000, EBITDA: 5800000 },
    { mes: 'Nov', ingresos: 25100000, EBITDA: 7200000 },
    { mes: 'Dic', ingresos: 28400000, EBITDA: 8900000 },
    { mes: 'Ene', ingresos: 22000000, EBITDA: 6720000 },
];

export default function ReportesPage() {
    const resultado = ESTADO_RESULTADOS.find(r => r.tipo === 'TOTAL');
    const resultadoAnterior = resultado?.anterior ?? 0;
    const resultadoActual = resultado?.monto ?? 0;
    const crecimiento = ((resultadoActual - resultadoAnterior) / Math.abs(resultadoAnterior)) * 100;

    return (
        <>
            <Topbar
                title="Reportes & Estados Financieros"
                subtitle="Módulo D · Estados Financieros IFRS · Inversiones Meridian SpA · Enero 2026"
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <select className="input btn-sm" style={{ width: 'auto', padding: '6px 12px' }}>
                            <option>Inversiones Meridian SpA</option>
                            <option>ComSur Ltda.</option>
                            <option>Constructora Andina SA</option>
                        </select>
                        <button className="btn btn-primary btn-sm"><Download size={13} /> Exportar PDF</button>
                    </div>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* KPIs */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                    <KPICard title="Ingresos Enero" value={22000000} format="currency" trend={11.1} trendLabel="vs dic" accentColor="var(--color-accent)" />
                    <KPICard title="Margen Bruto" value={57.0} format="percent" trend={2.3} accentColor="var(--color-info)" />
                    <KPICard title="EBITDA" value={6720000} format="currency" trend={19.1} accentColor="var(--color-purple)" />
                    <KPICard title="Margen Neto" value={24.4} format="percent" trend={5.2} accentColor="var(--color-accent)" />
                    <KPICard title="Resultado Neto" value={5370000} format="currency" trend={crecimiento} trendLabel="vs yr" accentColor="var(--color-accent)" />
                </div>

                {/* Grafico Tendencia */}
                <div className="card" style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: 16, color: 'var(--color-text-primary)' }}>
                        📈 Tendencia Ingresos vs EBITDA — 6 meses
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                            <XAxis dataKey="mes" tick={{ fill: 'var(--color-text-muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: 'var(--color-text-muted)', fontSize: 10 }} tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: '0.82rem' }}
                                formatter={(v: any) => [formatCLP(v), '']}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="ingresos" name="Ingresos" stroke="#25D366" strokeWidth={2} dot={false} />
                            <Line type="monotone" dataKey="EBITDA" name="EBITDA" stroke="#63b3ff" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Estado de Resultados + Balance */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

                    {/* Estado de Resultados */}
                    <div className="card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                            <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                📊 Estado de Resultados
                            </h3>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Enero 2026 vs Enero 2025</span>
                        </div>
                        <div className="table-container">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Cuenta</th>
                                        <th style={{ textAlign: 'right' }}>Ene 2026</th>
                                        <th style={{ textAlign: 'right' }}>Ene 2025</th>
                                        <th style={{ textAlign: 'right' }}>Var%</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ESTADO_RESULTADOS.map((row) => {
                                        const isTotal = row.tipo === 'TOTAL' || row.tipo === 'SUBTOTAL';
                                        const var_pct = row.anterior !== 0 ? ((row.monto - row.anterior) / Math.abs(row.anterior)) * 100 : 0;
                                        return (
                                            <tr key={row.cuenta} style={{ background: isTotal ? 'rgba(255,255,255,0.03)' : 'transparent' }}>
                                                <td style={{ fontWeight: isTotal ? 700 : 400, fontSize: isTotal ? '0.82rem' : '0.8rem', paddingLeft: !isTotal && !['INGRESO', 'OTROS'].includes(row.tipo) ? 24 : 16 }}>
                                                    {row.cuenta}
                                                </td>
                                                <td style={{ textAlign: 'right', fontFamily: 'monospace', fontWeight: isTotal ? 700 : 500, fontSize: '0.82rem', color: row.monto < 0 ? 'var(--color-danger)' : row.tipo === 'TOTAL' ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
                                                    {formatCLP(row.monto)}
                                                </td>
                                                <td style={{ textAlign: 'right', fontFamily: 'monospace', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                                                    {formatCLP(row.anterior)}
                                                </td>
                                                <td style={{ textAlign: 'right', fontSize: '0.75rem', fontWeight: 600, color: var_pct > 0 ? 'var(--color-accent)' : var_pct < 0 ? 'var(--color-danger)' : 'var(--color-text-muted)' }}>
                                                    {var_pct !== 0 ? `${var_pct > 0 ? '+' : ''}${var_pct.toFixed(1)}%` : '—'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Balance General */}
                    <div className="card" style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                            <h3 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                📋 Estado de Situación Financiera
                            </h3>
                            <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Al 31 Ene 2026</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            {/* Activos */}
                            <div>
                                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-info)', marginBottom: 8, paddingBottom: 4, borderBottom: '1px solid var(--color-border)' }}>
                                    ACTIVOS
                                </div>
                                {BALANCE_GENERAL.activos.map(row => (
                                    <div key={row.cuenta} style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        padding: '4px 0',
                                        borderBottom: row.esGrandTotal ? '2px solid var(--color-border)' : 'none',
                                        marginTop: row.esTotal ? 4 : 0,
                                    }}>
                                        <span style={{
                                            fontSize: '0.76rem',
                                            color: row.esGrandTotal ? 'var(--color-text-primary)' : row.esTotal ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                                            fontWeight: row.esGrandTotal ? 800 : row.esTotal ? 700 : 400,
                                        }}>
                                            {row.cuenta}
                                        </span>
                                        <span style={{
                                            fontSize: '0.76rem', fontFamily: 'monospace',
                                            fontWeight: row.esGrandTotal ? 800 : row.esTotal ? 700 : 500,
                                            color: row.esGrandTotal ? 'var(--color-accent)' : 'var(--color-text-primary)',
                                        }}>
                                            {formatCLP(row.monto)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Pasivo + Patrimonio */}
                            <div>
                                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-purple)', marginBottom: 8, paddingBottom: 4, borderBottom: '1px solid var(--color-border)' }}>
                                    PASIVO + PATRIMONIO
                                </div>
                                {BALANCE_GENERAL.pasivoPatrimonio.map(row => (
                                    <div key={row.cuenta} style={{
                                        display: 'flex', justifyContent: 'space-between',
                                        padding: '4px 0',
                                        borderBottom: row.esGrandTotal ? '2px solid var(--color-border)' : 'none',
                                        marginTop: row.esTotal ? 4 : 0,
                                    }}>
                                        <span style={{
                                            fontSize: '0.76rem',
                                            color: row.esGrandTotal ? 'var(--color-text-primary)' : row.esTotal ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
                                            fontWeight: row.esGrandTotal ? 800 : row.esTotal ? 700 : 400,
                                        }}>
                                            {row.cuenta}
                                        </span>
                                        <span style={{
                                            fontSize: '0.76rem', fontFamily: 'monospace',
                                            fontWeight: row.esGrandTotal ? 800 : row.esTotal ? 700 : 500,
                                            color: row.esGrandTotal ? 'var(--color-accent)' : 'var(--color-text-primary)',
                                        }}>
                                            {formatCLP(row.monto)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="alert alert-success" style={{ marginTop: 12 }}>
                            <Activity size={13} />
                            <span style={{ fontSize: '0.75rem' }}>Balance cuadra: Activos = Pasivos + Patrimonio = {formatCLP(96670000)}</span>
                        </div>
                    </div>
                </div>

                {/* KPIs Tributarios */}
                <div className="card" style={{ padding: '20px' }}>
                    <h3 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: 14, color: 'var(--color-text-primary)' }}>
                        🧾 Indicadores Tributarios — Determinación F29 / Provisión Impuesto Renta
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                        {[
                            { label: 'Débito Fiscal IVA (mes)', value: formatCLP(9850000), sub: '19% sobre neto ventas afectas', color: 'var(--color-danger)' },
                            { label: 'Crédito Fiscal IVA (mes)', value: formatCLP(3200000), sub: 'IVA soportado en compras', color: 'var(--color-accent)' },
                            { label: 'IVA Neto a Pagar', value: formatCLP(6650000), sub: 'Declaración F29 vence 12 Feb', color: 'var(--color-warning)' },
                            { label: 'PPM Provisión Renta', value: formatCLP(1180000), sub: `~5.36% ingresos · Régimen 14D`, color: 'var(--color-purple)' },
                        ].map(({ label, value, sub, color }) => (
                            <div key={label} style={{
                                background: 'var(--color-bg-elevated)', border: `1px solid ${color}30`,
                                borderRadius: 10, padding: '14px',
                            }}>
                                <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginBottom: 6 }}>{label}</div>
                                <div style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'monospace', color, marginBottom: 4 }}>{value}</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>{sub}</div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}
