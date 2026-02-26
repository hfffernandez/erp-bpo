'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/Sidebar';
import { Search, Grid, List, Building2, Landmark, CheckCircle, XCircle, ChevronRight, Zap, Database, Wifi } from 'lucide-react';
import { mockEmpresas, formatCLP } from '@/lib/mockData';
import { useRouter } from 'next/navigation';

export default function ClientPortfolioPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredEmpresas = mockEmpresas.filter(e =>
        e.razonSocial.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.sector.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Topbar
                title="Portafolio de Clientes"
                subtitle="Gestión Centralizada BPO"
                actions={
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ textAlign: 'right', paddingRight: 12, borderRight: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Total Pendientes</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>1853 movimientos</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Clientes Activos</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-primary)' }}>50 empresas</div>
                        </div>
                        <div style={{ display: 'flex', background: 'var(--color-bg-elevated)', borderRadius: 8, padding: 4, marginLeft: 8 }}>
                            <button className="btn-icon btn-sm active" style={{ background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}><Grid size={14} /></button>
                            <button className="btn-icon btn-sm"><List size={14} /></button>
                        </div>
                    </div>
                }
            />

            <div style={{ padding: '24px 32px' }}>
                {/* Search Bar */}
                <div style={{ marginBottom: 24, maxWidth: 400 }}>
                    <div style={{ position: 'relative' }}>
                        <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(0,0,0,0.3)' }} size={16} />
                        <input
                            type="text"
                            placeholder="Buscar empresa o industria..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                borderRadius: 8,
                                border: '1px solid var(--color-border)',
                                fontSize: '0.88rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                                background: '#fff'
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>
                </div>

                {/* Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                    gap: 20
                }}>
                    {filteredEmpresas.map((empresa, idx) => (
                        <div key={empresa.id} className="card" style={{
                            padding: 0,
                            overflow: 'hidden',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'default',
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            {/* Card Header */}
                            <div style={{ padding: '20px 20px 16px', borderBottom: '1px dotted var(--color-border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 10,
                                        background: 'var(--color-primary)',
                                        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '0.9rem', fontWeight: 800
                                    }}>
                                        {empresa.nombreFantasia.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div style={{
                                        background: 'rgba(125,60,152,0.1)',
                                        color: '#7D3C98',
                                        fontSize: '0.7rem',
                                        fontWeight: 800,
                                        padding: '4px 10px',
                                        borderRadius: 20,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4
                                    }}>
                                        {empresa.alertas + 4} PENDIENTES
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 2 }}>
                                    {empresa.razonSocial}
                                </h3>
                                <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                                    {empresa.sector}
                                </p>
                            </div>

                            {/* Card Body */}
                            <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {/* Connections */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                                        <Zap size={14} style={{ opacity: 0.5 }} /> SOFTLAND ERP
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-success)' }}>Conectado</span>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                                        <Landmark size={14} style={{ opacity: 0.5 }} /> BANCOS
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-success)' }}>{idx === 4 ? '1 Conectada' : '2 Conectadas'}</span>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div style={{
                                padding: '12px 20px',
                                background: 'rgba(0,0,0,0.02)',
                                borderTop: '1px solid var(--color-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                                    Sinc.: Hace {idx + 1} h
                                </span>
                                <button
                                    onClick={() => router.push(`/bancos?empresaId=${empresa.id}`)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--color-primary)',
                                        fontSize: '0.72rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.04em',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 4,
                                        cursor: 'pointer'
                                    }}
                                >
                                    Gestionar <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
