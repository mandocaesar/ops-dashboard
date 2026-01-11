export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: 'SEV1' | 'SEV2' | 'SEV3';
  status: 'Investigating' | 'Monitoring' | 'Resolved' | 'Identified';
  service: string;
  duration: string;
  assignees: User[];
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  region: string;
  status: 'Operational' | 'Degraded' | 'Down';
  latency: string;
  errorRate: string;
  uptime: string;
  sparklineData: number[]; // Simplified for sparklines
}

export interface OnCallShift {
  id: string;
  userId: string;
  role: 'Primary' | 'Secondary' | 'Shadow';
  start: string; // ISO date
  end: string;   // ISO date
  isActive: boolean;
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
