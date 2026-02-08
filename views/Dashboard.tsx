import React from 'react';
import { TEAM_MEMBERS, ARM_ICONS } from '../constants';
import { StatCard } from '../components/StatCard';
import { ProjectArmType, RenovationItem } from '../types';
import { Users, AlertTriangle, CheckCircle, Wallet, TrendingUp } from 'lucide-react';

interface DashboardProps {
  renovationItems: RenovationItem[];
}

export const Dashboard: React.FC<DashboardProps> = ({ renovationItems }) => {
  const pendingItems = renovationItems.filter(i => i.status === 'Pendente').length;
  const completedItems = renovationItems.filter(i => i.status !== 'Pendente').length;
  const totalBudget = renovationItems.reduce((acc, curr) => acc + curr.estimatedCost, 0);

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Ações Pendentes" 
          value={pendingItems.toString()} 
          icon={AlertTriangle} 
          colorClass="bg-amber-500"
        />
        <StatCard 
          label="Tasks Concluídas" 
          value={completedItems.toString()} 
          icon={CheckCircle} 
          colorClass="bg-emerald-500"
        />
        <StatCard 
          label="CapEx Estúdio" 
          value={`R$ ${(totalBudget / 1000).toFixed(1)}k`} 
          icon={Wallet} 
          colorClass="bg-indigo-500"
        />
        <StatCard 
          label="Membros Core" 
          value={TEAM_MEMBERS.length.toString()} 
          icon={Users} 
          colorClass="bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Team Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white flex items-center gap-3">
              <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
              CONSELHO ESTRATÉGICO
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TEAM_MEMBERS.map(member => (
              <div key={member.id} className="glass p-6 rounded-2xl hover:border-indigo-500/50 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <img 
                      src={member.avatarUrl} 
                      alt={member.name} 
                      className="w-14 h-14 rounded-xl object-cover border-2 border-slate-800 group-hover:border-indigo-500/30 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white text-lg leading-tight">{member.name}</h3>
                    <p className="text-indigo-400 text-xs font-bold uppercase tracking-wider mt-0.5">{member.role}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {member.responsibilities.map((resp, idx) => (
                        <span key={idx} className="text-[9px] font-bold bg-slate-900 text-slate-400 border border-slate-800 px-2 py-1 rounded-md">
                          {resp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arms Overview */}
        <div className="space-y-6">
           <h2 className="text-xl font-black text-white flex items-center gap-3">
             <div className="w-1.5 h-6 bg-emerald-500 rounded-full"></div>
             HOLDING ARMS
           </h2>
           <div className="space-y-4">
             {Object.values(ProjectArmType).map((arm) => {
               const Icon = ARM_ICONS[arm];
               const isStudio = arm === ProjectArmType.STUDIO;
               return (
                 <div key={arm} className="glass p-5 rounded-2xl flex items-center gap-5 group hover:bg-slate-900/40 transition-all">
                   <div className={`p-4 rounded-xl transition-all ${isStudio ? 'bg-indigo-500/20 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-slate-900 text-slate-500'}`}>
                     <Icon className="w-6 h-6" />
                   </div>
                   <div className="flex-1">
                     <h3 className={`font-bold ${isStudio ? 'text-white' : 'text-slate-400'}`}>{arm}</h3>
                     <div className="flex items-center gap-2 mt-1">
                       <TrendingUp className={`w-3 h-3 ${isStudio ? 'text-emerald-400' : 'text-slate-600'}`} />
                       <p className={`text-[10px] font-bold uppercase tracking-widest ${isStudio ? 'text-emerald-500' : 'text-slate-600'}`}>
                         {isStudio ? 'Active Development' : 'Operational'}
                       </p>
                     </div>
                   </div>
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </div>
  );
};