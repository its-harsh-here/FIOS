import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MapWidget from './components/MapWidget';
import MetricsWidget from './components/MetricsWidget';
import CopilotWidget from './components/CopilotWidget';

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-magenta/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <Header />
        <main className="flex-1 p-6 overflow-y-auto custom-scrollbar z-10">
          <div className="mb-6 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Operations Dashboard</h2>
              <p className="text-sm text-gray-400 mt-1">Real-time intelligence and autonomous coordination</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <MapWidget />
              <MetricsWidget />
            </div>
            <div className="lg:col-span-1 flex flex-col gap-6">
              <CopilotWidget />
              
              {/* Extra Widget for Polish */}
              <div className="glass-panel rounded-2xl p-6 border-border flex-1">
                <h3 className="text-sm font-bold text-white mb-4">Autonomous Alerts</h3>
                <div className="space-y-3">
                  {[
                    { title: 'Crowd Rerouting', desc: 'Diverting fans from Gate B to Gate C', time: '2m ago', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                    { title: 'Medical Dispatched', desc: 'Unit 4 sent to Sector 2', time: '5m ago', color: 'text-red-400', bg: 'bg-red-400/10' },
                    { title: 'Transport Optimized', desc: 'Added 5 buses to North Hub', time: '12m ago', color: 'text-green-400', bg: 'bg-green-400/10' },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border">
                      <div className={`mt-0.5 w-2 h-2 rounded-full ${alert.bg} border border-current ${alert.color}`}></div>
                      <div>
                        <h4 className={`text-xs font-bold ${alert.color}`}>{alert.title}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{alert.desc}</p>
                        <span className="text-[10px] text-gray-500 mt-1 block">{alert.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
