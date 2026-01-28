
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import { Evaluation, Shift } from '../types';

/**
 * Utilitário para buscar variáveis de ambiente de forma segura no navegador.
 * No Vercel, variáveis com NEXT_PUBLIC_ são injetadas no bundle durante o build.
 */
const getEnvironmentVariable = (key: string): string => {
  // Fix: Cast import.meta to any to bypass property 'env' check on ImportMeta
  const meta = import.meta as any;
  if (meta && meta.env && meta.env[key]) {
    return meta.env[key];
  }
  
  // Tenta buscar no process.env (Vercel/Node Injection)
  try {
    // @ts-ignore
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key];
    }
  } catch (e) {}

  // Fallback para window (algumas configurações de build injetam aqui)
  // @ts-ignore
  return (window as any)._env_?.[key] || '';
};

const supabaseUrl = getEnvironmentVariable('VITE_SUPABASE_URL');
const supabaseKey = getEnvironmentVariable('VITE_SUPABASE_ANON_KEY');

export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);

if (!isSupabaseConfigured) {
  console.warn("⚠️ [Supabase] Chaves não detectadas. Verifique se você adicionou NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no painel do Vercel e fez um 'Redeploy'.");
} else {
  console.log("✅ [Supabase] Chaves detectadas. Tentando conectar...");
}

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

export const saveEvaluation = async (evaluation: Evaluation) => {
    if (!supabase) {
        console.warn("⚠️ [Supabase] Salvando apenas LOCALMENTE (offline).");
        const saved = JSON.parse(localStorage.getItem('evaluations') || '[]');
        const newEval = { ...evaluation, id: `local-${Date.now()}`, createdAt: new Date().toISOString() };
        saved.push(newEval);
        localStorage.setItem('evaluations', JSON.stringify(saved));
        return newEval;
    }

    // Mapeamento correto para as colunas do banco de dados (snake_case)
    const payload = {
        date: evaluation.date,
        evaluator_name: evaluation.evaluatorName,
        area_type: evaluation.areaType,
        shift: evaluation.shift,
        employee_count: evaluation.employeeCount,
        results: evaluation.results
    };

    const { data, error } = await supabase
        .from('evaluations')
        .insert([payload])
        .select();

    if (error) {
        console.error('❌ [Supabase Error]:', error.message, error.details, error.hint);
        throw new Error(`Erro ao salvar no banco: ${error.message}`);
    }
    
    console.log("✅ [Supabase] Dados salvos com sucesso!");
    return data[0];
};

export const getEvaluations = async (): Promise<Evaluation[]> => {
    if (!supabase) {
        const local = JSON.parse(localStorage.getItem('evaluations') || '[]');
        return local.reverse();
    }

    try {
        const { data, error } = await supabase
            .from('evaluations')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return data.map(item => ({
            id: item.id,
            date: item.date,
            evaluatorName: item.evaluator_name,
            areaType: item.area_type as any,
            shift: item.shift as Shift,
            employeeCount: item.employee_count,
            results: item.results as any,
            createdAt: item.created_at
        }));
    } catch (e: any) {
        console.error("❌ [Supabase] Erro ao buscar dados:", e.message);
        return JSON.parse(localStorage.getItem('evaluations') || '[]').reverse();
    }
};
