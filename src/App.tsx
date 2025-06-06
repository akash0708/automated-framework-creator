import { Routes, Route, Navigate } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Dashboard from './pages/Dashboard';
import FrameworksList from './pages/frameworks/FrameworksList';
import CreateFramework from './pages/frameworks/CreateFramework';
import FrameworkDetails from './pages/frameworks/FrameworkDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout><Dashboard /></PageLayout>} />
      <Route path="/frameworks" element={<PageLayout><FrameworksList /></PageLayout>} />
      <Route path="/frameworks/create" element={<PageLayout><CreateFramework /></PageLayout>} />
      <Route path="/frameworks/:id" element={<PageLayout><FrameworkDetails /></PageLayout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;