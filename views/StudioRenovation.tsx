import React, { useMemo, useState } from 'react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { Plus, Trash2, CheckCircle2, Circle, AlertCircle, LayoutGrid, List, DollarSign, Save } from 'lucide-react';
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

  const totalEstimated = useMemo(() => items.reduce((acc, item) => acc + (item.estimatedCost || 0), 0), [items]);
  const totalActual = useMemo(() => items.reduce((acc, item) => acc + (item.actualCost || 0), 0), [items]);
  
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

  const handleUpdate = (id: string, field: keyof RenovationItem, value: any) => {
    setItems(items.map(i => {
      if (i.id === id) {
        return { ...i, [field]: value };
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
          <h3 className="text-white font-bold mb-6">Distribuição de Budget</h3>
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

        <div className="glass p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <DollarSign size={100} className="text-emerald-500" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Orçamento Previsto</p>
            <p className="text-4xl font-black text-white italic tracking-tighter mb-1">
              <span className="text-indigo-500 text-xl mr-2">R$</span>
              {totalEstimated.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            
            <div className="w-full h-px bg-slate-800 my-6"></div>
            
            <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Gasto Real (Executado)</p>
            <p className={`text-3xl font-bold ${totalActual > totalEstimated ? 'text-red-500' : 'text-emerald-400'}`}>
              R$ {totalActual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            {totalActual > 0 && (
              <p className="text-[10px] text-slate-500 mt-2 font-mono">
                {((totalActual / totalEstimated) * 100).toFixed(1)}% do previsto
              </p>
            )}
        </div>
      </div>

      {/* Materials Table */}
      <div className="glass rounded-3xl overflow-hidden border-slate-800">
        <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <List className="text-indigo-500" />
            <div>
              <h2 className="text-xl font-black text-white">LISTA DE MATERIAIS</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Edite os valores diretamente na tabela</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <input 
              type="text" 
              placeholder="Novo Item..." 
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-full md:w-auto"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <input 
              type="number" 
              placeholder="Valor Estimado R$" 
              className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white w-36 focus:outline-none focus:border-indigo-500 transition-all"
              value={newItemCost}
              onChange={(e) => setNewItemCost(e.target.value)}
            />
            <button 
              onClick={handleAddItem}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)] flex items-center gap-2"
            >
              <Plus size={16} /> ADD
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-800">
                <th className="px-6 py-5 w-20 text-center">Status</th>
                <th className="px-6 py-5">Item / Descrição</th>
                <th className="px-6 py-5 w-32">Categoria</th>
                <th className="px-6 py-5 w-40 text-right text-indigo-400">Previsto (R$)</th>
                <th className="px-6 py-5 w-40 text-right text-emerald-400">Pago (R$)</th>
                <th className="px-6 py-5 w-20 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/30 transition-all group">
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all mx-auto ${
                        item.status === 'Instalado' ? 'bg-emerald-500/20 text-emerald-500' : 
                        item.status === 'Comprado' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-600 hover:bg-slate-700'
                      }`}
                      title={item.status}
                    >
                      {item.status === 'Instalado' ? <CheckCircle2 size={18} /> : item.status === 'Comprado' ? <DollarSign size={18} /> : <Circle size={18} />}
                    </button>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <input 
                        type="text" 
                        value={item.name}
                        onChange={(e) => handleUpdate(item.id, 'name', e.target.value)}
                        className="bg-transparent text-sm font-bold text-white border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none focus:bg-slate-900/50 px-2 py-1 rounded transition-all w-full"
                      />
                      <input 
                        type="text" 
                        value={item.notes}
                        placeholder="Adicionar nota..."
                        onChange={(e) => handleUpdate(item.id, 'notes', e.target.value)}
                        className="bg-transparent text-[11px] text-slate-500 border-b border-transparent hover:border-slate-700 focus:border-indigo-500 focus:outline-none px-2 py-0.5 w-full"
                      />
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-black text-slate-400 block w-fit">
                      {item.category.toUpperCase()}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="relative group/input">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono">R$</span>
                      <input 
                        type="number"
                        step="0.01"
                        value={item.estimatedCost}
                        onChange={(e) => handleUpdate(item.id, 'estimatedCost', parseFloat(e.target.value) || 0)}
                        className="bg-slate-900/20 text-right w-full text-sm font-mono font-bold text-indigo-100 border border-transparent hover:border-slate-700 focus:border-indigo-500 focus:bg-slate-900 focus:outline-none rounded-lg py-2 px-3 transition-all"
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="relative group/input">
                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono">R$</span>
                      <input 
                        type="number"
                        step="0.01"
                        value={item.actualCost || 0}
                        onChange={(e) => handleUpdate(item.id, 'actualCost', parseFloat(e.target.value) || 0)}
                        className={`bg-slate-900/20 text-right w-full text-sm font-mono font-bold border border-transparent hover:border-slate-700 focus:border-emerald-500 focus:bg-slate-900 focus:outline-none rounded-lg py-2 px-3 transition-all ${item.actualCost > 0 ? 'text-emerald-400' : 'text-slate-600'}`}
                      />
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-slate-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Excluir Item"
                    >
                      <Trash2 size={16} />
                    </button>
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