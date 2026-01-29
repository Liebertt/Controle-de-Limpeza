
export enum Frequency {
  DAILY = 'Diário',
  WEEKLY = 'Semanal',
  QUINZENAL = 'Quinzenal',
  MONTHLY = 'Mensal'
}

export enum AreaType {
  OPERATIONAL = 'Salas Operacionais',
  ADMINISTRATIVE = 'Áreas Administrativas'
}

export enum Shift {
  MORNING = '6h às 14h',
  AFTERNOON = '14h às 22h',
  NIGHT = '22h às 6h'
}

export interface ChecklistItem {
  id: string;
  description: string;
  frequency: Frequency;
  areaType: AreaType;
}

export interface EvaluationResult {
  itemId: string;
  status: 'conforme' | 'nao-conforme' | 'na';
  observation?: string;
}

export interface Evaluation {
  id?: string;
  date: string;
  evaluatorName: string;
  areaType: AreaType;
  shift: Shift;
  employeeCount: number;
  results: EvaluationResult[];
  createdAt?: string;
}
