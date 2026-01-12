export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  until?: string; // For OnCall
}

export interface Incident {
  id: string;
  title: string;
  severity: 'SEV1' | 'SEV2' | 'SEV3';
  status: 'Investigating' | 'Monitoring' | 'Resolved' | 'Identified';
  service: string;
  duration?: string; // For list view
  time?: string; // For card view
  assignee: string; // Name
  assignees?: User[]; // Object array
  createdAt?: string;
  source?: string;
  sourceId?: string;
  description?: string;
  steps?: { id: number; text: string; status: 'done' | 'current' | 'pending' }[];
  rca?: {
    rootCause: string;
    resolution: string;
    actionItems: string[];
  } | null;
}

export interface Service {
  id: string;
  name: string;
  region: string;
  status: 'Operational' | 'Degraded' | 'Down';
  latency: string;
  errorRate: string;
  uptime: string;
  ownerTeamId: string; // Linked to OnCallShift id
}

export interface OnCallShift {
  id: string;
  team: string;
  primary: User;
  secondary: User;
  nextRotation: string;
}

export interface DashboardMetrics {
  activeIncidents: number;
  activeIncidentsDiff: string;
  mttr: string;
  mttrDiff: string;
  mttd: string;
  mttdDiff: string;
  healthScore: string;
  healthScoreDiff: string;
}

export enum ViewState {
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  INCIDENTS = 'INCIDENTS',
  INCIDENT_DETAIL = 'INCIDENT_DETAIL',
  WAR_ROOM = 'WAR_ROOM',
  ON_CALL = 'ON_CALL',
  SERVICES = 'SERVICES',
  SETTINGS = 'SETTINGS'
}