import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ChatPage from './pages/ChatPage';
import SkillsPage from './pages/SkillsPage';
import TasksPage from './pages/TasksPage';
import SettingsPage from './pages/SettingsPage';
import { getAuth } from './services/auth';

const TABS = [
  { path: '/chat', icon: '💬', label: '聊天' },
  { path: '/skills', icon: '📋', label: '技能' },
  { path: '/tasks', icon: '⏰', label: '任务' },
  { path: '/settings', icon: '⚙️', label: '设置' },
];

function TabBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show tabs on non-login pages
  if (location.pathname === '/login') return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 flex justify-around py-3"
      style={{ background: '#12121E', borderTop: '1px solid #1E1E30' }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.path}
          onClick={() => navigate(tab.path)}
          className="flex flex-col items-center"
          style={{ color: location.pathname === tab.path ? '#667EEA' : '#8888AA' }}
        >
          <span className="text-xl">{tab.icon}</span>
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    getAuth().then((auth) => {
      if (!auth) {
        navigate('/login', { replace: true });
      }
    });
  }, [navigate]);

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: '#0A0A14' }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/chat"
            element={<ProtectedRoute><ChatPage /></ProtectedRoute>}
          />
          <Route
            path="/skills"
            element={<ProtectedRoute><SkillsPage /></ProtectedRoute>}
          />
          <Route
            path="/tasks"
            element={<ProtectedRoute><TasksPage /></ProtectedRoute>}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute><SettingsPage /></ProtectedRoute>}
          />
          <Route path="*" element={<LoginPage />} />
        </Routes>
        <TabBar />
      </div>
    </BrowserRouter>
  );
}
