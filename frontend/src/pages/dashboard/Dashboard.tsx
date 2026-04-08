import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  FileText, AlertCircle, Clock, ShieldCheck, 
  Activity 
} from 'lucide-react';

const API_URL = 'http://localhost:3000';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalDocuments: 0,
    expiredDocuments: 0,
    upcomingRenewals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/dashboard/summary`);
        if (res.data?.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: 'Total Documents', value: stats.totalDocuments, icon: FileText, color: 'var(--accent-primary)', bg: 'rgba(79, 70, 229, 0.1)' },
    { title: 'Expired', value: stats.expiredDocuments, icon: AlertCircle, color: 'var(--accent-danger)', bg: 'rgba(239, 68, 68, 0.1)' },
    { title: 'Upcoming Renewals', value: stats.upcomingRenewals, icon: Clock, color: 'var(--accent-warning)', bg: 'rgba(245, 158, 11, 0.1)' },
  ];

  if (loading) {
    return <div style={{ color: 'var(--text-secondary)' }}>Loading parameters from core node...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Overview Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Central compliance monitoring matrix</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {statCards.map((card, i) => (
          <div key={i} style={{ 
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <div style={{ 
              width: '60px', height: '60px', 
              borderRadius: '50%', 
              backgroundColor: card.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <card.icon size={28} color={card.color} />
            </div>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.25rem' }}>{card.title}</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>{card.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          minHeight: '300px'
       }}>
        <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={20} color="var(--accent-primary)"/> Recommended Actions
        </h3>
        
        {stats.expiredDocuments > 0 ? (
          <div style={{ padding: '1rem', borderLeft: '4px solid var(--accent-danger)', backgroundColor: 'var(--bg-tertiary)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Critical Renewal Required</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>You have {stats.expiredDocuments} expired document(s) causing immediate compliance failure.</p>
          </div>
        ) : (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <ShieldCheck size={48} color="var(--accent-success)" style={{ margin: '0 auto 1rem', opacity: 0.8 }} />
            <p>All compliance metrics are showing stable active states.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
