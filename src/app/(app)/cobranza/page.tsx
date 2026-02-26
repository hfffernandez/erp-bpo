'use client';
import { Topbar } from '@/components/layout/Sidebar';
import { DataTable, StatusBadge, KPICard } from '@/components/ui';
import { mockCxC, formatCLP } from '@/lib/mockData';
import type { DocumentoCobro } from '@/types';
import { Receipt, Send, Link, DollarSign } from 'lucide-react';

export default function CobranzaPage() {
    const cols = [
        {
            key: 'empresa', header: 'Empresa / Cliente',
            render: (c: DocumentoCobro) => (
                <div>
                    <div style={{ fontWeight: 600 }}>{c.razonSocial}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>{c.rutContraparted}</div>
                </div>
            ),
        },
        {
            key: 'doc', header: 'Documento',
            render: (c: DocumentoCobro) => (
                <div style={{ fontSize: '0.82rem' }}>
                    {c.tipoDTE} N°{c.folioDTE}
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                        Vence: {c.fechaVencimiento.toLocaleDateString('es-CL')}
                        {c.diasVencimiento > 0 && <span style={{ color: 'var(--color-danger)', fontWeight: 600 }}> (+{c.diasVencimiento} días)</span>}
                    </div>
                </div>
            ),
        },
        {
            key: 'monto', header: 'Pendiente', align: 'right' as const,
            render: (c: DocumentoCobro) => (
                <span style={{ fontFamily: 'monospace', fontWeight: 700, color: c.estado === 'VENCIDO' ? 'var(--color-danger)' : 'var(--color-text-primary)' }}>
                    {formatCLP(c.montoPendiente)}
                </span>
            ),
        },
        {
            key: 'estado', header: 'Estado',
            render: (c: DocumentoCobro) => <StatusBadge status={c.estado} />,
        },
        {
            key: 'accion', header: 'Link de Pago',
            render: (c: DocumentoCobro) => (
                c.estado !== 'PAGADO' ? (
                    <div style={{ display: 'flex', gap: 6 }}>
                        <button className="btn btn-primary btn-sm"><Send size={11} /> WhatsApp</button>
                        <button className="btn btn-secondary btn-sm"><Link size={11} /> Copiar link</button>
                    </div>
                ) : <span style={{ color: 'var(--color-accent)', fontSize: '0.8rem' }}>✓ Cobrado</span>
            ),
        },
    ];

    const vencida = mockCxC.filter(c => c.estado === 'VENCIDO').reduce((s, c) => s + c.montoPendiente, 0);
    const total = mockCxC.reduce((s, c) => s + c.montoPendiente, 0);

    return (
        <>
            <Topbar title="CxC & Cobranza" subtitle="Módulo A.2 · Portal de pago · Integración PSP (Webpay, Khipu, MACH)" />
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    <KPICard title="Total CxC Pendiente" value={total} format="currency" accentColor="var(--color-info)" />
                    <KPICard title="CxC Vencida" value={vencida} format="currency" accentColor="var(--color-danger)" subvalue={`${Math.round((vencida / total) * 100)}% del total`} />
                    <KPICard title="DSO Promedio" value={42} format="days" accentColor="var(--color-warning)" subvalue="Meta: < 30 días" />
                    <KPICard title="Links Enviados (mes)" value={24} accentColor="var(--color-accent)" subvalue="84% tasa apertura" />
                </div>

                <div className="alert alert-info">
                    <DollarSign size={15} />
                    <div>
                        <strong>Flujo Link de Pago:</strong> El sistema detecta facturas por vencer/vencidas →
                        genera link único por cliente → envía por WhatsApp/Email → cliente paga vía Webpay/Khipu →
                        webhook confirma pago → ERP registra cobro y concilia automáticamente.
                    </div>
                </div>

                <DataTable columns={cols} data={mockCxC} keyExtractor={c => c.id} />
            </div>
        </>
    );
}
