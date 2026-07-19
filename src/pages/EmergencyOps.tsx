import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Radio, Siren, UserCheck, AlertCircle } from 'lucide-react';

const incidents = [
  { id: 'INC-001', type: 'Medical Emergency', location: 'Sector 12, Row F', priority: 'CRITICAL', status: 'Responding', time: '2m ago', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  { id: 'INC-002', type: 'Fan Conflict', location: 'Gate B Entrance', priority: 'HIGH', status: 'In Progress', time: '5m ago', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  { id: 'INC-003', type: 'Structural Hazard', location: 'North Stand Corridor', priority: 'HIGH', status: 'Assessing', time: '8m ago', color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  { id: 'INC-004', type: 'Lost Child', location: 'Fan Zone C', priority: 'MEDIUM', status: 'Resolved', time: '14m ago', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  { id: 'INC-005', type: 'Suspicious Item', location: 'Parking Zone A', priority: 'MEDIUM', status: 'Cleared', time: '20m ago', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
];

const units = [
  { id: 'MED-01', type: 'Medical', location: 'Sector 12', status: 'Engaged' },
  { id: 'MED-02', type: 'Medical', location: 'First Aid Bay 2', status: 'Standby' },
  { id: 'SEC-01', type: 'Security', location: 'Gate B', status: 'Engaged' },
  { id: 'SEC-02', type: 'Security', location: 'Control Room', status: 'Monitoring' },
  { id: 'VOL-05', type: 'Volunteer', location: 'Fan Zone C', status: 'Resolved' },
];

const EmergencyOps = () => {
  const [activeIncidents] = useState(2);
  const [alertPulse, setAlertPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setAlertPulse(p => !p), 1000);
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
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <ShieldAlert className="text-red-500" size={28} />
            Emergency Response Center
          </h2>
          <p className="text-sm text-gray-400 mt-1">Autonomous incident management and unit deployment</p>
        </div>
        <div className={`px-4 py-2 rounded-full border font-bold text-sm transition-all duration-300 ${
          alertPulse ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-red-500/10 border-red-500/20 text-red-500'
        }`}>
          ⚠ {activeIncidents} ACTIVE INCIDENTS
        </div>
      </div>

      {/* AI Action Plan */}
      <div className="glass-panel rounded-2xl p-6 mb-6 border border-red-500/20 bg-red-500/5">
        <h3 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
          <Siren size={16} />
          AI Generated Action Plan — INC-001 (Medical Emergency)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-background/50 p-3 rounded-xl border border-border">
            <p className="text-gray-400 mb-1 text-xs uppercase font-bold">Step 1 — Deployed</p>
            <p className="text-white">Medical Unit MED-01 dispatched to Sector 12, Row F. ETA: 45 seconds.</p>
          </div>
          <div className="bg-background/50 p-3 rounded-xl border border-border">
            <p className="text-gray-400 mb-1 text-xs uppercase font-bold">Step 2 — In Progress</p>
            <p className="text-white">Adjacent crowd rerouted. Aisle F cleared for emergency access.</p>
          </div>
          <div className="bg-background/50 p-3 rounded-xl border border-border">
            <p className="text-gray-400 mb-1 text-xs uppercase font-bold">Step 3 — Pending</p>
            <p className="text-white">Ambulance Bay 1 placed on standby at Gate A for potential transport.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident Feed */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-red-400" />
            Live Incident Feed
          </h3>
          <div className="space-y-3">
            {incidents.map((inc) => (
              <div key={inc.id} className={`p-4 rounded-xl border ${inc.bg} ${inc.border}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full bg-background ${inc.color}`}>{inc.priority}</span>
                      <h4 className="text-sm font-bold text-gray-100">{inc.type}</h4>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">📍 {inc.location}</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-bold ${
                      inc.status === 'Responding' ? 'text-red-400' :
                      inc.status === 'In Progress' ? 'text-orange-400' :
                      inc.status === 'Resolved' || inc.status === 'Cleared' ? 'text-green-400' : 'text-yellow-400'
                    }`}>{inc.status}</span>
                    <p className="text-[10px] text-gray-500 mt-1">{inc.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Unit Deployment */}
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Radio size={20} className="text-neon-cyan" />
            Unit Deployment
          </h3>
          <div className="space-y-3">
            {units.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-3 bg-background/50 rounded-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    unit.status === 'Engaged' ? 'bg-red-500 animate-pulse' :
                    unit.status === 'Standby' ? 'bg-yellow-400' :
                    unit.status === 'Resolved' ? 'bg-green-400' : 'bg-blue-400'
                  }`}></div>
                  <div>
                    <p className="text-xs font-bold text-white">{unit.id}</p>
                    <p className="text-[10px] text-gray-500">{unit.location}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-300">{unit.status}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-xs font-bold text-white mb-3 flex items-center gap-2">
              <UserCheck size={14} className="text-neon-cyan" />
              Quick Deploy
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold py-2 rounded-xl border border-red-500/40 transition-all">
                + Medical
              </button>
              <button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 text-xs font-bold py-2 rounded-xl border border-blue-500/40 transition-all">
                + Security
              </button>
              <button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-xs font-bold py-2 rounded-xl border border-yellow-500/40 transition-all col-span-2">
                🚨 Declare Stadium Alert
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EmergencyOps;
