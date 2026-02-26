'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
    LayoutDashboard, Building2, FileText, BookOpen, Landmark,
    Receipt, ShieldCheck, Users, BarChart3, MessageSquare,
    Settings, ChevronDown, ChevronRight, Bell, HelpCircle,
    LogOut, Briefcase, Package, Calculator, Zap, Search, X,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────

interface NavLeaf { label: string; href: string; }
interface NavGroup {
    label: string;
    icon: React.ReactNode;
    href?: string;
    badge?: number;
    children?: NavLeaf[];
}

// ─── Navigation Config ────────────────────────────────────────

const NAV_ITEMS: NavGroup[] = [
    {
        label: 'Dashboard BPO',
        icon: <LayoutDashboard size={16} />,
        href: '/dashboard',
    },
    {
        label: 'Mis Empresas',
        icon: <Building2 size={16} />,
        href: '/empresas',
        badge: 6,
    },
    {
        label: 'Facturación DTE',
        icon: <FileText size={16} />,
        href: '/facturacion',
        badge: 3,
    },
    {
        label: 'Contabilidad',
        icon: <BookOpen size={16} />,
        children: [
            { label: 'Asientos', href: '/facturacion' },
            { label: 'Libro Mayor', href: '/contabilidad' },
            { label: 'Plan de Cuentas', href: '/contabilidad' },
            { label: 'Cierre Mensual', href: '/contabilidad' },
        ],
    },
    {
        label: 'Bancos & CxC',
        icon: <Landmark size={16} />,
        children: [
            { label: 'Conciliación', href: '/bancos' },
            { label: 'Cuentas por Cobrar', href: '/cobranza' },
            { label: 'Tesorería', href: '/bancos' },
        ],
    },
    {
        label: 'Activos Fijos',
        icon: <Briefcase size={16} />,
        href: '/activos',
    },
    {
        label: 'Remuneraciones',
        icon: <Users size={16} />,
        href: '/remuneraciones',
    },
    {
        label: 'Monitor SII',
        icon: <ShieldCheck size={16} />,
        href: '/sii',
    },
    {
        label: 'Reportes',
        icon: <BarChart3 size={16} />,
        href: '/reportes',
    },
    {
        label: 'CRM & Soporte',
        icon: <MessageSquare size={16} />,
        href: '/crm',
    },
    {
        label: 'Configuración',
        icon: <Settings size={16} />,
        href: '/configuracion',
    },
];

// ─── Sidebar ──────────────────────────────────────────────────

export function Sidebar() {
    const pathname = usePathname();
    const [openGroups, setOpenGroups] = useState<string[]>(['Contabilidad', 'Bancos & CxC']);

    const toggle = (label: string) => {
        setOpenGroups(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    const isActive = (href?: string) => pathname === href;
    const isGroupActive = (children?: NavLeaf[]) =>
        children?.some(c => pathname === c.href);

    return (
        <aside className="sidebar">
            {/* ── Logo ── */}
            <div style={{
                padding: '20px 20px 16px',
                borderBottom: '1px solid rgba(255,255,255,0.10)',
                display: 'flex', alignItems: 'center', gap: 12,
            }}>
                <Image
                    src="https://framerusercontent.com/assets/DVcRuwlaalOCvsKQbez8BsCr8gg.png"
                    alt="Braddan BPO"
                    width={36}
                    height={36}
                    style={{ objectFit: 'contain', flexShrink: 0, filter: 'brightness(0) invert(1)' }}
                    unoptimized
                />
                <div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        BPO-Core
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.55)', marginTop: 2, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        CHILE
                    </div>
                </div>
            </div>

            {/* ── Company Switcher ── */}
            <div style={{ padding: '12px 12px 8px' }}>
                <button style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 6, padding: '9px 12px', cursor: 'pointer',
                    transition: 'background var(--transition-fast)',
                }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: 'var(--color-accent)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: 800, color: '#000', flexShrink: 0,
                    }}>
                        BB
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>Braddan BPO</div>
                        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>76.543.210-1 · Professional</div>
                    </div>
                    <ChevronDown size={13} color="rgba(255,255,255,0.4)" />
                </button>
            </div>

            {/* ── Search ── */}
            <div style={{ padding: '4px 12px 8px' }}>
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)',
                    borderRadius: 6, padding: '7px 10px',
                }}>
                    <Search size={13} color="rgba(255,255,255,0.4)" />
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>Buscar empresa...</span>
                    <span style={{
                        marginLeft: 'auto', background: 'rgba(255,255,255,0.12)',
                        padding: '1px 5px', borderRadius: 4, fontSize: '0.62rem', color: 'rgba(255,255,255,0.4)',
                    }}>⌘K</span>
                </div>
            </div>

            {/* ── Nav Items ── */}
            <nav style={{ flex: 1, padding: '4px 8px', overflowY: 'auto' }}>
                {NAV_ITEMS.map((item) => {
                    const active = item.href ? isActive(item.href) : isGroupActive(item.children);
                    const open = openGroups.includes(item.label);

                    if (item.children) {
                        return (
                            <div key={item.label}>
                                <button
                                    onClick={() => toggle(item.label)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 9, width: '100%',
                                        background: active || open ? 'rgba(37,211,102,0.12)' : 'none',
                                        border: 'none', borderRadius: 6, padding: '9px 10px',
                                        cursor: 'pointer',
                                        color: active || open ? 'var(--color-accent)' : 'rgba(255,255,255,0.72)',
                                        fontSize: '0.82rem', fontWeight: active || open ? 700 : 500,
                                        transition: 'all var(--transition-fast)', marginBottom: 1,
                                        textAlign: 'left',
                                    }}
                                >
                                    <span style={{ color: active || open ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
                                        {item.icon}
                                    </span>
                                    <span style={{ flex: 1 }}>{item.label}</span>
                                    {open
                                        ? <ChevronDown size={12} style={{ opacity: 0.5 }} />
                                        : <ChevronRight size={12} style={{ opacity: 0.5 }} />
                                    }
                                </button>
                                {open && (
                                    <div style={{ paddingLeft: 14, paddingBottom: 4 }}>
                                        {item.children.map(child => (
                                            <Link
                                                key={child.href + child.label}
                                                href={child.href}
                                                style={{
                                                    display: 'flex', alignItems: 'center',
                                                    padding: '7px 10px 7px 20px',
                                                    borderRadius: 6,
                                                    fontSize: '0.79rem',
                                                    color: pathname === child.href ? 'var(--color-accent)' : 'rgba(255,255,255,0.55)',
                                                    fontWeight: pathname === child.href ? 600 : 400,
                                                    background: pathname === child.href ? 'rgba(37,211,102,0.10)' : 'none',
                                                    textDecoration: 'none',
                                                    transition: 'all var(--transition-fast)',
                                                    borderLeft: `2px solid ${pathname === child.href ? 'var(--color-accent)' : 'rgba(255,255,255,0.10)'}`,
                                                    marginBottom: 1,
                                                }}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href!}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 9,
                                background: active ? 'rgba(37,211,102,0.14)' : 'none',
                                borderRadius: 6, padding: '9px 10px',
                                color: active ? 'var(--color-accent)' : 'rgba(255,255,255,0.72)',
                                fontSize: '0.82rem', fontWeight: active ? 700 : 500,
                                textDecoration: 'none',
                                transition: 'all var(--transition-fast)', marginBottom: 1,
                                borderLeft: `2px solid ${active ? 'var(--color-accent)' : 'transparent'}`,
                            }}
                        >
                            <span style={{ color: active ? 'var(--color-accent)' : 'rgba(255,255,255,0.5)', flexShrink: 0 }}>
                                {item.icon}
                            </span>
                            <span style={{ flex: 1 }}>{item.label}</span>
                            {item.badge !== undefined && (
                                <span style={{
                                    background: active ? 'var(--color-accent)' : 'rgba(255,255,255,0.15)',
                                    color: active ? '#000' : 'rgba(255,255,255,0.7)',
                                    fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px',
                                    borderRadius: 9999, minWidth: 18, textAlign: 'center',
                                }}>
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* ── SII Sync Status ── */}
            <div style={{
                margin: '0 8px 8px',
                background: 'rgba(37,211,102,0.10)',
                border: '1px solid rgba(37,211,102,0.20)',
                borderRadius: 6, padding: '10px 12px',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0 }} />
                    <div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-accent)' }}>SII Sync</div>
                        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)' }}>Última sincronización: hace 3 min</div>
                    </div>
                </div>
                <div style={{ fontSize: '0.62rem', color: 'var(--color-accent)', marginTop: 4, opacity: 0.8 }}>● En tiempo real</div>
            </div>

            {/* ── User Profile ── */}
            <div style={{
                padding: '12px 12px 16px',
                borderTop: '1px solid rgba(255,255,255,0.10)',
                display: 'flex', alignItems: 'center', gap: 10,
            }}>
                <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'var(--color-accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.7rem', fontWeight: 800, color: '#000', flexShrink: 0,
                }}>
                    CF
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Catalina Fuentes
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.45)' }}>Contador Senior</div>
                </div>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: 4 }}>
                    <LogOut size={14} />
                </button>
            </div>
        </aside>
    );
}

// ─── Topbar ───────────────────────────────────────────────────

interface TopbarProps {
    title: string;
    subtitle?: string;
    actions?: React.ReactNode;
    alertCount?: number;
}

export function Topbar({ title, subtitle, actions, alertCount }: TopbarProps) {
    return (
        <div className="topbar">
            <div>
                <h1 style={{
                    fontSize: '1.3rem', fontWeight: 800,
                    color: 'var(--color-text-heading)',
                    lineHeight: 1.15, letterSpacing: '-0.02em',
                }}>
                    {title}
                </h1>
                {subtitle && (
                    <p style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                        {subtitle}
                    </p>
                )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {actions}
                <div style={{ display: 'flex', gap: 6 }}>
                    <button className="btn-icon" style={{ position: 'relative' }}>
                        <Bell size={16} />
                        {alertCount !== undefined && alertCount > 0 && (
                            <span style={{
                                position: 'absolute', top: -4, right: -4,
                                background: 'var(--color-danger)', color: '#fff',
                                borderRadius: '50%', width: 16, height: 16,
                                fontSize: '0.6rem', fontWeight: 800,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                {alertCount > 9 ? '9+' : alertCount}
                            </span>
                        )}
                    </button>
                    <button className="btn-icon"><HelpCircle size={16} /></button>
                    <div style={{
                        width: 34, height: 34, borderRadius: '50%',
                        background: 'var(--color-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.68rem', fontWeight: 800, color: '#fff', cursor: 'pointer',
                    }}>
                        CF
                    </div>
                </div>
            </div>
        </div>
    );
}
