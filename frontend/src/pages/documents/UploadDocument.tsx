import { useState, useEffect } from 'react';
import api from '../../api';
import { UploadCloud, CheckCircle, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UploadDocument = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [toast, setToast] = useState<{type: string, message: string} | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    issue_date: '',
    expiry_date: ''
  });

  useEffect(() => {
    api.get('/categories').then(res => {
      if (res.data?.success) setCategories(res.data.data);
    }).catch(() => {
      // Optional: Handle error for category pull
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);
    try {
      const payload = {
        ...formData,
        issue_date: formData.issue_date ? new Date(formData.issue_date).toISOString() : undefined,
        expiry_date: formData.expiry_date ? new Date(formData.expiry_date).toISOString() : undefined,
      };
      
      const res = await api.post('/documents', payload);
      if (res.data?.success) {
        setToast({ type: 'success', message: `Amazing! Your document "${formData.title}" has been securely archived.` });
        setTimeout(() => navigate('/documents'), 1500);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'We ran into a slight issue trying to save that. Check the inputs!';
      setToast({ type: 'error', message: errorMessage });
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1.25rem',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: '12px',
    color: 'var(--text-primary)',
    outline: 'none',
    fontFamily: 'inherit',
    marginTop: '0.5rem',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', animation: 'fadeIn 0.5s ease', paddingBottom: '3rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
          Commit a New Document
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Simply drop your payload here. We'll automatically encrypt and organize your timeline.
        </p>
      </div>

      {toast && (
        <div style={{
          padding: '1.25rem 1.5rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: toast.type === 'success' ? '#4ade80' : '#f87171',
          border: `1px solid ${toast.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          animation: 'fadeIn 0.3s ease'
        }}>
          {toast.type === 'success' ? <CheckCircle size={22} /> : <AlertTriangle size={22} />}
          <span style={{ fontWeight: 500, fontSize: '1.05rem' }}>{toast.message}</span>
        </div>
      )}

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '3rem',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div 
            onDragOver={(e) => { e.preventDefault(); setIsHovering(true); }}
            onDragLeave={() => setIsHovering(false)}
            onDrop={(e) => { e.preventDefault(); setIsHovering(false); }}
            style={{
              border: `2px dashed ${isHovering ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              borderRadius: '16px',
              padding: '4rem 2rem',
              textAlign: 'center',
              backgroundColor: isHovering ? 'rgba(79, 70, 229, 0.05)' : 'var(--bg-tertiary)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: isHovering ? 'scale(1.01)' : 'scale(1)'
            }}>
             <UploadCloud 
                size={54} 
                color={isHovering ? 'var(--accent-primary)' : 'var(--text-secondary)'} 
                style={{ margin: '0 auto 1.25rem', transition: 'color 0.3s' }} 
             />
             <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', fontSize: '1.35rem', fontWeight: 500 }}>
                {isHovering ? 'Drop it right here!' : 'Drag and drop your file, or click to browse'}
             </h3>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We support PDFs, Docs, and standard image formats up to 25MB.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Document Title <span style={{color: 'var(--accent-primary)'}}>*</span></label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} placeholder="E.g., Quarterly Financial Assessment" />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Filing Category</label>
              <select name="category_id" value={formData.category_id} onChange={handleChange} style={inputStyle}>
                <option value="">Choose a proper tracking folder...</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Effective Date</label>
              <input type="date" name="issue_date" value={formData.issue_date} onChange={handleChange} style={inputStyle} />
            </div>

            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block' }}>Expiration Tracker</label>
              <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid var(--border-color)' }}>
            <button type="button" onClick={() => navigate('/documents')} style={{
              padding: '0.85rem 1.75rem',
              borderRadius: '12px',
              color: 'var(--text-primary)',
              fontWeight: 600,
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              Cancel Upload
            </button>

            <button type="submit" style={{
              padding: '0.85rem 2rem',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 600,
              backgroundColor: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: 'var(--shadow-glow)'
            }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <CheckCircle size={20} /> Seal Document
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;
