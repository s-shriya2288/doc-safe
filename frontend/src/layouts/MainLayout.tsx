import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, ShieldAlert, Upload } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const MainLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Documents', path: '/documents', icon: FileText },
    { name: 'Compliance', path: '/compliance', icon: ShieldAlert },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--bg-secondary)', 
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', margin: 0 }} className="text-gradient">
            <ShieldAlert size={28} color="#818cf8"/>
            DocSafe
          </h1>
        </div>

        <nav style={{ flex: 1, padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                  fontWeight: isActive ? 500 : 400,
                  transition: 'all 0.2s',
                  textDecoration: 'none'
                }}
              >
                <Icon size={20} color={isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ 
          height: '70px', 
          borderBottom: '1px solid var(--border-color)', 
          backgroundColor: 'var(--bg-glass)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 2rem'
        }}>
          <Link to="/documents/upload" style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            backgroundColor: 'var(--accent-primary)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: 'var(--radius-md)',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'background 0.2s'
          }}>
            <Upload size={18} />
            Upload Document
          </Link>
        </header>

        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
