
import React from 'react';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { Database, DatabaseZap } from 'lucide-react';

interface HeaderProps {
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-4xl">
        <button 
          onClick={onGoHome}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-slate-900 leading-tight uppercase">CPTM</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest leading-none font-medium">Controle de Limpeza</span>
          </div>
        </button>
        
        <div className="flex items-center gap-3">
          {isSupabaseConfigured ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
              <DatabaseZap size={14} className="text-green-600" />
              <span className="text-[10px] font-bold text-green-700 uppercase tracking-wider">Cloud Connected</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
              <Database size={14} className="text-amber-600" />
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">Modo Local (Offline)</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
