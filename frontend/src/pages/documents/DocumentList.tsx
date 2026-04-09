import { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Filter, File } from 'lucide-react';

const API_URL = 'http://localhost:3000';

const DocumentList = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await axios.get(`${API_URL}/documents`);
        if (res.data?.success) {
          setDocuments(res.data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(dateString));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'ACTIVE': return { color: 'var(--accent-success)', bg: 'rgba(16, 185, 129, 0.1)' };
      case 'EXPIRED': return { color: 'var(--accent-danger)', bg: 'rgba(239, 68, 68, 0.1)' };
      case 'DRAFT': return { color: 'var(--text-secondary)', bg: 'rgba(113, 113, 122, 0.1)' };
      default: return { color: 'var(--accent-warning)', bg: 'rgba(245, 158, 11, 0.1)' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Document Registry</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage all compliant files and related metadata</p>
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }}>
        {/* Toolbar */}
        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
            <Search size={18} color="var(--text-secondary)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search documents..." 
              style={{
                width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem',
                backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', outline: 'none'
              }}
            />
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.6rem 1rem', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)', color: 'var(--text-primary)'
          }}>
            <Filter size={18} /> Filters
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Document Title</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Category</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Status</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Issue Date</th>
                <th style={{ padding: '1rem', fontWeight: 500 }}>Expiry Date</th>
                <th style={{ padding: '1rem', fontWeight: 500, width: '50px' }}></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading secure payload...</td></tr>
              ) : documents.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <File size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                  No documents found in registry
                </td></tr>
              ) : documents.map((doc: any) => {
                const statusStyle = getStatusColor(doc.status);
                return (
                  <tr key={doc.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1rem', fontWeight: 500 }}>{doc.title}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{doc.category?.name || 'N/A'}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600,
                        backgroundColor: statusStyle.bg, color: statusStyle.color 
                      }}>
                        {doc.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{formatDate(doc.issue_date)}</td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{formatDate(doc.expiry_date)}</td>
                    <td style={{ padding: '1rem' }}>
                      <button onClick={() => window.location.href=`/documents/${doc.id}`} style={{
                        color: 'var(--text-secondary)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.75rem'
                      }}>
                        View
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DocumentList;
