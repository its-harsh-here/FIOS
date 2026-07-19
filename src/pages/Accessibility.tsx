import { motion } from 'framer-motion';
import { Accessibility as AccIcon, MessageCircle, Navigation, Ear } from 'lucide-react';

const Accessibility = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex-1 overflow-y-auto custom-scrollbar z-10 p-6"
    >
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Accessibility Ops</h2>
          <p className="text-sm text-gray-400 mt-1">Inclusive fan experience routing and multilingual support</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {[
          { icon: <Navigation />, title: 'Wheelchair Routes', val: '14 Active', color: 'text-blue-400' },
          { icon: <MessageCircle />, title: 'Translation Users', val: '1,204', color: 'text-neon-magenta' },
          { icon: <AccIcon />, title: 'Elderly Assistance', val: '43 Deployed', color: 'text-green-400' },
          { icon: <Ear />, title: 'Audio Descriptive', val: '890 Streams', color: 'text-orange-400' },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Active Routing Requests</h3>
          <div className="space-y-4">
            {[
              { id: 'REQ-01', type: 'Wheelchair Route', from: 'Gate B', to: 'Sector 112', status: 'In Progress' },
              { id: 'REQ-02', type: 'Visual Assist', from: 'Metro Hub', to: 'Seat A45', status: 'Volunteer Dispatched' },
              { id: 'REQ-03', type: 'Mobility Cart', from: 'Parking Zone A', to: 'VIP Entrance', status: 'Completed' },
            ].map((req, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-background/50 border border-border rounded-xl">
                <div>
                  <h4 className="text-sm font-bold text-gray-200">{req.id}: {req.type}</h4>
                  <p className="text-xs text-gray-400 mt-1">{req.from} → {req.to}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  req.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                  req.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Live Translation Streams</h3>
          <div className="space-y-3">
            {[
              { lang: 'Spanish', count: 450, load: 80 },
              { lang: 'French', count: 210, load: 40 },
              { lang: 'Arabic', count: 180, load: 35 },
              { lang: 'Mandarin', count: 120, load: 20 },
              { lang: 'Portuguese', count: 95, load: 15 },
            ].map((lang, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{lang.lang}</span>
                  <span className="text-white font-bold">{lang.count} users</span>
                </div>
                <div className="h-2 w-full bg-panel rounded-full overflow-hidden border border-border">
                  <div className="h-full bg-neon-magenta" style={{ width: `${lang.load}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Accessibility;
