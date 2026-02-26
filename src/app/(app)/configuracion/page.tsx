'use client';
import { Topbar } from '@/components/layout/Sidebar';
import { Settings, Shield, Users, Bell, Database, Zap } from 'lucide-react';

const CONFIG_SECTIONS = [
    { icon: <Users size={18} />, title: 'Usuarios & Roles', desc: 'Gestión de cuentas, roles RBAC y permisos por módulo', badge: null },
    { icon: <Shield size={18} />, title: 'Seguridad & MFA', desc: 'Autenticación multifactor, SSO, gestión de certificados SII digitales', badge: 'Crítico' },
    { icon: <Database size={18} />, title: 'Plan de Cuentas', desc: 'Importar/exportar plantillas IFRS, configurar por industria', badge: null },
    { icon: <Zap size={18} />, title: 'Reglas de Motor IA', desc: 'Configurar reglas de clasificación automática de DTE por cuenta contable', badge: null },
    { icon: <Bell size={18} />, title: 'Alertas & SLA', desc: 'Definir umbrales de alerta, tiempos SLA por tipo de ticket y segmento', badge: null },
    { icon: <Settings size={18} />, title: 'Integraciones', desc: 'Bancos, PSP (Webpay/Khipu), WhatsApp Business, PreviRed, SII', badge: '8 activas' },
];

export default function ConfiguracionPage() {
    return (
        <>
            <Topbar title="Configuración" subtitle="Administración del sistema BPO-Core Chile" />
            <div style={{ padding: '24px 28px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                    {CONFIG_SECTIONS.map(({ icon, title, desc, badge }) => (
                        <div key={title} className="card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div style={{ color: 'var(--color-accent)', background: 'rgba(37,211,102,0.1)', padding: 8, borderRadius: 8 }}>{icon}</div>
                                {badge && <span className="badge badge-warning">{badge}</span>}
                            </div>
                            <div>
                                <h3 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{title}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{desc}</p>
                            </div>
                            <button className="btn btn-secondary btn-sm" style={{ alignSelf: 'flex-start' }}>Configurar →</button>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 24 }} className="card">
                    <h3 style={{ fontWeight: 700, marginBottom: 12 }}>🔒 Información de Seguridad</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, fontSize: '0.82rem' }}>
                        {[
                            ['Cifrado en tránsito', 'TLS 1.3', 'var(--color-accent)'],
                            ['Cifrado en reposo', 'AES-256', 'var(--color-accent)'],
                            ['Certificados SII', 'HSM Custodiados', 'var(--color-accent)'],
                            ['MFA', 'Obligatorio (contadores)', 'var(--color-info)'],
                            ['RBAC Roles activos', '6 roles configurados', 'var(--color-info)'],
                            ['Retención auditoría', '7 años (Normativa SII)', 'var(--color-warning)'],
                        ].map(([label, value, color]) => (
                            <div key={label}>
                                <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>{label}</div>
                                <div style={{ fontWeight: 700, color: color as string }}>{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
