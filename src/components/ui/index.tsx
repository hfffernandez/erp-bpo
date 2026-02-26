'use client';

import { formatCLP } from '@/lib/mockData';
import type { AlertaSistema, KPIEmpresa } from '@/types';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, Info, X } from 'lucide-react';

// ─── KPI Card ─────────────────────────────────────────────────

interface KPICardProps {
    title: string;
    value: string | number;
    subvalue?: string;
    trend?: number;   // % change
    trendLabel?: string;
    accentColor?: string;
    icon?: React.ReactNode;
    isCurrency?: boolean;
    format?: 'currency' | 'percent' | 'number' | 'days';
}

export function KPICard({
    title, value, subvalue, trend, trendLabel,
    accentColor = 'var(--color-accent)', icon, format = 'number',
}: KPICardProps) {
    const isPositive = trend !== undefined && trend > 0;
    const isNegative = trend !== undefined && trend < 0;

    const formatValue = (v: string | number) => {
        if (typeof v === 'string') return v;
        if (format === 'currency') return formatCLP(v);
        if (format === 'percent') return `${v.toFixed(1)}%`;
        if (format === 'days') return `${v} días`;
        return v.toLocaleString('es-CL');
    };

    return (
        <div className="kpi-card" style={{ '--accent-color': accentColor } as any}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.02em' }}>
                    {title}
                </span>
                {icon && (
                    <div style={{
                        width: 32, height: 32, borderRadius: 'var(--radius-md)',
                        background: `${accentColor}18`, display: 'flex',
                        alignItems: 'center', justifyContent: 'center', color: accentColor,
                    }}>
                        {icon}
                    </div>
                )}
            </div>

            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.1, marginBottom: 8 }}>
                {formatValue(value)}
            </div>

            {subvalue && (
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginBottom: 8 }}>
                    {subvalue}
                </div>
            )}

            {trend !== undefined && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {isPositive ? (
                        <TrendingUp size={13} color="var(--color-success)" />
                    ) : isNegative ? (
                        <TrendingDown size={13} color="var(--color-danger)" />
                    ) : (
                        <Minus size={13} color="var(--color-text-muted)" />
                    )}
                    <span style={{
                        fontSize: '0.75rem', fontWeight: 600,
                        color: isPositive ? 'var(--color-success)' : isNegative ? 'var(--color-danger)' : 'var(--color-text-muted)',
                    }}>
                        {Math.abs(trend).toFixed(1)}%
                    </span>
                    {trendLabel && (
                        <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
                            {trendLabel}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Alert Banner ─────────────────────────────────────────────

interface AlertBannerProps {
    alert: AlertaSistema;
    onResolve?: (id: string) => void;
}

export function AlertBanner({ alert, onResolve }: AlertBannerProps) {
    const config = {
        CRITICA: { className: 'alert-danger', icon: <AlertTriangle size={16} /> },
        ADVERTENCIA: { className: 'alert-warning', icon: <AlertTriangle size={16} /> },
        INFO: { className: 'alert-info', icon: <Info size={16} /> },
    }[alert.severidad];

    return (
        <div className={`alert ${config.className}`}
            style={{ justifyContent: 'space-between', animation: 'fadeIn 0.3s ease' }}
        >
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, marginTop: 1 }}>{config.icon}</div>
                <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 2 }}>
                        {alert.razonSocial} — {alert.titulo}
                    </div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.85 }}>
                        {alert.descripcion}
                    </div>
                </div>
            </div>
            {onResolve && (
                <button
                    onClick={() => onResolve(alert.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', flexShrink: 0 }}
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
}

// ─── Status Badge Component ───────────────────────────────────

interface StatusBadgeProps {
    status: string;
    size?: 'sm' | 'md';
}

const STATUS_MAP: Record<string, { label: string; className: string }> = {
    // DTE
    ACEPTADO: { label: 'Aceptado', className: 'badge-success' },
    RECHAZADO: { label: 'Rechazado', className: 'badge-danger' },
    ENVIADO: { label: 'Enviado', className: 'badge-info' },
    BORRADOR: { label: 'Borrador', className: 'badge-muted' },
    ANULADO: { label: 'Anulado', className: 'badge-danger' },
    // Empresa
    AL_DIA: { label: 'Al día', className: 'badge-success' },
    PENDIENTE: { label: 'Pendiente', className: 'badge-warning' },
    ATRASADO: { label: 'Atrasado', className: 'badge-danger' },
    BLOQUEADO: { label: 'Bloqueado', className: 'badge-purple' },
    // Asientos
    DEFINITIVO: { label: 'Definitivo', className: 'badge-success' },
    EN_REVISION: { label: 'En revisión', className: 'badge-warning' },
    // Conciliacion
    CONCILIADO: { label: 'Conciliado', className: 'badge-success' },
    EN_REVISION_BANCOS: { label: 'En revisión', className: 'badge-warning' },
    DIFERENCIA: { label: 'Diferencia', className: 'badge-danger' },
    // SLA
    OK: { label: 'OK', className: 'badge-success' },
    EN_RIESGO: { label: 'En riesgo', className: 'badge-warning' },
    VENCIDO: { label: 'Vencido', className: 'badge-danger' },
    // Tickets
    NUEVO: { label: 'Nuevo', className: 'badge-info' },
    RESUELTO: { label: 'Resuelto', className: 'badge-success' },
    CERRADO: { label: 'Cerrado', className: 'badge-muted' },
    ESPERANDO_CLIENTE: { label: 'Esperando cliente', className: 'badge-warning' },
    // CxC
    VIGENTE: { label: 'Vigente', className: 'badge-info' },
    PAGADO: { label: 'Pagado', className: 'badge-success' },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
    const config = STATUS_MAP[status] || { label: status, className: 'badge-muted' };
    return (
        <span className={`badge ${config.className}`} style={size === 'sm' ? { fontSize: '0.68rem', padding: '2px 7px' } : {}}>
            {config.label}
        </span>
    );
}

// ─── Data Table ───────────────────────────────────────────────

interface Column<T> {
    key: string;
    header: string;
    width?: string;
    align?: 'left' | 'right' | 'center';
    render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    keyExtractor: (row: T) => string;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
}

export function DataTable<T>({ columns, data, keyExtractor, emptyMessage = 'Sin resultados', onRowClick }: DataTableProps<T>) {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col.key} style={{ width: col.width, textAlign: col.align || 'left' }}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center', padding: 40, color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map(row => (
                            <tr
                                key={keyExtractor(row)}
                                onClick={() => onRowClick?.(row)}
                                style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                            >
                                {columns.map(col => (
                                    <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                                        {col.render(row)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

// ─── Progress Ring ────────────────────────────────────────────

interface ProgressRingProps {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    label?: string;
}

export function ProgressRing({ value, max = 100, size = 60, strokeWidth = 6, color = 'var(--color-accent)', label }: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const pct = Math.min(value / max, 1);
    const offset = circumference - pct * circumference;

    return (
        <div style={{ position: 'relative', width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-border)" strokeWidth={strokeWidth} />
                <circle
                    cx={size / 2} cy={size / 2} r={radius} fill="none"
                    stroke={color} strokeWidth={strokeWidth}
                    strokeDasharray={circumference} strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
            </svg>
            {label && (
                <span style={{ fontSize: size * 0.22, fontWeight: 700, color: 'var(--color-text-primary)', zIndex: 1 }}>
                    {label}
                </span>
            )}
        </div>
    );
}

// ─── AI Confidence Badge ──────────────────────────────────────

interface AIConfidenceBadgeProps {
    confidence: number;
}

export function AIConfidenceBadge({ confidence }: AIConfidenceBadgeProps) {
    const getConfig = (c: number) => {
        if (c >= 90) return { color: 'var(--color-success)', label: 'Alta' };
        if (c >= 70) return { color: 'var(--color-warning)', label: 'Media' };
        return { color: 'var(--color-danger)', label: 'Baja' };
    };
    const cfg = getConfig(confidence);

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--color-border)', overflow: 'hidden' }}>
                <div style={{ width: `${confidence}%`, height: '100%', background: cfg.color, borderRadius: 2, transition: 'width 0.5s ease' }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: cfg.color, fontWeight: 600 }}>{confidence}%</span>
        </div>
    );
}

// ─── Sector Badge ─────────────────────────────────────────────

const SECTOR_LABELS: Record<string, { label: string; emoji: string }> = {
    RETAIL: { label: 'Retail', emoji: '🛍️' },
    MANUFACTURA: { label: 'Manufactura', emoji: '🏭' },
    SERVICIOS: { label: 'Servicios', emoji: '💼' },
    CONSTRUCCION: { label: 'Construcción', emoji: '🏗️' },
    AGRICOLA: { label: 'Agrícola', emoji: '🌾' },
    INMOBILIARIO: { label: 'Inmobiliario', emoji: '🏢' },
    OTRO: { label: 'Otro', emoji: '🔹' },
};

export function SectorBadge({ sector }: { sector: string }) {
    const cfg = SECTOR_LABELS[sector] || { label: sector, emoji: '🔹' };
    return (
        <span className="badge badge-muted" style={{ gap: 4 }}>
            <span>{cfg.emoji}</span> {cfg.label}
        </span>
    );
}

// ─── Canal Badge (CRM) ────────────────────────────────────────

const CANAL_CONFIG: Record<string, { label: string; color: string }> = {
    WHATSAPP: { label: 'WhatsApp', color: '#25D366' },
    EMAIL: { label: 'Email', color: '#63b3ff' },
    TELEGRAM: { label: 'Telegram', color: '#0088cc' },
    TELEFONO: { label: 'Teléfono', color: '#f5a623' },
    VIDEO: { label: 'Video', color: '#805ad5' },
    PORTAL: { label: 'Portal', color: '#9090b0' },
};

export function CanalBadge({ canal }: { canal: string }) {
    const cfg = CANAL_CONFIG[canal] || { label: canal, color: '#9090b0' };
    return (
        <span style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '2px 8px', borderRadius: 9999,
            background: `${cfg.color}20`, color: cfg.color,
            fontSize: '0.72rem', fontWeight: 600,
        }}>
            {cfg.label}
        </span>
    );
}

// ─── Empty State ──────────────────────────────────────────────

interface EmptyStateProps {
    icon?: React.ReactNode;
    title: string;
    description?: string;
    action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', padding: '48px 24px', textAlign: 'center',
        }}>
            {icon && (
                <div style={{
                    width: 56, height: 56, borderRadius: 'var(--radius-xl)',
                    background: 'var(--color-bg-elevated)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                    color: 'var(--color-text-muted)',
                }}>
                    {icon}
                </div>
            )}
            <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8 }}>
                {title}
            </h3>
            {description && (
                <p style={{ fontSize: '0.83rem', color: 'var(--color-text-muted)', marginBottom: 16, maxWidth: 320 }}>
                    {description}
                </p>
            )}
            {action}
        </div>
    );
}
