import { useEffect, useState } from 'react';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const generateData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    time: `${i}:00`,
    crowd: Math.floor(Math.random() * 50000) + 20000,
    transport: Math.floor(Math.random() * 10000) + 5000,
  }));
};

const MetricsWidget = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        newData.push({
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          crowd: last.crowd + (Math.random() * 2000 - 1000),
          transport: last.transport + (Math.random() * 500 - 250),
        });
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-6 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Activity className="text-neon-cyan" size={20} />
            Live Operations Pulse
          </h2>
          <p className="text-sm text-gray-400 mt-1">Real-time stadium telemetry</p>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 rounded-full text-xs font-medium">
            98% Health
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background/50 rounded-xl p-4 border border-border">
          <p className="text-sm text-gray-400 mb-1">Total Venue Capacity</p>
          <div className="flex justify-between items-end">
            <h3 className="text-2xl font-bold text-white">74,321</h3>
            <span className="flex items-center text-xs text-green-400">
              <ArrowUpRight size={14} /> +2.4%
            </span>
          </div>
        </div>
        <div className="bg-background/50 rounded-xl p-4 border border-border">
          <p className="text-sm text-gray-400 mb-1">Transport Influx</p>
          <div className="flex justify-between items-end">
            <h3 className="text-2xl font-bold text-white">12,840</h3>
            <span className="flex items-center text-xs text-red-400">
              <ArrowDownRight size={14} /> -1.2%
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCrowd" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2833', borderColor: '#2c3540', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="crowd" stroke="#00f0ff" strokeWidth={2} fillOpacity={1} fill="url(#colorCrowd)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricsWidget;
