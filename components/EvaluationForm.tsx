
import React, { useState, useMemo } from 'react';
import { AreaType, ChecklistItem, Frequency, EvaluationResult, Evaluation, Shift } from '../types';
import { CHECKLIST_DATA } from '../constants';
import { saveEvaluation } from '../services/supabaseClient';
import { ChevronRight, ChevronLeft, Save, X, Info, AlertCircle, CheckCircle2, Users, Clock } from 'lucide-react';

interface EvaluationFormProps {
  areaType: AreaType;
  onCancel: () => void;
  onSuccess: () => void;
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ areaType, onCancel, onSuccess }) => {
  const [evaluatorName, setEvaluatorName] = useState('');
  const [evaluationDate, setEvaluationDate] = useState(new Date().toISOString().split('T')[0]);
  const [shift, setShift] = useState<Shift>(Shift.MORNING);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [results, setResults] = useState<Record<string, EvaluationResult>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const frequencies = useMemo(() => [
    Frequency.DAILY,
    Frequency.WEEKLY,
    Frequency.QUINZENAL,
    Frequency.MONTHLY
  ], []);

  const itemsByFrequency = useMemo(() => {
    const map: Record<string, ChecklistItem[]> = {};
    frequencies.forEach(f => {
      map[f] = CHECKLIST_DATA.filter(item => item.areaType === areaType && item.frequency === f);
    });
    return map;
  }, [areaType, frequencies]);

  const activeFrequencies = useMemo(() => 
    frequencies.filter(f => itemsByFrequency[f].length > 0), 
  [frequencies, itemsByFrequency]);

  const handleStatusChange = (itemId: string, status: EvaluationResult['status']) => {
    setResults(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], itemId, status }
    }));
  };

  const handleObservationChange = (itemId: string, observation: string) => {
    setResults(prev => ({
      ...prev,
      [itemId]: { ...prev[itemId], itemId, observation }
    }));
  };

  const handleSubmit = async () => {
    if (!evaluatorName.trim()) {
      alert('Por favor, insira o nome do avaliador.');
      return;
    }

    setIsSubmitting(true);
    try {
      const evaluation: Evaluation = {
        evaluatorName,
        date: evaluationDate,
        areaType,
        shift,
        employeeCount,
        results: Object.values(results)
      };
      await saveEvaluation(evaluation);
      onSuccess();
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar avaliação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentFreq = activeFrequencies[currentStep];
  const currentItems = itemsByFrequency[currentFreq] || [];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{areaType}</span>
            <h2 className="text-xl font-bold text-slate-800">Nova Inspeção Técnica</h2>
          </div>
          <button 
            onClick={onCancel}
            className="self-start p-2 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Avaliador</label>
              <input 
                type="text" 
                value={evaluatorName}
                onChange={(e) => setEvaluatorName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 uppercase">Data da Inspeção</label>
              <input 
                type="date" 
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                <Clock size={14} /> Turno de Trabalho
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(Shift).map((s) => (
                  <button
                    key={s}
                    onClick={() => setShift(s)}
                    className={`flex-1 min-w-[100px] py-2 px-3 text-xs font-bold rounded-lg border-2 transition-all ${
                      shift === s 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                <Users size={14} /> Nº de Funcionários
              </label>
              <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => setEmployeeCount(n)}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                      employeeCount === n 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 bg-white sticky top-16 z-10">
        {activeFrequencies.map((f, idx) => (
          <div key={f} className="flex items-center flex-1">
            <div className={`flex flex-col items-center gap-1 flex-1 relative`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                idx === currentStep ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 
                idx < currentStep ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {idx + 1}
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-tighter ${idx === currentStep ? 'text-blue-600' : 'text-slate-400'}`}>
                {f}
              </span>
            </div>
            {idx < activeFrequencies.length - 1 && (
              <div className={`h-[2px] w-full flex-1 mx-2 ${idx < currentStep ? 'bg-green-500' : 'bg-slate-100'}`} />
            )}
          </div>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="p-6 space-y-8 min-h-[400px]">
        {currentItems.map((item, index) => (
          <div key={item.id} className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs font-mono text-slate-500">
                {index + 1}
              </span>
              <p className="text-slate-700 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <button
                onClick={() => handleStatusChange(item.id, 'conforme')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all font-semibold ${
                  results[item.id]?.status === 'conforme' 
                  ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' 
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                <CheckCircle2 size={18} />
                Conforme
              </button>
              <button
                onClick={() => handleStatusChange(item.id, 'nao-conforme')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all font-semibold ${
                  results[item.id]?.status === 'nao-conforme' 
                  ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' 
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                <AlertCircle size={18} />
                N. Conforme
              </button>
              <button
                onClick={() => handleStatusChange(item.id, 'na')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all font-semibold ${
                  results[item.id]?.status === 'na' 
                  ? 'bg-slate-100 border-slate-300 text-slate-600 shadow-sm' 
                  : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                }`}
              >
                <Info size={18} />
                N/A
              </button>
            </div>

            {results[item.id]?.status === 'nao-conforme' && (
              <textarea 
                placeholder="Descreva a não conformidade observada..."
                className="w-full p-4 bg-red-50/30 border border-red-100 rounded-xl text-sm focus:ring-2 focus:ring-red-200 outline-none transition-all placeholder:text-red-300"
                rows={2}
                value={results[item.id]?.observation || ''}
                onChange={(e) => handleObservationChange(item.id, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Navigation */}
      <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <button
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(prev => prev - 1)}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
            currentStep === 0 ? 'text-slate-300' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          <ChevronLeft size={20} />
          Anterior
        </button>

        {currentStep === activeFrequencies.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={20} />
            )}
            Finalizar Auditoria
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex items-center gap-2 px-8 py-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
          >
            Próximo
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default EvaluationForm;
