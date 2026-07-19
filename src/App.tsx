import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Car, Accessibility, Leaf, ShieldAlert, HeartHandshake, Settings } from 'lucide-react';
import Header from './components/Header';
import Overview from './pages/Overview';
import CrowdIntelligence from './pages/CrowdIntelligence';
import Transportation from './pages/Transportation';
import AccessibilityPage from './pages/Accessibility';
import Sustainability from './pages/Sustainability';
import EmergencyOps from './pages/EmergencyOps';
import VolunteerManagement from './pages/VolunteerManagement';

const navItems = [
  { name: 'Overview', icon: <LayoutDashboard size={20} />, path: '/' },
  { name: 'Crowd Intelligence', icon: <Users size={20} />, path: '/crowd' },
  { name: 'Transportation', icon: <Car size={20} />, path: '/transport' },
  { name: 'Volunteers', icon: <HeartHandshake size={20} />, path: '/volunteers' },
  { name: 'Accessibility', icon: <Accessibility size={20} />, path: '/accessibility' },
  { name: 'Sustainability', icon: <Leaf size={20} />, path: '/sustainability' },
  { name: 'Emergency Ops', icon: <ShieldAlert size={20} />, path: '/emergency' },
];

function Sidebar() {
  return (
    <div className="w-64 h-screen border-r border-border bg-panel flex flex-col flex-shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gradient flex items-center gap-2">
          FIOS
          <span className="text-xs bg-neon-magenta/20 text-neon-magenta px-2 py-1 rounded-full border border-neon-magenta/50">2026</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Autonomous Stadium OS</p>
      </div>
      <nav className="flex-1 px-4 space-y-1 mt-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? item.path === '/emergency'
                    ? 'bg-red-500/10 text-red-400 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                    : 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {item.icon}
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={20} />
          <span className="font-medium text-sm">Settings</span>
        </button>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Overview />} />
        <Route path="/crowd" element={<CrowdIntelligence />} />
        <Route path="/transport" element={<Transportation />} />
        <Route path="/volunteers" element={<VolunteerManagement />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/emergency" element={<EmergencyOps />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-background text-foreground">
        <Sidebar />
        <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
          {/* Background glow effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-[100px] pointer-events-none"></div>
          <Header />
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
