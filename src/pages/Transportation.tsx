import { motion } from 'framer-motion';
import { Car, Train, Bus, MapPin, ArrowRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Transportation = () => {
  const data = Array.from({ length: 12 }, (_, i) => ({
    time: `${i * 5}m`,
    metro: Math.floor(Math.random() * 5000) + 1000,
    buses: Math.floor(Math.random() * 2000) + 500,
    taxi: Math.floor(Math.random() * 1500) + 300,
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
          <h2 className="text-2xl font-bold text-white tracking-tight">Transportation Intelligence</h2>
          <p className="text-sm text-gray-400 mt-1">Real-time arrival streams and parking density</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-blue-500">
          <Train className="text-blue-500 mb-2" size={24} />
          <h3 className="text-gray-400 text-sm">Metro Line (North Hub)</h3>
          <p className="text-2xl font-bold text-white mt-1">4,210 <span className="text-xs font-normal text-gray-500">pax/hr</span></p>
          <div className="mt-3 text-xs text-green-400 flex items-center gap-1">On Schedule <ArrowRight size={12} /></div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-orange-500">
          <Bus className="text-orange-500 mb-2" size={24} />
          <h3 className="text-gray-400 text-sm">Shuttle Fleet</h3>
          <p className="text-2xl font-bold text-white mt-1">1,840 <span className="text-xs font-normal text-gray-500">pax/hr</span></p>
          <div className="mt-3 text-xs text-yellow-400 flex items-center gap-1">5m Average Delay <ArrowRight size={12} /></div>
        </div>
        <div className="glass-panel p-6 rounded-2xl border-t-4 border-t-yellow-400">
          <Car className="text-yellow-400 mb-2" size={24} />
          <h3 className="text-gray-400 text-sm">VIP & Taxi Drop-off</h3>
          <p className="text-2xl font-bold text-white mt-1">890 <span className="text-xs font-normal text-gray-500">pax/hr</span></p>
          <div className="mt-3 text-xs text-red-400 flex items-center gap-1">High Congestion <ArrowRight size={12} /></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">60-Minute Influx Prediction</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMetro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2833', borderColor: '#2c3540' }} />
                <Area type="monotone" dataKey="metro" stroke="#3b82f6" fill="url(#colorMetro)" name="Metro Pax" />
                <Area type="monotone" dataKey="buses" stroke="#f97316" fillOpacity={0} name="Bus Pax" />
                <Area type="monotone" dataKey="taxi" stroke="#eab308" fillOpacity={0} name="Taxi Pax" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <MapPin size={16} className="text-neon-cyan" />
            Parking Intelligence
          </h3>
          <div className="space-y-4">
            {[
              { zone: 'Zone A (VIP)', available: 45, total: 500, status: 'Full' },
              { zone: 'Zone B (Public)', available: 1240, total: 5000, status: 'Open' },
              { zone: 'Zone C (Public)', available: 3200, total: 6000, status: 'Open' },
              { zone: 'Zone D (Staff)', available: 12, total: 400, status: 'Full' },
            ].map((p, i) => (
              <div key={i} className="p-3 bg-panel rounded-xl border border-border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-gray-200">{p.zone}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${p.status === 'Full' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                    {p.status}
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${p.status === 'Full' ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${((p.total - p.available) / p.total) * 100}%` }}></div>
                </div>
                <div className="text-right text-[10px] text-gray-500 mt-1">
                  {p.available} spots left
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Transportation;
