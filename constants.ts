import { TeamMember, TeamRole, RenovationItem, SpaceSpec, ProjectArmType } from './types';
import { Music, Gamepad2, Code, Palette } from 'lucide-react';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Douglas Ambrosio',
    role: TeamRole.ARTIST,
    responsibilities: ['Responsável Estúdio Musical', 'Apoio Design', 'Participação Games'],
    avatarUrl: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: '2',
    name: 'Denis Michel',
    role: TeamRole.INVESTOR,
    responsibilities: ['Investimento Anjo', 'Administração', 'Fornecimento Tech'],
    avatarUrl: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: '3',
    name: 'Paulo Gabriel L.S.',
    role: TeamRole.MANAGER_IA,
    responsibilities: ['Gestão de IA', 'Head Games', 'Lead Design', 'Apoio Geral'],
    avatarUrl: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: '4',
    name: 'Daniel Pinhal',
    role: TeamRole.DEV,
    responsibilities: ['Lead Pinus Software', 'Dev Games', 'Apoio 3D Design'],
    avatarUrl: 'https://picsum.photos/100/100?random=4'
  }
];

export const ARM_ICONS = {
  [ProjectArmType.STUDIO]: Music,
  [ProjectArmType.GAMES]: Gamepad2,
  [ProjectArmType.SOFTWARE]: Code,
  [ProjectArmType.DESIGN]: Palette,
};

export const INITIAL_RENOVATION_ITEMS: RenovationItem[] = [
  {
    id: '1',
    name: 'Fita de LED Neon',
    category: 'Decoração',
    estimatedCost: 270.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Para as paredes do estúdio e corredor.',
    priority: 'Média'
  },
  {
    id: '2',
    name: 'Tinta Preta (Corredor)',
    category: 'Construção',
    estimatedCost: 180.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Pintura total do corredor de 2x1m.',
    priority: 'Alta'
  },
  {
    id: '3',
    name: 'Tinta Prata (Escada)',
    category: 'Construção',
    estimatedCost: 150.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Para escada caracol de metal (6m altura).',
    priority: 'Alta'
  },
  {
    id: '4',
    name: 'Grafiteiro (Arte 4x1.5m)',
    category: 'Serviço',
    estimatedCost: 1080.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Incluso tinta e mão de obra. Arte autoral.',
    priority: 'Média'
  },
  {
    id: '5',
    name: 'Jardim Vertical Artificial (2.5x1m)',
    category: 'Decoração',
    estimatedCost: 540.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Folhagem densa para parede principal.',
    priority: 'Média'
  },
  {
    id: '6',
    name: 'Inversão de Porta',
    category: 'Serviço',
    estimatedCost: 210.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Mão de obra para inverter abertura.',
    priority: 'Alta'
  },
  {
    id: '7',
    name: 'MDF Bar + Cortes 45º',
    category: 'Mobiliário',
    estimatedCost: 360.00,
    actualCost: 0,
    status: 'Pendente',
    notes: '2 MDFs com cortes especiais para montar o balcão.',
    priority: 'Média'
  },
  {
    id: '8',
    name: 'Suporte de Taças e Copos',
    category: 'Mobiliário',
    estimatedCost: 90.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Instalação no bar.',
    priority: 'Baixa'
  },
  {
    id: '9',
    name: 'Cafeteira Cápsula',
    category: 'Equipamento',
    estimatedCost: 240.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Essencial para a produtora.',
    priority: 'Alta'
  },
  {
    id: '10',
    name: 'Manutenção Banheiro',
    category: 'Construção',
    estimatedCost: 300.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Reparo de canos e vazamentos.',
    priority: 'Alta'
  },
  {
    id: '11',
    name: 'Espelho Orgânico (80x40cm)',
    category: 'Decoração',
    estimatedCost: 210.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Design moderno.',
    priority: 'Baixa'
  },
  {
    id: '12',
    name: 'Sofá',
    category: 'Mobiliário',
    estimatedCost: 1320.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Confortável para lounge/estúdio.',
    priority: 'Média'
  },
  {
    id: '13',
    name: 'Puff',
    category: 'Mobiliário',
    estimatedCost: 180.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Complemento do sofá.',
    priority: 'Baixa'
  },
  {
    id: '14',
    name: 'Mesa de Trabalho',
    category: 'Mobiliário',
    estimatedCost: 480.00,
    actualCost: 0,
    status: 'Pendente',
    notes: 'Mesa principal para equipamentos.',
    priority: 'Alta'
  }
];

export const SPACE_SPECS: SpaceSpec[] = [
  {
    name: 'Corredor de Entrada',
    dimensions: '2m x 1m',
    area: '2m²',
    description: 'Pintura preta, acesso inicial.'
  },
  {
    name: 'Hall Escada',
    dimensions: '1m x 1m (base) -> 2m x 1m (topo)',
    area: 'Variável',
    description: 'Contém escada caracol de 6m de altura (Raio ~60cm). Pintura prata.'
  },
  {
    name: 'Banheiro',
    dimensions: '1m x 2m',
    area: '2m²',
    description: 'Necessita manutenção hidráulica.'
  },
  {
    name: 'Salas Superiores (Estúdio/Produtora)',
    dimensions: '3m x 5m',
    area: '15m²',
    description: 'Espaço principal. Piso, grafite, neon e mobiliário.'
  }
];