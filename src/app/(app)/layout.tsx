import type { Metadata } from 'next';
import { Sidebar } from '@/components/layout/Sidebar';

export const metadata: Metadata = {
    title: 'Dashboard | BPO-Core Chile',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-bg)' }}>
            <Sidebar />
            <main style={{
                marginLeft: 260,
                flex: 1,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                background: 'var(--color-bg-elevated)',  /* light gray #F0F0F0 */
            }}>
                {children}
            </main>
        </div>
    );
}
