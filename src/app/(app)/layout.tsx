import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/Sidebar';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: 'Dashboard | BPO-Core Chile',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
            <Suspense fallback={<div style={{ width: 260, background: 'var(--color-primary)' }} />}>
                <Sidebar />
            </Suspense>
            <main style={{
                marginLeft: 260,
                flex: 1,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                background: 'var(--color-bg-elevated)',  /* light gray #F0F0F0 */
            }}>
                <Suspense fallback={<div>Cargando...</div>}>
                    {children}
                </Suspense>
            </main>
        </div>
    );
}
