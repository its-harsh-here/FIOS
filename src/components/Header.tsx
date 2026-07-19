
import { Bell, Search, Globe, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-20 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="bg-red-500/20 text-red-500 border border-red-500/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          LIVE: MATCH DAY
        </div>
        <div className="h-6 w-[1px] bg-border"></div>
        <div className="text-sm font-medium text-gray-300">
          MetLife Stadium, New York/New Jersey
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search venue ops..." 
            className="bg-panel border border-border rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan w-64 transition-all"
          />
        </div>

        <button className="text-gray-400 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-neon-magenta rounded-full border border-background"></span>
        </button>

        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <Globe size={20} />
          <span className="text-sm font-medium">ENG</span>
          <ChevronDown size={16} />
        </button>

        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-neon-cyan to-neon-purple p-[2px]">
          <div className="h-full w-full rounded-full bg-panel flex items-center justify-center text-xs font-bold">
            OS
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
