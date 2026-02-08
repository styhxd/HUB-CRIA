import React, { useRef } from 'react';
import { Download, Upload } from 'lucide-react';
import { AppData } from '../types';

interface ImportExportProps {
  onExport: () => AppData;
  onImport: (data: AppData) => void;
}

export const ImportExport: React.FC<ImportExportProps> = ({ onExport, onImport }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = onExport();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `cria_producoes_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const parsedData = JSON.parse(json) as AppData;
        
        // Basic validation
        if (!parsedData.renovationItems) {
            throw new Error("Invalid format");
        }

        onImport(parsedData);
        alert('Dados importados com sucesso!');
      } catch (error) {
        console.error("Erro ao importar:", error);
        alert('Erro ao ler o arquivo JSON. Verifique o formato.');
      }
    };
    reader.readAsText(file);
    // Reset input
    event.target.value = '';
  };

  return (
    <div className="flex items-center gap-2">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".json"
      />
      
      <button 
        onClick={handleImportClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md border border-slate-700 transition-colors"
        title="Importar JSON"
      >
        <Upload className="w-4 h-4" />
        <span className="hidden md:inline">Importar</span>
      </button>

      <button 
        onClick={handleExport}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-sm transition-colors"
        title="Exportar JSON"
      >
        <Download className="w-4 h-4" />
        <span className="hidden md:inline">Exportar</span>
      </button>
    </div>
  );
};