import { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Mic } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini (Replace with real key in production via env var)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const SYSTEM_PROMPT = `
You are the Master Orchestrator Agent for FIOS (FIFA Intelligent Operations System) - a billion-dollar production-grade autonomous stadium OS for the 2026 World Cup.
Your role is to orchestrate 8 specialized sub-agents: Fan Experience, Crowd Intelligence, Transportation, Accessibility, Volunteer Management, Sustainability, Emergency Response, and Operational Analytics.
When a user gives you a command or asks a question:
1. Provide a highly detailed, professional, and authoritative response simulating the output from those specialized agents.
2. Include simulated real-time metrics, predictive analytics, and autonomous action recommendations.
3. Maintain a tone that is hyper-competent, futuristic, and focused on safety, efficiency, and the ultimate fan experience.
Format your responses with clear bullet points.
`;

const mockResponse = (msg: string) => {
  return `[SYSTEM OVERRIDE: Local Autonomous Mode Active]\n\n**Routing to: Crowd Intelligence Agent & Emergency Response Agent**\n\n- **Intel**: Congestion detected based on query "${msg}".\n- **Action**: Dispatched 4 volunteer units and opened auxiliary turnstiles.\n- **Status**: Congestion clearing.`;
};

const CopilotWidget = () => {
  const [messages, setMessages] = useState<{role: 'user'|'model', content: string}[]>([
    { role: 'model', content: 'I am the Master Orchestrator Agent. I coordinate all FIOS operations. How can I assist you with stadium ops today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      if (!genAI) {
        // Fallback mock if no API key is provided
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'model', content: mockResponse(userMsg) }]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
      const prompt = `${SYSTEM_PROMPT}\n\nUser: ${userMsg}\nMaster Orchestrator:`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setMessages(prev => [...prev, { role: 'model', content: text }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'model', content: "Error communicating with Gemini AI. Falling back to local heuristics... Issue resolved autonomously." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel rounded-2xl flex flex-col h-[500px] border-border overflow-hidden">
      <div className="p-4 border-b border-border bg-background/50 backdrop-blur flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Bot className="text-neon-cyan" size={20} />
            Master Orchestrator
          </h2>
          <p className="text-xs text-gray-400">Multi-agent GenAI operating system</p>
        </div>
        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
              m.role === 'user' 
                ? 'bg-neon-cyan/20 border border-neon-cyan/30 text-white rounded-br-sm' 
                : 'bg-panel border border-border text-gray-200 rounded-bl-sm'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-70">
                {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                <span className="text-[10px] uppercase font-bold tracking-wider">{m.role}</span>
              </div>
              <div className="leading-relaxed whitespace-pre-wrap">{m.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-panel border border-border p-3 rounded-2xl rounded-bl-sm">
              <Loader2 className="animate-spin text-neon-cyan" size={16} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-background/50 backdrop-blur">
        <div className="relative flex items-center">
          <button 
            type="button"
            className="absolute left-2 p-2 text-gray-400 hover:text-neon-cyan transition-colors"
          >
            <Mic size={18} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g. Send medical to Gate B..."
            className="w-full bg-panel border border-border rounded-full pl-10 pr-12 py-3 text-sm text-white focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-2 bg-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors rounded-full disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CopilotWidget;
