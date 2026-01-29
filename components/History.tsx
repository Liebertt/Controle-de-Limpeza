
import React, { useState, useEffect } from 'react';
import { Evaluation } from '../types';
import { getEvaluations } from '../services/supabaseClient';
import { Calendar, User, Layout, ArrowLeft, MoreHorizontal, CheckCircle, XCircle, Clock, Users } from 'lucide-react';

interface HistoryProps {
  onNew: () => void;
}

const History: React.FC<HistoryProps> = ({ onNew }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getEvaluations();
        setEvaluations(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-slate-500 font-medium">Carregando histórico...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-slate-800">Histórico</h2>
          <p className="text-sm text-slate-500">Registros de conformidade técnica realizados.</p>
        </div>
        <button 
          onClick={onNew}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      </div>

      {evaluations.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
             <Calendar size={32} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-700">Nenhum registro encontrado</h3>
            <p className="text-slate-400">Inicie uma nova avaliação para ver os dados aqui.</p>
          </div>
          <button 
            onClick={onNew}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-100"
          >
            Nova Avaliação
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {evaluations.map((ev) => {
            const conformeCount = ev.results.filter(r => r.status === 'conforme').length;
            const totalCount = ev.results.length;
            const score = totalCount > 0 ? (conformeCount / totalCount) * 100 : 0;

            return (
              <div key={ev.id} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors group cursor-default">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg flex items-center justify-center ${score >= 80 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                      {score >= 80 ? <CheckCircle size={24} /> : <XCircle size={24} />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                         <span className="text-xs font-bold text-blue-600 uppercase tracking-tighter">{ev.areaType}</span>
                         <span className="text-xs text-slate-300">•</span>
                         <span className="text-xs font-medium text-slate-400">{new Date(ev.date).toLocaleDateString('pt-BR')}</span>
                         <span className="text-xs text-slate-300">•</span>
                         <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold">
                           <Clock size={12} /> {ev.shift}
                         </div>
                         <span className="text-xs text-slate-300">•</span>
                         <div className="flex items-center gap-1 text-xs text-slate-500 font-bold">
                           <Users size={12} /> {ev.employeeCount} func.
                         </div>
                      </div>
                      <h4 className="font-bold text-slate-800">{ev.evaluatorName}</h4>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <Layout size={14} className="text-slate-400" />
                          {totalCount} itens inspecionados
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                          <CheckCircle size={14} className="text-green-500" />
                          {conformeCount} conformes
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-slate-400 uppercase font-bold tracking-widest">Score Qualidade</div>
                      <div className={`text-xl font-black ${score >= 90 ? 'text-green-600' : score >= 70 ? 'text-amber-500' : 'text-red-500'}`}>
                        {score.toFixed(0)}%
                      </div>
                    </div>
                    <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${score >= 90 ? 'bg-green-500' : score >= 70 ? 'bg-amber-400' : 'bg-red-500'}`}
                    style={{ width: `${score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
