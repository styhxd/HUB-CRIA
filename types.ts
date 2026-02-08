export enum TeamRole {
  ARTIST = 'Artista Geral',
  INVESTOR = 'Investidor & Admin',
  MANAGER_IA = 'Gestor IA & Head',
  DEV = 'Programador & Tech Lead',
}

export enum ProjectArmType {
  STUDIO = 'Estúdio Musical',
  GAMES = 'STYH Games',
  SOFTWARE = 'Pinus Software',
  DESIGN = 'Design Agency',
}

export interface TeamMember {
  id: string;
  name: string;
  role: TeamRole;
  responsibilities: string[];
  avatarUrl?: string;
}

export interface RenovationItem {
  id: string;
  name: string;
  category: 'Construção' | 'Decoração' | 'Mobiliário' | 'Equipamento' | 'Serviço';
  estimatedCost: number;
  actualCost: number;
  status: 'Pendente' | 'Comprado' | 'Instalado';
  notes: string;
  priority: 'Alta' | 'Média' | 'Baixa';
}

export interface SpaceSpec {
  name: string;
  dimensions: string;
  area: string;
  description: string;
}

export interface AppData {
  renovationItems: RenovationItem[];
  lastUpdated: string;
}