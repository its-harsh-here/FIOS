import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Star, HeartHandshake, CheckCircle } from 'lucide-react';

const tasks = [
  { id: 'T-01', volunteer: 'Aiko M.', lang: 'Japanese, English', zone: 'Gate A', task: 'Fan Navigation', status: 'Active' },
  { id: 'T-02', volunteer: 'Carlos R.', lang: 'Spanish, English', zone: 'Gate B', task: 'Crowd Guidance', status: 'Active' },
  { id: 'T-03', volunteer: 'Fatima S.', lang: 'Arabic, French', zone: 'VIP Lounge', task: 'Accessibility Assist', status: 'Active' },
  { id: 'T-04', volunteer: 'Mei L.', lang: 'Mandarin, English', zone: 'Food Court', task: 'Information Desk', status: 'Break' },
  { id: 'T-05', volunteer: 'James O.', lang: 'English, Yoruba', zone: 'Parking Zone B', task: 'Arrival Flow', status: 'Active' },
  { id: 'T-06', volunteer: 'Ana B.', lang: 'Portuguese, Spanish', zone: 'Medical Bay 1', task: 'Emergency Support', status: 'Standby' },
];

const VolunteerManagement = () => {
  const [activeCount, setActiveCount] = useState(284);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCount(prev => prev + Math.floor(Math.random() * 5 - 2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 overflow-y-auto custom-scrollbar z-10 p-6"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">Volunteer Management</h2>
        <p className="text-sm text-gray-400 mt-1">AI-optimized task allocation and real-time deployment</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {[
          { icon: <Users />, label: 'Active Volunteers', value: activeCount, color: 'text-neon-cyan' },
          { icon: <HeartHandshake />, label: 'Tasks Completed', value: '1,240', color: 'text-green-400' },
          { icon: <Star />, label: 'Avg. Fan Rating', value: '4.8 / 5', color: 'text-fifa-gold' },
          { icon: <CheckCircle />, label: 'Coverage Rate', value: '97%', color: 'text-purple-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-5 rounded-2xl flex items-center gap-4">
            <div className={`p-3 rounded-full bg-panel border border-border ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-gray-400 text-xs">{stat.label}</p>
              <p className="text-xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-white">Active Volunteer Assignments</h3>
            <button className="text-xs text-neon-cyan border border-neon-cyan/30 px-3 py-1 rounded-full hover:bg-neon-cyan/10 transition-all">
              + Assign Task
            </button>
          </div>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-3 bg-background/50 border border-border rounded-xl">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                  {t.volunteer.split(' ')[0][0]}{t.volunteer.split(' ')[1][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{t.volunteer}</p>
                  <p className="text-xs text-gray-400 truncate">🌐 {t.lang}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-bold text-gray-200">{t.task}</p>
                  <p className="text-[10px] text-gray-500">📍 {t.zone}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0 ${
                  t.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  t.status === 'Break' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>{t.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="text-sm font-bold text-white mb-4">AI Deployment Suggestions</h3>
            <div className="space-y-3">
              {[
                { zone: 'Gate B', reason: 'High crowd density detected (+200 fans)', action: 'Deploy 3 volunteers' },
                { zone: 'Sector 4 Exits', reason: 'Match ends in ~15 min, predict surge', action: 'Pre-position 5 volunteers' },
                { zone: 'Metro Hub', reason: 'Metro delay reported (8 min)', action: 'Dispatch info team' },
              ].map((sug, i) => (
                <div key={i} className="p-3 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl">
                  <p className="text-xs font-bold text-neon-cyan">{sug.zone}</p>
                  <p className="text-xs text-gray-400 mt-1">{sug.reason}</p>
                  <button className="mt-2 text-xs text-white bg-neon-cyan/20 hover:bg-neon-cyan/30 px-3 py-1 rounded-full border border-neon-cyan/30 transition-all w-full">
                    {sug.action}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex-1">
            <h3 className="text-sm font-bold text-white mb-3">Languages Available</h3>
            <div className="flex flex-wrap gap-2">
              {['English', 'Spanish', 'French', 'Arabic', 'Mandarin', 'Portuguese', 'German', 'Japanese', 'Hindi', 'Yoruba'].map((lang) => (
                <span key={lang} className="text-xs bg-panel border border-border text-gray-300 px-2 py-1 rounded-full">
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VolunteerManagement;
