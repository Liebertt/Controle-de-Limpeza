
import { ChecklistItem, Frequency, AreaType } from './types';

export const CHECKLIST_DATA: ChecklistItem[] = [
  // SALAS OPERACIONAIS - DIÁRIO
  { id: 'op-d-1', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Recolher detritos, remover pó e manchas das bilheterias, sala de renda e SSO, inclusive do lado externo.' },
  { id: 'op-d-2', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Limpar cestos de lixo e lixeiras de coleta seletiva (livres de detritos até 2/3 do volume). Remoção de pó e manchas.' },
  { id: 'op-d-3', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Limpeza de geladeiras, micro-ondas, mesas, cadeiras e pias na copa.' },
  { id: 'op-d-4', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Remover pó e manchas de mesas, armários, arquivos, peitoris e telefones (sem produtos alérgicos).' },
  { id: 'op-d-7', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Varrer e remover manchas em todo o piso.' },
  { id: 'op-d-8', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Limpar forno de micro-ondas internamente.' },
  { id: 'op-d-9', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Desinfetar telefones com produto adequado.' },
  { id: 'op-d-10', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Limpar e higienizar bebedouros.' },
  { id: 'op-d-11', areaType: AreaType.OPERATIONAL, frequency: Frequency.DAILY, description: 'Limpar paredes, muretas, pilares, portas, vidros e acrílicos.' },
  
  // SALAS OPERACIONAIS - SEMANAL
  { id: 'op-s-1', areaType: AreaType.OPERATIONAL, frequency: Frequency.WEEKLY, description: 'Realizar a limpeza profunda das lixeiras.' },
  
  // SALAS OPERACIONAIS - QUINZENAL
  { id: 'op-q-1', areaType: AreaType.OPERATIONAL, frequency: Frequency.QUINZENAL, description: 'Lavar paredes, muretas e pilares.' },
  { id: 'op-q-2', areaType: AreaType.OPERATIONAL, frequency: Frequency.QUINZENAL, description: 'Lavar e encerar pisos emborrachados.' },
  
  // SALAS OPERACIONAIS - MENSAL
  { id: 'op-m-1', areaType: AreaType.OPERATIONAL, frequency: Frequency.MONTHLY, description: 'Remover pó das saídas de ar-condicionado, exaustores e ventiladores.' },
  { id: 'op-m-2', areaType: AreaType.OPERATIONAL, frequency: Frequency.MONTHLY, description: 'Limpeza da tela filtro de ar-condicionado (abaixo de 4m).' },
  { id: 'op-m-3', areaType: AreaType.OPERATIONAL, frequency: Frequency.MONTHLY, description: 'Descongelamento e limpeza geral das geladeiras.' },
  { id: 'op-m-4', areaType: AreaType.OPERATIONAL, frequency: Frequency.MONTHLY, description: 'Remover pó e manchas do teto.' },
  { id: 'op-m-5', areaType: AreaType.OPERATIONAL, frequency: Frequency.MONTHLY, description: 'Remover pó e fuligem das luminárias.' },

  // ÁREAS ADMINISTRATIVAS - DIÁRIO
  { id: 'ad-d-1', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Limpar cestos de lixo e lixeiras de coleta seletiva.' },
  { id: 'ad-d-2', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Higienizar geladeiras, purificadores, micro-ondas, mesas e pias da copa.' },
  { id: 'ad-d-3', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Remover pó e manchas de móveis administrativos e telefones.' },
  { id: 'ad-d-5', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Varrer e recolher detritos e gomas de mascar do piso.' },
  { id: 'ad-d-6', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Sanitários: Varrer, desinfetar e repor insumos constantemente.' },
  { id: 'ad-d-7', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Sanitários: Lavar boxes, espelhos, assentos e mictórios no mínimo a cada turno.' },
  { id: 'ad-d-8', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Vestiários: Limpar, varrer, desinfetar e lavar boxes no mínimo a cada turno.' },
  { id: 'ad-d-9', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Limpar paredes, pilares, portas e vidros.' },
  { id: 'ad-d-10', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.DAILY, description: 'Desinfetar telefones.' },

  // ÁREAS ADMINISTRATIVAS - QUINZENAL
  { id: 'ad-q-1', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.QUINZENAL, description: 'Limpeza profunda das lixeiras.' },
  { id: 'ad-q-2', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.QUINZENAL, description: 'Lavar e encerar pisos emborrachados.' },
  { id: 'ad-q-3', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.QUINZENAL, description: 'Lavar azulejos dos sanitários e vestiários.' },

  // ÁREAS ADMINISTRATIVAS - MENSAL
  { id: 'ad-m-1', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.MONTHLY, description: 'Remover pó das saídas de ar, exaustores e ventiladores.' },
  { id: 'ad-m-2', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.MONTHLY, description: 'Descongelamento e limpeza geral das geladeiras.' },
  { id: 'ad-m-3', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.MONTHLY, description: 'Lavar paredes, muretas e pilares.' },
  { id: 'ad-m-4', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.MONTHLY, description: 'Remover pó e manchas superficiais do teto.' },
  { id: 'ad-m-5', areaType: AreaType.ADMINISTRATIVE, frequency: Frequency.MONTHLY, description: 'Remover pó e fuligem externa das luminárias.' },
];
