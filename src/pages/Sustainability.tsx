import { motion } from 'framer-motion';
import { Leaf, Zap, Droplets, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Sustainability = () => {
  const data = Array.from({ length: 10 }, (_, i) => ({
    time: `T-${10 - i}m`,
    energy: Math.floor(Math.random() * 50) + 100,
    water: Math.floor(Math.random() * 20) + 40,
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 overflow-y-auto custom-scrollbar z-10 p-6"
    >
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Sustainability Ops</h2>
          <p className="text-sm text-gray-400 mt-1">Carbon footprint tracking and resource optimization</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { icon: <Zap />, title: 'Energy Usage', val: '124 MWh', color: 'text-yellow-400' },
          { icon: <Droplets />, title: 'Water Consumption', val: '45k Liters', color: 'text-blue-400' },
          { icon: <Leaf />, title: 'Carbon Offset', val: '12.4 Tons', color: 'text-green-400' },
          { icon: <Trash2 />, title: 'Food Recovered', val: '450 kg', color: 'text-orange-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center">
            <div className={`mb-3 p-3 rounded-full bg-panel border border-border ${stat.color}`}>
              {stat.icon}
            </div>
            <h3 className="text-gray-400 text-sm">{stat.title}</h3>
            <p className="text-xl font-bold text-white mt-1">{stat.val}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Resource Consumption Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2833', borderColor: '#2c3540' }} />
                <Area type="monotone" dataKey="energy" stroke="#facc15" fill="url(#colorEnergy)" name="Energy (kWh)" />
                <Area type="monotone" dataKey="water" stroke="#60a5fa" fillOpacity={0} name="Water (L)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="glass-panel rounded-2xl p-6 bg-green-500/10 border-green-500/30">
            <h3 className="text-sm font-bold text-green-400 mb-2">Food Redistribution Alert</h3>
            <p className="text-xl font-bold text-white mb-1">Surplus detected in VIP Sector</p>
            <p className="text-sm text-gray-400">Approx. 40 portions of perishable food. Local shelter notified for pickup at Gate D.</p>
            <button className="mt-4 w-full bg-green-500/20 hover:bg-green-500/40 text-green-300 font-bold py-2 rounded-xl border border-green-500/50 transition-all">
              Confirm Dispatch
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-6 flex-1">
            <h3 className="text-sm font-bold text-white mb-4">Smart Grid Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                <span className="text-gray-400">Solar Supplement</span>
                <span className="text-green-400 font-bold">Active (18%)</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-border pb-2">
                <span className="text-gray-400">HVAC Optimization</span>
                <span className="text-blue-400 font-bold">Auto-Cooling</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Pitch Irrigation</span>
                <span className="text-gray-500 font-bold">Scheduled 22:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sustainability;
