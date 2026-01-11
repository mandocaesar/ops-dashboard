import { Incident, Service, OnCallShift, DashboardMetrics } from './types';
import { MOCK_METRICS, MOCK_INCIDENTS, MOCK_SERVICES, MOCK_ON_CALL } from './mock-data';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class OpsCommanderApi {
  private useMock: boolean = true;

  constructor(useMock = true) {
    this.useMock = useMock;
  }

  async getDashboardMetrics(): Promise<DashboardMetrics> {
    if (this.useMock) {
      await delay(300);
      return MOCK_METRICS;
    }
    // Real API implementation would go here
    throw new Error("Real API not implemented");
  }

  async getIncidents(): Promise<Incident[]> {
    if (this.useMock) {
      await delay(500);
      return [...MOCK_INCIDENTS];
    }
    throw new Error("Real API not implemented");
  }

  async createIncident(incident: Partial<Incident>): Promise<Incident> {
    if (this.useMock) {
      await delay(400);
      const newInc: Incident = {
        id: `INC-${Math.floor(Math.random() * 10000)}`,
        title: incident.title || 'Untitled',
        severity: incident.severity || 'SEV3',
        status: incident.status || 'Investigating',
        service: incident.service || 'Unknown',
        assignee: incident.assignee || 'Unassigned',
        time: 'Just now',
        duration: '1m',
        ...incident
      };
      MOCK_INCIDENTS.unshift(newInc);
      return newInc;
    }
    throw new Error("Real API not implemented");
  }

  async getServices(): Promise<Service[]> {
    if (this.useMock) {
      await delay(300);
      return [...MOCK_SERVICES];
    }
    throw new Error("Real API not implemented");
  }

  async getOnCallSchedule(): Promise<OnCallShift[]> {
    if (this.useMock) {
      await delay(300);
      return [...MOCK_ON_CALL];
    }
    throw new Error("Real API not implemented");
  }
}

export const api = new OpsCommanderApi();