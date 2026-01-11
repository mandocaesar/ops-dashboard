import { Incident, Service, OnCallShift, DashboardMetrics } from './types';

export const MOCK_METRICS: DashboardMetrics = {
  activeIncidents: 3,
  activeIncidentsDiff: '+1',
  mttr: '24m',
  mttrDiff: '-12%',
  mttd: '4m',
  mttdDiff: 'Avg',
  healthScore: '98.2%',
  healthScoreDiff: '+0.5%'
};

export const MOCK_INCIDENTS: Incident[] = [
  { 
    id: 'INC-2049', 
    title: 'Payments API High Latency', 
    severity: 'SEV1', 
    status: 'Investigating', 
    service: 'Payments API', 
    time: '10m ago', 
    duration: '12m',
    assignee: 'Sarah Chen',
    source: 'PEGA Ticket',
    sourceId: 'PG-88291',
    description: 'Elevated latency observed in the checkout flow. Payment gateway response times have degraded to >2s (p99).',
    steps: [
      { id: 1, text: 'Verify ELB metrics', status: 'done' },
      { id: 2, text: 'Check upstream payment provider status', status: 'done' },
      { id: 3, text: 'Rollback recent canary deployment', status: 'current' }
    ],
    rca: null
  },
  { 
    id: 'INC-2048', 
    title: 'Search Indexing Lag', 
    severity: 'SEV2', 
    status: 'Monitoring', 
    service: 'Search Service', 
    time: '1h ago', 
    duration: '45m',
    assignee: 'Mike Ross',
    source: 'Google Workspace',
    sourceId: 'ALERT-992',
    description: 'Search results are not updating in real-time. Indexing queue depth has exceeded threshold.',
    steps: [
      { id: 1, text: 'Scale up worker nodes', status: 'done' },
      { id: 2, text: 'Monitor queue drainage', status: 'current' }
    ],
    rca: null
  },
  { 
    id: 'INC-2047', 
    title: 'Auth Token Expiry Issues', 
    severity: 'SEV3', 
    status: 'Resolved', 
    service: 'Auth Service', 
    time: '3h ago', 
    duration: '2h 10m',
    assignee: 'John Doe',
    source: 'Email',
    sourceId: 'support@example.com',
    description: 'Users reported being logged out unexpectedly. Root cause identified as clock skew on auth servers.',
    steps: [
      { id: 1, text: 'Sync NTP on all nodes', status: 'done' },
      { id: 2, text: 'Verify token persistence', status: 'done' }
    ],
    rca: {
      rootCause: 'NTP synchronization failure on auth-cluster-03 caused token validation logic to reject valid tokens issued by other nodes due to timestamp mismatch.',
      resolution: 'Forced NTP sync on affected nodes and updated daemon configuration to prevent drift.',
      actionItems: [
        'Implement clock drift monitoring (P2)',
        'Update base image with new NTP config (P3)'
      ]
    }
  },
  { 
    id: 'INC-2046', 
    title: 'Frontend Assets 404', 
    severity: 'SEV2', 
    status: 'Resolved', 
    service: 'Frontend App', 
    time: '5h ago', 
    duration: '50m',
    assignee: 'Jane Smith',
    source: 'WhatsApp Group',
    sourceId: 'DevOps-L1',
    description: 'CDN edge locations returning 404 for main.js bundle after deployment.',
    steps: [
      { id: 1, text: 'Purge CDN cache', status: 'done' },
      { id: 2, text: 'Redeploy static assets', status: 'done' }
    ],
    rca: {
      rootCause: 'Race condition in CD pipeline where assets were deleted from old bucket before new bucket propagation completed.',
      resolution: 'Manual rollback of frontend assets and cache purge.',
      actionItems: [
        'Modify pipeline to use immutable deployments (P1)',
        'Add pre-switchover health check (P2)'
      ]
    }
  },
  { 
    id: 'INC-2045', 
    title: 'Database Disk Usage Warning', 
    severity: 'SEV3', 
    status: 'Resolved', 
    service: 'Primary RDS', 
    time: '1d ago', 
    duration: '2h 10m',
    assignee: 'System',
    source: 'Manual',
    sourceId: '-',
    description: 'Primary database disk usage reached 85% warning threshold.',
    steps: [
      { id: 1, text: 'Archive old audit logs', status: 'done' },
      { id: 2, text: 'Resize EBS volume', status: 'done' }
    ],
    rca: null
  },
];

export const MOCK_SERVICES: Service[] = [
  { id: 's1', name: "Payments API", region: "us-east-1", status: "Operational", latency: "45ms", errorRate: "0.02%", uptime: "99.99%" },
  { id: 's2', name: "Auth Service", region: "global", status: "Operational", latency: "12ms", errorRate: "0.00%", uptime: "100%" },
  { id: 's3', name: "Search Indexer", region: "us-west-2", status: "Degraded", latency: "850ms", errorRate: "2.4%", uptime: "99.5%" },
  { id: 's4', name: "Frontend App", region: "global", status: "Operational", latency: "120ms", errorRate: "0.1%", uptime: "99.9%" },
  { id: 's5', name: "Notification Svc", region: "eu-central-1", status: "Operational", latency: "65ms", errorRate: "0.01%", uptime: "99.95%" },
  { id: 's6', name: "Inventory DB", region: "us-east-1", status: "Operational", latency: "5ms", errorRate: "0.00%", uptime: "100%" },
];

export const MOCK_ON_CALL: OnCallShift[] = [
  { 
    id: 'oc1', team: "Platform SRE", 
    primary: {id: 'u1', name: "Sarah Chen", avatarUrl: "https://i.pravatar.cc/150?u=sarah", until: "Oct 24, 9:00 AM", role: 'SRE'},
    secondary: {id: 'u2', name: "David Kim", avatarUrl: "https://i.pravatar.cc/150?u=david", until: "Oct 24, 9:00 AM", role: 'SRE'},
    nextRotation: "Oct 24 (Tomorrow)"
  },
  { 
    id: 'oc2', team: "Product Engineering", 
    primary: {id: 'u3', name: "Mike Ross", avatarUrl: "https://i.pravatar.cc/150?u=mike", until: "Oct 25, 9:00 AM", role: 'Eng'},
    secondary: {id: 'u4', name: "Rachel Zane", avatarUrl: "https://i.pravatar.cc/150?u=rachel", until: "Oct 25, 9:00 AM", role: 'Eng'},
    nextRotation: "Oct 25"
  },
  { 
    id: 'oc3', team: "Data Infrastructure", 
    primary: {id: 'u5', name: "Jessica P", avatarUrl: "https://i.pravatar.cc/150?u=jess", until: "Oct 26, 9:00 AM", role: 'Data Eng'},
    secondary: {id: 'u6', name: "Louis Litt", avatarUrl: "https://i.pravatar.cc/150?u=louis", until: "Oct 26, 9:00 AM", role: 'Data Eng'},
    nextRotation: "Oct 26"
  },
];