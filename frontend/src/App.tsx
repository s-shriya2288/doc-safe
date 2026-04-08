import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import DocumentList from './pages/documents/DocumentList';
import UploadDocument from './pages/documents/UploadDocument';
import DocumentDetail from './pages/documents/DocumentDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="documents" element={<DocumentList />} />
          <Route path="documents/upload" element={<UploadDocument />} />
          <Route path="documents/:id" element={<DocumentDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
