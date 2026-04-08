import { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadCloud, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

const UploadDocument = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    issue_date: '',
    expiry_date: ''
  });

  useEffect(() => {
    axios.get(`${API_URL}/categories`).then(res => {
      if (res.data?.success) setCategories(res.data.data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        issue_date: formData.issue_date ? new Date(formData.issue_date).toISOString() : undefined,
        expiry_date: formData.expiry_date ? new Date(formData.expiry_date).toISOString() : undefined,
      };
      
      const res = await axios.post(`${API_URL}/documents`, payload);
      if (res.data?.success) {
        navigate('/documents');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating document.');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: 'var(--bg-tertiary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)',
    outline: 'none',
    fontFamily: 'inherit',
    marginTop: '0.5rem'
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Upload New Document</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Enter compliance metadata for archival</p>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* File Dropzone Mockup */}
          <div style={{
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 2rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-tertiary)',
            cursor: 'pointer',
            transition: 'border-color 0.2s',
          }}>
             <UploadCloud size={48} color="var(--accent-primary)" style={{ margin: '0 auto 1rem' }} />
             <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Drag & drop file or browse</h3>
             <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Supports PDF, DOCX, JPG up to 10MB</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Document Title *</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} style={inputStyle} placeholder="E.g., Q3 Financial Audit" />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Category</label>
              <select name="category_id" value={formData.category_id} onChange={handleChange} style={inputStyle}>
                <option value="">Select a category</option>
                {categories.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Issue Date</label>
              <input type="date" name="issue_date" value={formData.issue_date} onChange={handleChange} style={inputStyle} />
            </div>

            <div>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500 }}>Expiry Date</label>
              <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} style={inputStyle} />
            </div>
          </div>

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" onClick={() => navigate('/documents')} style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontWeight: 500,
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)'
            }}>Cancel</button>

            <button type="submit" style={{
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-md)',
              color: 'white',
              fontWeight: 500,
              backgroundColor: 'var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-glow)'
            }}>
              <CheckCircle size={18} /> Ensure Compliance & Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocument;
