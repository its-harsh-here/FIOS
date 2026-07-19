
import { LayoutDashboard, Map, Users, Car, Accessibility, Leaf, ShieldAlert, Settings } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Overview', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'Crowd Intelligence', icon: <Users size={20} /> },
    { name: 'Transportation', icon: <Car size={20} /> },
    { name: 'Accessibility', icon: <Accessibility size={20} /> },
    { name: 'Sustainability', icon: <Leaf size={20} /> },
    { name: 'Emergency Ops', icon: <ShieldAlert size={20} className="text-red-400" /> },
    { name: 'Venue Map', icon: <Map size={20} /> },
  ];

  return (
    <div className="w-64 h-screen border-r border-border bg-panel flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gradient flex items-center gap-2">
          FIOS
          <span className="text-xs bg-neon-magenta/20 text-neon-magenta px-2 py-1 rounded-full border border-neon-magenta/50">2026</span>
        </h1>
        <p className="text-xs text-gray-400 mt-1">Autonomous Stadium OS</p>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <button
            key={item.name}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              item.active 
                ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="font-medium text-sm">{item.name}</span>
          </button>
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
};

export default Sidebar;
