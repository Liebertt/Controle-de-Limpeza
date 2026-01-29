
import React, { useState, useEffect } from 'react';
import { AreaType, Evaluation, Frequency } from './types';
import EvaluationForm from './components/EvaluationForm';
import History from './components/History';
import Header from './components/Header';
import { ClipboardCheck, History as HistoryIcon, PlusCircle } from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'form' | 'history'>('home');
  const [selectedArea, setSelectedArea] = useState<AreaType | null>(null);

  const startEvaluation = (area: AreaType) => {
    setSelectedArea(area);
    setView('form');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onGoHome={() => setView('home')} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        {view === 'home' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-slate-900">Portal de Avaliação de Limpeza</h1>
              <p className="text-slate-500">Selecione a área para iniciar uma nova auditoria técnica.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => startEvaluation(AreaType.OPERATIONAL)}
                className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex flex-col items-start gap-4"
              >
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ClipboardCheck size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Salas Operacionais</h2>
                  <p className="text-slate-500 text-sm mt-1">Bilheterias, salas de renda, SSO e copas operacionais.</p>
                </div>
              </button>

              <button
                onClick={() => startEvaluation(AreaType.ADMINISTRATIVE)}
                className="group p-8 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all text-left flex flex-col items-start gap-4"
              >
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ClipboardCheck size={32} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-800">Áreas Administrativas</h2>
                  <p className="text-slate-500 text-sm mt-1">Escritórios, sanitários internos, vestiários e copas adm.</p>
                </div>
              </button>
            </div>

            <div className="flex justify-center pt-8 border-t border-slate-200">
              <button
                onClick={() => setView('history')}
                className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors"
              >
                <HistoryIcon size={20} />
                Ver Histórico de Avaliações
              </button>
            </div>
          </div>
        )}

        {view === 'form' && selectedArea && (
          <EvaluationForm 
            areaType={selectedArea} 
            onCancel={() => setView('home')} 
            onSuccess={() => setView('history')}
          />
        )}

        {view === 'history' && (
          <History onNew={() => setView('home')} />
        )}
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Sistema de Qualidade CPTM - Monitoramento de Higiene
      </footer>
    </div>
  );
};

export default App;
