'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { mockEmpresas } from '@/lib/mockData';
import {
    LayoutDashboard, Building2, FileText, BookOpen, Landmark,
    Receipt, ShieldCheck, Users, BarChart3, MessageSquare,
    Settings, ChevronDown, ChevronRight, Bell, HelpCircle,
    LogOut, Briefcase, Package, Calculator, Zap, Search, X,
    Clock, Calendar,
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
        label: 'GESTIÓN BPO',
        icon: null, // Header
        children: [
            {
                label: 'Mis Clientes',
                icon: <Building2 size={16} />,
                href: '/clientes',
                badge: 50,
            },
            {
                label: 'Conciliación',
                icon: <Landmark size={16} />,
                href: '/bancos',
                badge: 1853,
            },
        ],
    } as any,
    {
        label: 'ADMIN',
        icon: null, // Header
        children: [
            {
                label: 'Equipo',
                icon: <Users size={16} />,
                href: '/equipo',
            },
            {
                label: 'Reportes SLA',
                icon: <BarChart3 size={16} />,
                href: '/reportes',
            },
            {
                label: 'Configuración Global',
                icon: <Settings size={16} />,
                href: '/configuracion',
            },
        ],
    } as any,
];

// ─── Sidebar ──────────────────────────────────────────────────

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [openGroups, setOpenGroups] = useState<string[]>(['Contabilidad', 'Bancos & CxC']);

    const toggle = (label: string) => {
        setOpenGroups(prev =>
            prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
        );
    };

    const isActive = (href?: string) => pathname === href;
    const isGroupActive = (children?: NavLeaf[]) =>
        children?.some(c => pathname === c.href);

    const searchParams = useSearchParams();
    const empresaId = searchParams.get('empresaId');
    const activeEmpresa = mockEmpresas.find(e => e.id === empresaId);

    const getHref = (path: string) => empresaId ? `${path}?empresaId=${empresaId}` : path;

    // ─── Dynamic Navigation ──────────────────────────
    const GLOBAL_ITEMS = [
        { label: 'Mis Clientes', icon: <Building2 size={16} />, href: '/clientes', badge: 50 },
        { label: 'Dashboard BPO', icon: <LayoutDashboard size={16} />, href: '/dashboard' },
        { label: 'CRM & Soporte', icon: <MessageSquare size={16} />, href: '/crm' },
    ];

    const CLIENT_MANAGEMENT = [
        {
            label: 'GESTIÓN CONTABLE',
            children: [
                { label: 'Libro Mayor', icon: <BookOpen size={16} />, href: '/contabilidad' },
                { label: 'Asientos', icon: <Calculator size={16} />, href: '/facturacion' },
                { label: 'Plan de Cuentas', icon: <Package size={16} />, href: '/contabilidad' },
            ]
        },
        {
            label: 'PROCESOS',
            children: [
                { label: 'Conciliación Bancaria', icon: <Landmark size={16} />, href: '/bancos', badge: 1853 },
                { label: 'Cierre Mensual', icon: <Calendar size={16} />, href: '/contabilidad/cierre' },
                { label: 'Facturación DTE', icon: <FileText size={16} />, href: '/facturacion' },
                { label: 'Activos Fijos', icon: <Briefcase size={16} />, href: '/activos' },
                { label: 'Monitor SII', icon: <ShieldCheck size={16} />, href: '/sii' },
            ]
        }
    ];

    const ADMIN_ITEMS = [
        { label: 'Equipo', icon: <Users size={16} />, href: '/equipo' },
        { label: 'Reportes SLA', icon: <BarChart3 size={16} />, href: '/reportes' },
        { label: 'Configuración Global', icon: <Settings size={16} />, href: '/configuracion' },
    ];

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
                <button
                    onClick={() => router.push('/clientes')}
                    style={{
                        display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                        background: activeEmpresa ? 'rgba(37,211,102,0.12)' : 'rgba(255,255,255,0.08)',
                        border: `1px solid ${activeEmpresa ? 'rgba(37,211,102,0.2)' : 'rgba(255,255,255,0.12)'}`,
                        borderRadius: 6, padding: '9px 12px', cursor: 'pointer',
                        transition: 'background var(--transition-fast)',
                    }}>
                    <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: activeEmpresa ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '0.65rem', fontWeight: 800, color: '#000', flexShrink: 0,
                    }}>
                        {activeEmpresa ? activeEmpresa.nombreFantasia.slice(0, 2).toUpperCase() : 'BPO'}
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>
                            {activeEmpresa ? activeEmpresa.nombreFantasia : 'Seleccionar Cliente'}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)' }}>
                            {activeEmpresa ? activeEmpresa.rut : 'Gestión Centralizada'}
                        </div>
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
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{activeEmpresa ? 'Buscar en cliente...' : 'Buscar cliente...'}</span>
                </div>
            </div>

            {/* ── Navigation ── */}
            <nav style={{ flex: 1, padding: '12px 0px', overflowY: 'auto' }}>

                {/* Section Global */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ padding: '0 20px', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                        GESTIÓN BPO
                    </div>
                    <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {GLOBAL_ITEMS.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link key={item.href} href={item.href} style={{
                                    display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 6,
                                    background: active ? '#FFFFFF' : 'transparent', color: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)',
                                    textDecoration: 'none', fontSize: '0.82rem', fontWeight: active ? 700 : 500,
                                }}>
                                    <span style={{ color: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)' }}>{item.icon}</span>
                                    <span style={{ flex: 1 }}>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Section Cliente (Contextual) */}
                {empresaId && (
                    <>
                        {CLIENT_MANAGEMENT.map(section => (
                            <div key={section.label} style={{ marginBottom: 24 }}>
                                <div style={{ padding: '0 20px', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                                    {section.label}
                                </div>
                                <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {section.children.map((item) => {
                                        const hrefWithId = getHref(item.href);
                                        const active = isActive(item.href);
                                        return (
                                            <Link key={item.label} href={hrefWithId} style={{
                                                display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 6,
                                                background: active ? '#FFFFFF' : 'transparent', color: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)',
                                                textDecoration: 'none', fontSize: '0.82rem', fontWeight: active ? 700 : 500,
                                            }}>
                                                <span style={{ color: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)' }}>{item.icon}</span>
                                                <span style={{ flex: 1 }}>{item.label}</span>
                                                {item.badge && <span style={{ background: active ? 'rgba(60,2,19,0.1)' : 'rgba(255,255,255,0.12)', color: active ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: 10 }}>{item.badge > 999 ? '1k+' : item.badge}</span>}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </>
                )}

                {/* Section Admin */}
                <div style={{ marginBottom: 24 }}>
                    <div style={{ padding: '0 20px', fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                        ADMINISTRACIÓN
                    </div>
                    <div style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {ADMIN_ITEMS.map((item) => (
                            <Link key={item.href} href={item.href} style={{
                                display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 6,
                                background: isActive(item.href) ? '#FFFFFF' : 'transparent', color: isActive(item.href) ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)',
                                textDecoration: 'none', fontSize: '0.82rem', fontWeight: isActive(item.href) ? 700 : 500,
                            }}>
                                <span style={{ color: isActive(item.href) ? 'var(--color-primary)' : 'rgba(255,255,255,0.4)' }}>{item.icon}</span>
                                <span style={{ flex: 1 }}>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
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
