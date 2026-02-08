import React, { useMemo, useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, LayoutGrid, List } from 'lucide-react';
import { RenovationItem } from '../types';
import { SPACE_SPECS } from '../constants';

interface StudioRenovationProps {
  items: RenovationItem[];
  setItems: React.Dispatch<React.SetStateAction<RenovationItem[]>>;
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const StudioRenovation: React.FC<StudioRenovationProps> = ({ items, setItems }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<RenovationItem['category']>('Decoração');

  const totalEstimated = useMemo(() => items.reduce((acc, item) => acc + item.estimatedCost, 0), [items]);
  const totalActual = useMemo(() => items.reduce((acc, item) => acc + item.actualCost, 0), [items]);
  
  const costByCategory = useMemo(() => {
    const data: Record<string, number> = {};
    items.forEach(item => {
      data[item.category] = (data[item.category] || 0) + item.estimatedCost;
    });
    return Object.keys(data).map(key => ({ name: key, value: data[key] }));
  }, [items]);

  const handleAddItem = () => {
    if (!newItemName || !newItemCost) return;
    const newItem: RenovationItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: newItemCategory,
      estimatedCost: parseFloat(newItemCost),
      actualCost: 0,
      status: 'Pendente',
      notes: '',
      priority: 'Média'
    };
    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemCost('');
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const toggleStatus = (id: string) => {
    setItems(items.map(i => {
      if (i.id === id) {
        const nextStatus: RenovationItem['status'] = i.status === 'Pendente' ? 'Comprado' : i.status === 'Comprado' ? 'Instalado' : 'Pendente';
        return { ...i, status: nextStatus };
      }
      return i;
    }));
  };

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Dimensões */}
      <section className="space-y-6">
        <h2 className="text-xl font-black text-white flex items-center gap-3">
          <LayoutGrid className="text-indigo-500" size={24} />
          LAYOUT & ESTRUTURA
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPACE_SPECS.map((spec, idx) => (
            <div key={idx} className="glass p-5 rounded-2xl border-l-4 border-l-indigo-500">
              <h3 className="text-white font-bold text-sm">{spec.name}</h3>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight mt-1">{spec.dimensions} • {spec.area}</p>
              <p className="text-xs text-slate-400 mt-3 leading-relaxed">{spec.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass p-8 rounded-3xl h-[400px]">
          <h3 className="text-white font-bold mb-6">Budget Distribution</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={costByCategory} margin={{ top: 20, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${v}`} />
              <Tooltip 
                cursor={{fill: '#1e293b', opacity: 0.4}}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
              />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-8 rounded-3xl flex flex-col items-center justify-center text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Total Project Estimate</p>
            <p className="text-5xl font-black text-white italic tracking-tighter">
              <span className="text-indigo-500 text-2xl mr-2">R$</span>
              {totalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}
            </p>
            <div className="w-full h-px bg-slate-800 my-8"></div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Realized Capex</p>
            <p className={`text-3xl font-bold ${totalActual > totalEstimated ? 'text-red-500' : 'text-emerald-400'}`}>
              R$ {totalActual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
        </div>
      </div>

      {/* Materials Table */}
      <div className="glass rounded-3xl overflow-hidden border-slate-800">
        <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <List className="text-indigo-500" />
            <h2 className="text-xl font-black text-white">RENOVATION INVENTORY</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <input 
              type="text" 
              placeholder="Item name..." 
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-full md:w-auto"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Budget R$" 
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white w-32 focus:outline-none focus:border-indigo-500 transition-all"
              value={newItemCost}
              onChange={(e) => setNewItemCost(e.target.value)}
            />
            <button 
              onClick={handleAddItem}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            >
              ADD ITEM
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5">Nomenclature</th>
                <th className="px-8 py-5">Category</th>
                <th className="px-8 py-5 text-right">Estimate</th>
                <th className="px-8 py-5 text-center">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/30 transition-all group">
                  <td className="px-8 py-6">
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        item.status === 'Instalado' ? 'bg-emerald-500/20 text-emerald-500' : 
                        item.status === 'Comprado' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-600'
                      }`}
                    >
                      {item.status === 'Instalado' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                  </td>
                  <td className="px-8 py-6">
                    <div className="min-w-[200px]">
                      <span className="text-white font-bold block group-hover:text-indigo-400 transition-colors">{item.name}</span>
                      <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1 block">{item.priority} Priority</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-black text-slate-400">
                      {item.category.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="text-white font-mono font-bold">R$ {item.estimatedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-center">
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-2.5 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};