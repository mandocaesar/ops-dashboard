import React from 'react';
import { useDashboardMetrics, useIncidents } from '../../hooks/use-ops-data';
import { FilterSelect, MetricCard, IncidentRow } from '../../components/ui/shared';
import { IncidentsBySquadWidget, SystemReliabilityWidget } from './components/widgets';

interface DashboardViewProps {
  onJoinWarRoom: () => void;
}

const DashboardPage: React.FC<DashboardViewProps> = ({ onJoinWarRoom }) => {
  const { metrics } = useDashboardMetrics();
  const { incidents } = useIncidents();

  // Helper to map status to color for the row component
  const getStatusColor = (status: string) => {
    if (status === 'Investigating') return 'blue';
    if (status === 'Monitoring') return 'yellow';
    return 'gray';
  };

  const getServiceIcon = (serviceName: string) => {
    if (serviceName.includes('Payment')) return 'payments';
    if (serviceName.includes('Search')) return 'search';
    return 'dns';
  };

  // Assignee avatars mock logic based on name string
  const getAvatar = (name: string) => {
    if (name.includes('Sarah')) return "https://i.pravatar.cc/150?u=sarah";
    if (name.includes('Mike')) return "https://i.pravatar.cc/150?u=mike";
    return "https://i.pravatar.cc/150?u=default";
  };

  return (
    <div className="flex-1 overflow-y-auto p-3 bg-[#111418]">
      <div className="flex flex-col gap-3 max-w-full mx-auto">
        
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[#1c232b] p-2 rounded-lg border border-[#3b4754]">
          <div className="flex flex-wrap gap-2">
             <FilterSelect value="Last 24h" />
             <FilterSelect value="Production" />
             <FilterSelect value="Staging" />
             <FilterSelect value="Severity: All" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#9dabb9] uppercase tracking-wider px-2">
            <span>Auto-refresh: On</span>
            <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
          </div>
        </div>

        {/* Metric Cards - Denser Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <MetricCard 
            title="Active Incidents" 
            icon="local_fire_department" 
            value={metrics?.activeIncidents || '-'} 
            subValue={metrics?.activeIncidentsDiff || '-'} 
            subType="bad" 
            iconColor="text-red-500" 
          />
          <MetricCard 
            title="MTTR (7d)" 
            icon="timer" 
            value={metrics?.mttr || '-'} 
            subValue={metrics?.mttrDiff || '-'} 
            subType="good" 
            iconColor="text-blue-500" 
          />
          <MetricCard 
            title="MTTD (7d)" 
            icon="radar" 
            value={metrics?.mttd || '-'} 
            subValue={metrics?.mttdDiff || '-'} 
            subType="neutral" 
            iconColor="text-blue-500" 
          />
          <MetricCard 
            title="Health Score" 
            icon="favorite" 
            value={metrics?.healthScore || '-'} 
            subValue={metrics?.healthScoreDiff || '-'} 
            subType="good" 
            iconColor="text-green-500" 
          />
        </div>

        {/* Middle Section: Squads & Reliability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <IncidentsBySquadWidget />
          <SystemReliabilityWidget />
        </div>

        {/* Recent Incidents Table */}
        <div className="flex flex-col rounded-lg border border-[#3b4754] bg-[#1c232b] overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-[#3b4754]">
            <h3 className="text-white text-sm font-bold uppercase tracking-wide">Recent Incidents</h3>
            <div className="flex gap-2 text-[10px] font-medium text-[#9dabb9]">
               <button className="flex items-center gap-1 hover:text-white transition-colors"><span className="material-symbols-outlined text-[14px]">filter_list</span> Filter</button>
               <button className="flex items-center gap-1 hover:text-white transition-colors"><span className="material-symbols-outlined text-[14px]">download</span> Export</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1c232b] border-b border-[#3b4754]">
                  {['INCIDENT ID', 'SERVICE', 'SEVERITY', 'STATUS', 'DURATION', 'ASSIGNEE', 'ACTION'].map(h => (
                    <th key={h} className="py-2 px-4 text-[#566270] text-[10px] font-bold uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#283039]">
                {incidents.slice(0, 3).map(inc => (
                  <IncidentRow 
                    key={inc.id}
                    id={`#${inc.id}`} 
                    service={inc.service}
                    serviceIcon={getServiceIcon(inc.service)}
                    severity={inc.severity}
                    status={inc.status} 
                    statusColor={getStatusColor(inc.status)}
                    duration={inc.duration || 'N/A'}
                    assigneeUrl={getAvatar(inc.assignee)}
                    onJoinWarRoom={onJoinWarRoom} 
                  />
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-[#1c232b] px-3 py-2 border-t border-[#3b4754] flex items-center justify-between">
             <p className="text-[10px] text-[#9dabb9]">Showing <span className="font-bold text-white">1-3</span> of <span className="font-bold text-white">12</span></p>
             <div className="flex items-center gap-1">
               <button className="size-5 flex items-center justify-center rounded hover:bg-[#283039] text-[#9dabb9] disabled:opacity-50"><span className="material-symbols-outlined text-xs">chevron_left</span></button>
               <button className="size-5 flex items-center justify-center rounded bg-primary text-white text-[10px] font-bold">1</button>
               <button className="size-5 flex items-center justify-center rounded hover:bg-[#283039] text-[#9dabb9] text-[10px] font-medium">2</button>
               <button className="size-5 flex items-center justify-center rounded hover:bg-[#283039] text-[#9dabb9] disabled:opacity-50"><span className="material-symbols-outlined text-xs">chevron_right</span></button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;