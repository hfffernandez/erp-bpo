'use client';

import { useState } from 'react';
import { Topbar } from '@/components/layout/Sidebar';
import { DataTable, StatusBadge, ProgressRing } from '@/components/ui';
import { mockEmpresas, formatCLP } from '@/lib/mockData';
import {
    Clock, CheckCircle, AlertTriangle, FileText,
    RefreshCw, ShieldCheck, ArrowRight, Calendar,
    Lock, Unlock, Download, Send
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

// ─── Cierre Mensual Page ───────────────────────────────────────

export default function CierreMensualPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const empresaId = searchParams.get('empresaId');
    const activeEmpresa = mockEmpresas.find(e => e.id === empresaId);

    const [steps, setSteps] = useState([
        { id: 1, task: 'Conciliación Bancaria', status: 'COMPLETADO', owner: 'Catalina Fuentes', date: '25/02/2026' },
        { id: 2, task: 'Centralización de Ventas (SII)', status: 'COMPLETADO', owner: 'Sistema (Auto)', date: '26/02/2026' },
        { id: 3, task: 'Revisión de Gastos y Compras', status: 'EN_PROCESO', owner: 'Catalina Fuentes', date: '-' },
        { id: 4, task: 'Cálculo de Impuestos Mensuales (F29)', status: 'PENDIENTE', owner: 'Tributaria', date: '-' },
        { id: 5, task: 'Provisión de Remuneraciones', status: 'PENDIENTE', owner: 'RRHH', date: '-' },
        { id: 6, task: 'Generación de Balance Mensual', status: 'PENDIENTE', owner: 'Gerencia BPO', date: '-' },
    ]);

    if (!empresaId) {
        return (
            <>
                <Topbar title="Cierre Contable Mensual" subtitle="Selección de empresa requerida" />
                <div style={{ height: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(60,2,19,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                        <Calendar size={48} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-heading)' }}>Selecciona una Empresa</h2>
                        <p style={{ fontSize: '0.94rem', color: 'var(--color-text-muted)', maxWidth: 360, margin: '12px auto 32px', lineHeight: 1.6 }}>
                            El cierre contable es un proceso crítico que requiere el contexto de un cliente específico.
                        </p>
                        <button onClick={() => router.push('/clientes')} className="btn btn-primary" style={{ padding: '12px 32px', fontSize: '1rem', borderRadius: 10 }}>
                            Ir al Portafolio
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Topbar
                title={`Cierre Mensual: ${activeEmpresa?.razonSocial}`}
                subtitle={`Proceso de Cierre · Febrero 2026 · ${activeEmpresa?.rut}`}
                actions={
                    <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn-secondary btn-sm">
                            <Download size={13} /> Borrador Balance
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <Lock size={13} /> Bloquear Período
                        </button>
                    </div>
                }
            />

            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>

                {/* ── Status Header ── */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
                    <div className="card" style={{ padding: 24, display: 'flex', gap: 32, alignItems: 'center' }}>
                        <ProgressRing value={33} size={100} strokeWidth={10} color="var(--color-warning)" label="33%" />
                        <div style={{ flex: 1 }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: 8, color: 'var(--color-text-primary)' }}>
                                Periodo Febrero 2026 - Abierto
                            </h3>
                            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                                Has completado 2 de 6 hitos necesarios para el cierre. El cumplimiento del SLA está en <b>verde (92%)</b>.
                                Recuerda validar todos los auxiliares antes de emitir el balance.
                            </p>
                            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>✓ Bancos</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>✓ Ventas</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>○ Compras</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>○ Tributario</div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 20, background: 'var(--color-primary)', color: '#fff' }}>
                        <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: 4 }}>Fecha Límite Cierre (SLA)</div>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 12 }}>10 de Marzo</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <Clock size={16} />
                            <span style={{ fontSize: '0.85rem' }}>Quedan 12 días</span>
                        </div>
                        <button style={{
                            width: '100%', marginTop: 16, background: 'rgba(255,255,255,0.15)',
                            border: '1px solid rgba(255,255,255,0.2)', borderRadius: 6, padding: '8px',
                            color: '#fff', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer'
                        }}>
                            Notificar Retrasos
                        </button>
                    </div>
                </div>

                {/* ── Checklist de Cierre ── */}
                <div className="card" style={{ padding: 0 }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>Hitos de Cierre Mensual</h3>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Gestor: <b>Catalina Fuentes</b></div>
                    </div>
                    <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ width: '40px' }}>#</th>
                                    <th>Actividad / Hito</th>
                                    <th>Estado</th>
                                    <th>Asignado a</th>
                                    <th>Fecha Ejecución</th>
                                    <th style={{ textAlign: 'right' }}>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {steps.map((s) => (
                                    <tr key={s.id}>
                                        <td style={{ fontWeight: 700, color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>{s.id}</td>
                                        <td>
                                            <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{s.task}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>Proceso estándar IFRS</div>
                                        </td>
                                        <td><StatusBadge status={s.status} /></td>
                                        <td style={{ fontSize: '0.82rem' }}>{s.owner}</td>
                                        <td style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>{s.date}</td>
                                        <td style={{ textAlign: 'right' }}>
                                            <button className="btn btn-secondary btn-sm" style={{ padding: '4px 8px' }}>
                                                {s.status === 'COMPLETADO' ? 'Revisar' : 'Ejecutar'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* ── Certificación y Bloqueo ── */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--color-success)' }}>
                        <ShieldCheck size={20} color="var(--color-success)" style={{ marginBottom: 10 }} />
                        <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>Integridad de Datos</div>
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Asientos cuadrados y balances auxiliares conciliados con el Libro Mayor.</p>
                    </div>
                    <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--color-info)' }}>
                        <FileText size={20} color="var(--color-info)" style={{ marginBottom: 10 }} />
                        <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>Reportes Listos</div>
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>Estados Financieros generados y listos para revisión de gerencia.</p>
                    </div>
                    <div className="card" style={{ padding: 16, borderLeft: '4px solid var(--color-warning)' }}>
                        <Lock size={20} color="var(--color-warning)" style={{ marginBottom: 10 }} />
                        <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>Período Contable</div>
                        <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>El período se encuentra <b>ABIERTO</b>. Se permiten modificaciones transaccionales.</p>
                    </div>
                </div>

            </div>
        </>
    );
}
