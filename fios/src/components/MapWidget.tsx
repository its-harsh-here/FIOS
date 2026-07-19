import { useEffect, useState } from 'react';
import { MapPin, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const MapWidget = () => {
  const [hotspots, setHotspots] = useState([
    { id: 1, x: 30, y: 40, intensity: 'high', label: 'Gate B' },
    { id: 2, x: 70, y: 60, intensity: 'medium', label: 'Sector 4' },
    { id: 3, x: 50, y: 20, intensity: 'low', label: 'VIP Lounge' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHotspots(prev => prev.map(spot => ({
        ...spot,
        x: Math.max(10, Math.min(90, spot.x + (Math.random() * 4 - 2))),
        y: Math.max(10, Math.min(90, spot.y + (Math.random() * 4 - 2))),
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-1 relative overflow-hidden flex flex-col h-[500px]">
      <div className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur px-4 py-2 rounded-lg border border-border">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          <MapPin size={16} className="text-neon-magenta" />
          Live Crowd Density
        </h2>
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
         <div className="bg-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-lg border border-red-500/50 flex items-center gap-2 animate-pulse">
            <AlertTriangle size={14} />
            Congestion: Gate B
         </div>
      </div>

      {/* Simulated Stadium Background */}
      <div className="flex-1 bg-[#0b0c10] relative rounded-xl border border-border/50 overflow-hidden flex items-center justify-center">
        {/* Stadium outline */}
        <div className="w-[80%] h-[70%] border-2 border-border/40 rounded-[100px] relative flex items-center justify-center shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
          <div className="w-[60%] h-[50%] border border-border/30 rounded-[60px] bg-white/5"></div>
          {/* Pitch */}
          <div className="absolute w-[40%] h-[30%] bg-green-500/10 border border-green-500/20 rounded-md"></div>
        </div>

        {/* Hotspots */}
        {hotspots.map((spot) => (
          <motion.div
            key={spot.id}
            animate={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            transition={{ type: 'spring', stiffness: 50 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="relative flex items-center justify-center">
              <span className={`animate-ping absolute inline-flex h-12 w-12 rounded-full opacity-30 ${
                spot.intensity === 'high' ? 'bg-red-500' :
                spot.intensity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
              }`}></span>
              <span className={`relative inline-flex rounded-full h-4 w-4 ${
                spot.intensity === 'high' ? 'bg-red-500' :
                spot.intensity === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
              }`}></span>
            </div>
            <span className="text-[10px] mt-1 bg-background/80 px-2 rounded-sm text-gray-300 border border-border whitespace-nowrap">
              {spot.label}
            </span>
          </motion.div>
        ))}
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      </div>
    </div>
  );
};

export default MapWidget;
