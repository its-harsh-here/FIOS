import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CrowdIntelligence = () => {
  const [data, setData] = useState([
    { gate: 'Gate A', current: 4000, predicted: 4200 },
    { gate: 'Gate B', current: 8500, predicted: 9100 },
    { gate: 'Gate C', current: 3000, predicted: 2900 },
    { gate: 'Gate D', current: 5500, predicted: 5000 },
    { gate: 'VIP', current: 800, predicted: 850 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(d => ({
        ...d,
        current: Math.max(0, d.current + Math.floor(Math.random() * 200 - 100)),
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 overflow-y-auto custom-scrollbar z-10 p-6"
    >
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Crowd Intelligence</h2>
          <p className="text-sm text-gray-400 mt-1">Predictive bottleneck analysis and gate capacity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="text-neon-cyan" size={20} />
            30-Minute Gate Prediction
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="gate" stroke="#8884d8" />
                <YAxis stroke="#8884d8" />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#1f2833', borderColor: '#2c3540', borderRadius: '8px', color: '#fff' }} 
                />
                <Bar dataKey="current" fill="var(--color-neon-cyan)" radius={[4, 4, 0, 0]} name="Current Load" />
                <Bar dataKey="predicted" fill="var(--color-neon-purple)" radius={[4, 4, 0, 0]} name="Predicted (30m)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6 bg-red-500/10 border-red-500/30">
            <h3 className="text-sm font-bold text-red-400 mb-2 flex items-center gap-2">
              <AlertTriangle size={16} />
              High Congestion Warning
            </h3>
            <p className="text-2xl font-bold text-white">Gate B</p>
            <p className="text-sm text-gray-400 mt-1">Operating at 94% capacity. Recommended action: Open auxiliary turnstiles 14-18.</p>
            <button className="mt-4 w-full bg-red-500/20 hover:bg-red-500/40 text-red-300 font-bold py-2 rounded-xl border border-red-500/50 transition-all">
              Execute Autonomous Rerouting
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex-1">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Users size={16} className="text-neon-magenta" />
              Sector Density Heatmap
            </h3>
            <div className="space-y-4">
              {[
                { name: 'North Stand (Level 1)', load: 88, color: 'bg-orange-500' },
                { name: 'South Stand (Level 2)', load: 45, color: 'bg-green-500' },
                { name: 'East Stand (VIP)', load: 92, color: 'bg-red-500' },
                { name: 'West Stand (Press)', load: 30, color: 'bg-green-500' },
              ].map((sector, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-300">{sector.name}</span>
                    <span className="text-white font-bold">{sector.load}%</span>
                  </div>
                  <div className="h-2 w-full bg-panel rounded-full overflow-hidden">
                    <div className={`h-full ${sector.color}`} style={{ width: `${sector.load}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CrowdIntelligence;
