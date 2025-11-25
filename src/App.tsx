import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import { useChecklistStore } from './stores/checklistStore';
import { useSavingsStore } from './stores/savingsStore';
import { useProfileStore } from './stores/profileStore';
import { useTheme } from './hooks/useTheme';
import { Login } from './pages/Login';
import { Daily } from './pages/Daily';
import { Weekly } from './pages/Weekly';
import { Monthly } from './pages/Monthly';
import { Savings } from './pages/Savings';
import { Settings } from './pages/Settings';
import { Sidebar } from './components/Layout/Sidebar';
import { BottomNav } from './components/Layout/BottomNav';
import { Header } from './components/Layout/Header';

function App() {
  const { user, isAuthenticated, initialize: initializeAuth } = useAuthStore();
  const { initialize: initializeChecklist } = useChecklistStore();
  const { initialize: initializeSavings } = useSavingsStore();
  const { initialize: initializeProfile } = useProfileStore();
  const { isDark } = useTheme();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apply Dark Mode to document root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    initializeAuth();
    initializeProfile();
  }, [initializeAuth, initializeProfile]);

  useEffect(() => {
    if (user) {
      initializeChecklist(user.id);
      initializeSavings(user.id);
    }
  }, [user, initializeChecklist, initializeSavings]);

  if (!isAuthenticated) {
    return <Login />;
  }

  const pageTitles = {
    '/daily': 'Checklist Harian',
    '/weekly': 'Target Mingguan',
    '/monthly': 'Pencapaian Bulanan',
    '/savings': 'Tabungan Ibadah',
    '/settings': 'Pengaturan'
  };

  const currentPath = window.location.pathname;
  const currentTitle = pageTitles[currentPath as keyof typeof pageTitles] || 'Ibadah Tracker';

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        
        {/* Sidebar (Desktop) */}
        <div className="hidden lg:block lg:w-64">
          <Sidebar isOpen={true} onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0">
          <Header 
            onMenuClick={() => setSidebarOpen(true)} 
            title={currentTitle}
          />
          
          {/* Sidebar Mobile */}
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
          />

          <main className="flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/daily" replace />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/weekly" element={<Weekly />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>

          <BottomNav />
        </div>
      </div>
    </Router>
  );
}

export default App;
