'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/Sidebar';
import { DataTable, StatusBadge, CanalBadge } from '@/components/ui';
import { mockTickets, mockEmpresas, formatCLP } from '@/lib/mockData';
import type { Ticket } from '@/types';
import {
    MessageSquare, Plus, Search, Filter, Clock, CheckCircle,
    AlertTriangle, Send, Phone, Video, Mail, Zap,
    ChevronRight, User, Building2, Link2, ArrowRight,
} from 'lucide-react';

// ─── CRM Page ─────────────────────────────────────────────────

export default function CRMPage() {
    const [activeTicket, setActiveTicket] = useState<Ticket | null>(mockTickets[0]);

    const ticketColumns = [
        {
            key: 'empresa', header: 'Empresa', width: '180px',
            render: (t: Ticket) => (
                <div>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                        {t.razonSocialEmpresa.length > 22 ? t.razonSocialEmpresa.slice(0, 22) + '…' : t.razonSocialEmpresa}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>#{t.id}</div>
                </div>
            ),
        },
        {
            key: 'asunto', header: 'Asunto',
            render: (t: Ticket) => (
                <div>
                    <div style={{ fontSize: '0.83rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 220 }}>{t.asunto}</div>
                    <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
                        <CanalBadge canal={t.canal} />
                        <StatusBadge status={t.slaEstado} size="sm" />
                    </div>
                </div>
            ),
        },
        {
            key: 'prioridad', header: 'Prioridad', width: '95px',
            render: (t: Ticket) => {
                const colorMap = { URGENTE: 'danger', ALTA: 'warning', MEDIA: 'info', BAJA: 'muted' };
                const cls = `badge badge-${colorMap[t.prioridad] || 'muted'}`;
                return <span className={cls}>{t.prioridad}</span>;
            },
        },
        {
            key: 'asignado', header: 'Asignado a', width: '130px',
            render: (t: Ticket) => (
                <span style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>{t.asignadoA}</span>
            ),
        },
        {
            key: 'estado', header: 'Estado', width: '110px',
            render: (t: Ticket) => <StatusBadge status={t.estado} />,
        },
    ];

    const getSLAColor = (estado: string) => {
        if (estado === 'VENCIDO') return 'var(--color-danger)';
        if (estado === 'EN_RIESGO') return 'var(--color-warning)';
        return 'var(--color-accent)';
    };

    return (
        <>
            <Topbar
                title="CRM & Soporte Omnicanal"
                subtitle="Módulo F · Gestión de tickets, comunicaciones y timeline unificado por cliente"
                alertCount={5}
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm">
                            <Filter size={13} /> Filtros SLA
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <Plus size={13} /> Nuevo Ticket
                        </button>
                    </div>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                {/* ── KPIs CRM ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                    {[
                        { label: 'Tickets Abiertos', value: '18', color: 'var(--color-info)', icon: <MessageSquare size={14} /> },
                        { label: 'SLA Vencidos', value: '2', color: 'var(--color-danger)', icon: <AlertTriangle size={14} /> },
                        { label: 'En Riesgo', value: '3', color: 'var(--color-warning)', icon: <Clock size={14} /> },
                        { label: 'Resueltos hoy', value: '7', color: 'var(--color-accent)', icon: <CheckCircle size={14} /> },
                        { label: 'CSAT promedio', value: '94%', color: 'var(--color-purple)', icon: <Zap size={14} /> },
                    ].map(({ label, value, color, icon }) => (
                        <div key={label} className="kpi-card" style={{ '--accent-color': color, padding: 16 } as any}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{label}</span>
                                <span style={{ color }}>{icon}</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{value}</div>
                        </div>
                    ))}
                </div>

                {/* ── Canales de comunicación ──── */}
                <div style={{
                    display: 'flex', gap: 10,
                    background: 'var(--color-bg-card)', border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-lg)', padding: '14px 16px',
                    overflowX: 'auto',
                }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600, alignSelf: 'center', whiteSpace: 'nowrap' }}>
                        Canales Activos:
                    </span>
                    {[
                        { canal: 'WhatsApp Business', count: 142, active: true, icon: '📱', color: '#25D366' },
                        { canal: 'Email SMTP/IMAP', count: 89, active: true, icon: '📧', color: '#63b3ff' },
                        { canal: 'Telegram Bot', count: 18, active: true, icon: '✈️', color: '#0088cc' },
                        { canal: 'Telefonía VoIP', count: 27, active: true, icon: '📞', color: '#f5a623' },
                        { canal: 'Portal Web', count: 54, active: true, icon: '🌐', color: '#805ad5' },
                        { canal: 'Videollamada', count: 12, active: true, icon: '📹', color: '#e53e3e' },
                    ].map(({ canal, count, active, icon, color }) => (
                        <div key={canal} style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            background: 'var(--color-bg-elevated)', border: `1px solid ${active ? color + '40' : 'var(--color-border)'}`,
                            borderRadius: 'var(--radius-md)', padding: '8px 14px', whiteSpace: 'nowrap',
                        }}>
                            <span>{icon}</span>
                            <div>
                                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: active ? color : 'var(--color-text-muted)' }}>{canal}</div>
                                <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>{count} tickets</div>
                            </div>
                            {active && <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />}
                        </div>
                    ))}
                </div>

                {/* ── Main CRM Layout: Lista + Detalle ──── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 16, alignItems: 'start' }}>

                    {/* Lista Tickets */}
                    <div>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '7px 12px', flex: 1 }}>
                                <Search size={14} color="var(--color-text-muted)" />
                                <input placeholder="Buscar ticket, empresa, ejecutivo..." className="input" style={{ background: 'none', border: 'none', padding: 0, fontSize: '0.83rem' }} />
                            </div>
                            <select className="input" style={{ width: 'auto', padding: '7px 12px' }}>
                                <option>Todos los estados</option>
                                <option>Solo urgentes</option>
                                <option>SLA vencido</option>
                            </select>
                        </div>

                        <DataTable
                            columns={ticketColumns}
                            data={mockTickets}
                            keyExtractor={(t) => t.id}
                            onRowClick={(t) => setActiveTicket(t)}
                        />
                    </div>

                    {/* Detalle Ticket / Timeline */}
                    {activeTicket && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

                            {/* Header Ticket */}
                            <div className="card" style={{ padding: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginBottom: 2 }}>
                                            #{activeTicket.id} · {activeTicket.creadoEn.toLocaleDateString('es-CL')}
                                        </div>
                                        <h3 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                                            {activeTicket.asunto}
                                        </h3>
                                    </div>
                                    <StatusBadge status={activeTicket.prioridad} />
                                </div>

                                {/* SLA Timer */}
                                <div style={{
                                    background: getSLAColor(activeTicket.slaEstado) + '15',
                                    border: `1px solid ${getSLAColor(activeTicket.slaEstado)}40`,
                                    borderRadius: 8, padding: '8px 12px', marginBottom: 12,
                                    display: 'flex', alignItems: 'center', gap: 8,
                                }}>
                                    <Clock size={13} color={getSLAColor(activeTicket.slaEstado)} />
                                    <span style={{ fontSize: '0.75rem', color: getSLAColor(activeTicket.slaEstado), fontWeight: 600 }}>
                                        SLA {activeTicket.slaEstado === 'VENCIDO' ? '⚡ VENCIDO' : activeTicket.slaEstado === 'EN_RIESGO' ? '⚠️ En riesgo' : '✓ OK'}
                                    </span>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>
                                        Límite: {activeTicket.slaLimite.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.75rem' }}>
                                    <div>
                                        <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>Empresa</div>
                                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{activeTicket.razonSocialEmpresa}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>Asignado a</div>
                                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{activeTicket.asignadoA}</div>
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>Canal</div>
                                        <CanalBadge canal={activeTicket.canal} />
                                    </div>
                                    <div>
                                        <div style={{ color: 'var(--color-text-muted)', marginBottom: 2 }}>Estado</div>
                                        <StatusBadge status={activeTicket.estado} size="sm" />
                                    </div>
                                </div>

                                {/* Vinculo ERP */}
                                {activeTicket.vinculoERP && (
                                    <div style={{
                                        marginTop: 10, background: 'var(--color-bg-elevated)',
                                        border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px',
                                        display: 'flex', alignItems: 'center', gap: 8,
                                    }}>
                                        <Link2 size={13} color="var(--color-info)" />
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                                            Vinculado: {activeTicket.vinculoERP.tipo}
                                        </span>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-primary)', fontWeight: 600 }}>
                                            {activeTicket.vinculoERP.descripcion}
                                        </span>
                                        <button style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-info)', fontSize: '0.72rem' }}>
                                            Abrir →
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Timeline de Mensajes */}
                            <div className="card" style={{ padding: '16px' }}>
                                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: 12, color: 'var(--color-text-secondary)' }}>
                                    💬 Timeline de Comunicación
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {activeTicket.mensajes.map(msg => (
                                        <div key={msg.id} style={{
                                            display: 'flex', flexDirection: 'column', gap: 3,
                                            alignItems: msg.autorTipo === 'CLIENTE' ? 'flex-start' : 'flex-end',
                                        }}>
                                            <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
                                                {msg.autor} · {msg.fecha.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                            <div style={{
                                                maxWidth: '90%', padding: '8px 12px', borderRadius: 10,
                                                background: msg.autorTipo === 'CLIENTE'
                                                    ? 'var(--color-bg-elevated)'
                                                    : msg.autorTipo === 'SISTEMA'
                                                        ? 'rgba(99,179,255,0.15)'
                                                        : 'rgba(37,211,102,0.15)',
                                                border: `1px solid ${msg.autorTipo === 'CLIENTE' ? 'var(--color-border)' : msg.autorTipo === 'SISTEMA' ? 'rgba(99,179,255,0.3)' : 'rgba(37,211,102,0.3)'}`,
                                                fontSize: '0.8rem', color: 'var(--color-text-primary)',
                                            }}>
                                                {msg.contenido}
                                            </div>
                                        </div>
                                    ))}

                                    {activeTicket.mensajes.length === 0 && (
                                        <div style={{ textAlign: 'center', padding: 20, color: 'var(--color-text-muted)', fontSize: '0.82rem' }}>
                                            Sin mensajes aún. Creado automáticamente por el sistema.
                                        </div>
                                    )}
                                </div>

                                {/* Reply Box */}
                                <div style={{
                                    marginTop: 12, background: 'var(--color-bg-elevated)',
                                    border: '1px solid var(--color-border)', borderRadius: 8, padding: '8px 12px',
                                }}>
                                    <textarea
                                        placeholder="Escribir respuesta al cliente..."
                                        rows={2}
                                        style={{
                                            width: '100%', background: 'none', border: 'none', outline: 'none',
                                            color: 'var(--color-text-primary)', fontSize: '0.82rem', resize: 'none',
                                            fontFamily: 'var(--font-primary)',
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                                        <div style={{ display: 'flex', gap: 8 }}>
                                            <button className="btn btn-secondary btn-sm">
                                                <CheckCircle size={12} /> Interno
                                            </button>
                                            <button className="btn btn-secondary btn-sm">
                                                <Link2 size={12} /> Vincular
                                            </button>
                                        </div>
                                        <button className="btn btn-primary btn-sm">
                                            <Send size={12} /> Enviar
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones */}
                            <div className="card" style={{ padding: '14px' }}>
                                <h4 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: 10, color: 'var(--color-text-secondary)' }}>
                                    Acciones del Ticket
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                    {[
                                        { label: 'Marcar como Resuelto', icon: <CheckCircle size={13} />, color: 'var(--color-accent)' },
                                        { label: 'Escalar a Supervisor', icon: <AlertTriangle size={13} />, color: 'var(--color-warning)' },
                                        { label: 'Crear tarea en ERP', icon: <Link2 size={13} />, color: 'var(--color-info)' },
                                        { label: 'Agendar videollamada', icon: <Video size={13} />, color: 'var(--color-purple)' },
                                    ].map(({ label, icon, color }) => (
                                        <button key={label} style={{
                                            display: 'flex', alignItems: 'center', gap: 8, background: 'none',
                                            border: '1px solid var(--color-border)', borderRadius: 8, padding: '7px 10px',
                                            cursor: 'pointer', fontSize: '0.78rem', color: 'var(--color-text-secondary)',
                                            transition: 'all 150ms ease', width: '100%', textAlign: 'left',
                                        }}>
                                            <span style={{ color }}>{icon}</span>
                                            {label}
                                            <ChevronRight size={12} style={{ marginLeft: 'auto' }} />
                                        </button>
                                    ))}
                                </div>
                            </div>

                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
