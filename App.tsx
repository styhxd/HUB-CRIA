import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Music, 
  Gamepad2, 
  Code, 
  Palette, 
  Menu,
  Settings,
  Bell,
  Search,
  ChevronRight
} from 'lucide-react';
import { Dashboard } from './views/Dashboard';
import { StudioRenovation } from './views/StudioRenovation';
import { ImportExport } from './components/ImportExport';
import { AppData, RenovationItem } from './types';
import { INITIAL_RENOVATION_ITEMS } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [renovationItems, setRenovationItems] = useState<RenovationItem[]>(INITIAL_RENOVATION_ITEMS);

  useEffect(() => {
    const saved = localStorage.getItem('cria_data_v4');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.renovationItems) {
          setRenovationItems(parsed.renovationItems);
        }
      } catch (e) {
        console.error("Erro ao carregar dados locais");
      }
    }
  }, []);

  useEffect(() => {
    const data: AppData = { renovationItems, lastUpdated: new Date().toISOString() };
    localStorage.setItem('cria_data_v4', JSON.stringify(data));
  }, [renovationItems]);

  const handleImport = (data: AppData) => {
    setRenovationItems(data.renovationItems);
  };

  const handleExport = (): AppData => {
    return { renovationItems, lastUpdated: new Date().toISOString() };
  };

  const menuItems = [
    { id: 'dashboard', label: 'War Room', icon: LayoutDashboard, color: 'text-indigo-400' },
    { id: 'studio', label: 'Estúdio & Sede', icon: Music, color: 'text-purple-400' },
    { id: 'games', label: 'STYH Games', icon: Gamepad2, color: 'text-red-400' },
    { id: 'software', label: 'Pinus Software', icon: Code, color: 'text-emerald-400' },
    { id: 'design', label: 'Design Agency', icon: Palette, color: 'text-pink-400' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard renovationItems={renovationItems} />;
      case 'studio':
        return <StudioRenovation items={renovationItems} setItems={setRenovationItems} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500 animate-fade-in">
            <div className="glass p-12 rounded-full border border-slate-800 mb-6 bg-slate-900/30">
              {activeTab === 'games' && <Gamepad2 className="w-16 h-16 text-red-500/40" />}
              {activeTab === 'software' && <Code className="w-16 h-16 text-emerald-500/40" />}
              {activeTab === 'design' && <Palette className="w-16 h-16 text-pink-500/40" />}
            </div>
            <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">Unidade em Planejamento</h2>
            <p className="max-w-md text-center text-slate-400 text-sm leading-relaxed">
              O braço estratégico <b>{menuItems.find(m => m.id === activeTab)?.label}</b> está atualmente sendo estruturado para a próxima fase da Holding CRIA.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 flex font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Sidebar Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-[70] w-72 bg-slate-950 border-r border-slate-900 flex flex-col transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]' : '-translate-x-full'}
      `}>
        <div className="p-8 pb-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(79,70,229,0.5)] ring-1 ring-white/10">
              <span className="font-black text-2xl italic tracking-tighter text-white">C</span>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none glow-text">
                CRIA <span className="text-indigo-500">PROD.</span>
              </h1>
              <span className="text-[10px] text-slate-500 uppercase tracking-[0.25em] font-black mt-1 block">Holding Group</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4 ml-4">Conselho Operacional</p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-xs font-bold transition-all group relative
                  ${isActive 
                    ? 'bg-indigo-600/10 text-white border border-indigo-500/20 shadow-[0_4px_12px_rgba(99,102,241,0.08)]' 
                    : 'text-slate-500 hover:bg-slate-900/50 hover:text-slate-200 border border-transparent'
                  }
                `}
              >
                <Icon className={`w-5 h-5 transition-all ${isActive ? item.color : 'text-slate-600 group-hover:text-slate-400 group-hover:scale-110'}`} />
                <span className="uppercase tracking-widest">{item.label}</span>
                {isActive && (
                   <>
                     <div className="ml-auto w-1 h-4 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,1)]"></div>
                     <div className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full -ml-4"></div>
                   </>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-6">
           <div className="glass p-4 rounded-2xl flex items-center gap-4 border border-white/5">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xs font-black border border-white/10 shadow-inner">
               DA
             </div>
             <div className="min-w-0">
               <p className="text-sm font-bold text-white truncate tracking-tight">Douglas Ambrosio</p>
               <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Lead Strategist</p>
             </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Navbar */}
        <header className="h-20 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 shrink-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 text-slate-500 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                 <Search size={14} />
                 <span className="text-[10px] font-black uppercase tracking-widest">CMD + K</span>
              </div>
              <div className="w-px h-6 bg-slate-800 hidden sm:block"></div>
              <div>
                <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2 italic">
                  {menuItems.find(m => m.id === activeTab)?.label}
                  <ChevronRight size={14} className="text-slate-600" />
                </h2>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 pr-4 border-r border-slate-800">
                <button className="p-2 text-slate-500 hover:text-indigo-400 transition-all hover:bg-indigo-500/10 rounded-lg relative">
                  <Bell size={20}/>
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-slate-950"></span>
                </button>
                <button className="p-2 text-slate-500 hover:text-slate-200 transition-all hover:bg-slate-800 rounded-lg">
                  <Settings size={20}/>
                </button>
             </div>
             <ImportExport onImport={handleImport} onExport={handleExport} />
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="flex-1 overflow-y-auto bg-[#020617] custom-scrollbar">
          <div className="max-w-7xl mx-auto p-6 md:p-10 space-y-10 pb-32">
             {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;