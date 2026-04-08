import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle } from 'lucide-react';

const DocumentDetail = () => {
  const { id } = useParams();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/documents" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', textDecoration: 'none' }}>
        <ArrowLeft size={18} /> Back to Library
      </Link>
      
      <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
             <FileText size={32} color="var(--accent-primary)" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>Audit Document Reference <br/><span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>{id}</span></h1>
            <p style={{ color: 'var(--text-secondary)' }}>Status: <span style={{ color: 'var(--accent-success)', fontWeight: 500 }}>ACTIVE</span></p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Metadata</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Issue Date:</strong> 2026-01-01</li>
              <li><strong>Expiry Date:</strong> 2027-01-01</li>
              <li><strong>Category:</strong> General Compliance</li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Compliance Path</h3>
            <div style={{ backgroundColor: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
               <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-success)', margin: 0 }}><CheckCircle size={16} /> Fully Compliant</p>
               <br/>
               <button style={{ width: '100%', padding: '0.5rem', backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)' }}>View Raw File Payload</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
