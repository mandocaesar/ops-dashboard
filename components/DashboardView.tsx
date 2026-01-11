import React from 'react';

interface DashboardViewProps {
  onJoinWarRoom: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onJoinWarRoom }) => {
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
            value="3" 
            subValue="+1" 
            subType="bad" 
            iconColor="text-red-500" 
          />
          <MetricCard 
            title="MTTR (7d)" 
            icon="timer" 
            value="24m" 
            subValue="-12%" 
            subType="good" 
            iconColor="text-blue-500" 
          />
          <MetricCard 
            title="MTTD (7d)" 
            icon="radar" 
            value="4m" 
            subValue="Avg" 
            subType="neutral" 
            iconColor="text-blue-500" 
          />
          <MetricCard 
            title="Health Score" 
            icon="favorite" 
            value="98.2%" 
            subValue="+0.5%" 
            subType="good" 
            iconColor="text-green-500" 
          />
        </div>

        {/* Middle Section: Squads & Reliability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Incidents by Squad - Stacked Horizontal Bars */}
          <div className="flex flex-col rounded-lg border border-[#3b4754] bg-[#1c232b] p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-white text-sm font-bold uppercase tracking-wide">Incidents by Squad</h3>
                <p className="text-[#9dabb9] text-[10px] mt-0.5">Last 30 Days • Criticality Distribution</p>
              </div>
              <div className="text-right">
                <span className="text-white text-lg font-bold">12</span>
                <span className="text-[#9dabb9] text-[10px] ml-1 font-medium">Total</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 mb-3">
              <StackedSquadBar label="Search" sev1={1} sev2={2} sev3={3} />
              <StackedSquadBar label="Checkout" sev1={1} sev2={1} sev3={1} />
              <StackedSquadBar label="Payments" sev1={2} sev2={0} sev3={0} />
              <StackedSquadBar label="Auth" sev1={0} sev2={1} sev3={0} />
              <StackedSquadBar label="Platform" sev1={0} sev2={0} sev3={0} />
              <StackedSquadBar label="Mobile" sev1={0} sev2={0} sev3={0} />
            </div>

            {/* Key Highlights */}
            <div className="mt-auto bg-[#111418]/50 rounded border border-[#283039] p-3">
               <div className="flex items-center gap-2 mb-2">
                 <span className="material-symbols-outlined text-[#9dabb9] text-sm">lightbulb</span>
                 <h4 className="text-[#9dabb9] text-[10px] font-bold uppercase tracking-wider">Key Highlights</h4>
               </div>
               <div className="space-y-2">
                 <div className="flex gap-2 items-start">
                   <div className="size-1 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                   <p className="text-[11px] text-gray-300 leading-tight">
                     <span className="text-white font-medium">Payments</span> squad accounts for <span className="text-red-400 font-medium">40%</span> of all critical incidents this week.
                   </p>
                 </div>
                 <div className="flex gap-2 items-start">
                   <div className="size-1 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                   <p className="text-[11px] text-gray-300 leading-tight">
                     <span className="text-white font-medium">Platform</span> & <span className="text-white font-medium">Mobile</span> squads have had <span className="text-green-400 font-medium">0 incidents</span> in the last 14 days.
                   </p>
                 </div>
               </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-3 pt-2 border-t border-[#283039]">
                <LegendItem color="bg-red-500" label="Critical" />
                <LegendItem color="bg-orange-500" label="High" />
                <LegendItem color="bg-blue-600" label="Moderate" />
            </div>
          </div>

          {/* System Reliability - Categorized & Detailed */}
          <div className="flex flex-col rounded-lg border border-[#3b4754] bg-[#1c232b] p-4">
             <div className="mb-3 flex justify-between items-end">
                <div>
                  <h3 className="text-white text-sm font-bold uppercase tracking-wide">System Reliability</h3>
                  <p className="text-[#9dabb9] text-[10px] mt-0.5">Uptime & Error Breakdown (Last 30d)</p>
                </div>
                <div className="flex gap-4 text-[9px] font-bold text-[#9dabb9] uppercase tracking-wider pr-2">
                   <span className="w-8 text-right">Prod</span>
                   <span className="w-8 text-right">Active</span>
                   <span className="w-8 text-right">Fixed</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 overflow-y-auto pr-1 h-full">
                
                <ReliabilityGroup title="Application">
                  <ReliabilityRowSmall name="Payments API" uptime="100%" produced={0} active={0} resolved={0} status="good" />
                  <ReliabilityRowSmall name="Search Service" uptime="99.8%" produced={42} active={5} resolved={37} status="warning" />
                  <ReliabilityRowSmall name="Auth Service" uptime="99.99%" produced={2} active={0} resolved={2} status="good" />
                  <ReliabilityRowSmall name="Frontend App" uptime="99.95%" produced={12} active={1} resolved={11} status="good" />
                </ReliabilityGroup>

                <ReliabilityGroup title="Infrastructure">
                   <ReliabilityRowSmall name="K8s Cluster (US-East)" uptime="100%" produced={0} active={0} resolved={0} status="good" />
                   <ReliabilityRowSmall name="CDN Edge Nodes" uptime="99.9%" produced={5} active={1} resolved={4} status="good" />
                </ReliabilityGroup>

                <ReliabilityGroup title="Database">
                   <ReliabilityRowSmall name="Primary RDS" uptime="100%" produced={0} active={0} resolved={0} status="good" />
                   <ReliabilityRowSmall name="Redis Cache" uptime="100%" produced={1} active={0} resolved={1} status="good" />
                </ReliabilityGroup>

                <ReliabilityGroup title="Third Party">
                   <ReliabilityRowSmall name="Stripe Gateway" uptime="99.5%" produced={23} active={2} resolved={21} status="warning" />
                </ReliabilityGroup>

              </div>
          </div>
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
                <IncidentRow 
                  id="#INC-2049" 
                  service="Payments API" 
                  serviceIcon="payments"
                  severity="SEV1" 
                  status="Investigating" 
                  statusColor="blue"
                  duration="12m" 
                  assigneeUrl="https://i.pravatar.cc/150?u=sarah"
                  onJoinWarRoom={onJoinWarRoom} 
                />
                <IncidentRow 
                  id="#INC-2048" 
                  service="Search Service" 
                  serviceIcon="search"
                  severity="SEV2" 
                  status="Monitoring" 
                  statusColor="yellow"
                  duration="45m" 
                  assigneeUrl="https://i.pravatar.cc/150?u=mike"
                  assigneeUrl2="https://i.pravatar.cc/150?u=dave"
                  onJoinWarRoom={onJoinWarRoom}
                />
                <IncidentRow 
                  id="#INC-2045" 
                  service="Frontend" 
                  serviceIcon="desktop_windows"
                  severity="SEV3" 
                  status="Resolved" 
                  statusColor="gray"
                  duration="2h 10m" 
                  assigneeUrl="https://i.pravatar.cc/150?u=jane"
                  onJoinWarRoom={onJoinWarRoom}
                />
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

// --- Helper Components ---

const FilterSelect = ({ value }: { value: string }) => (
  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-[#111418] hover:bg-[#283039] border border-[#3b4754] rounded text-[11px] font-medium text-gray-300 transition-colors">
    {value}
    <span className="material-symbols-outlined text-[14px]">expand_more</span>
  </button>
);

const MetricCard = ({ title, icon, value, subValue, subType, iconColor }: any) => (
  <div className="flex items-center justify-between rounded-lg p-3 border border-[#3b4754] bg-[#1c232b] relative overflow-hidden group hover:border-[#4b5563] transition-colors shadow-sm">
    <div className="flex flex-col gap-0.5 z-10">
      <p className="text-[#9dabb9] text-[10px] font-bold uppercase tracking-wider">{title}</p>
      <div className="flex items-baseline gap-2">
        <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
            subType === 'good' ? 'text-green-500 bg-green-500/10' : 
            subType === 'bad' ? 'text-red-500 bg-red-500/10' : 'text-[#9dabb9] bg-[#283039]'
          }`}>{subValue}</span>
      </div>
    </div>
    <div className={`flex items-center justify-center size-10 rounded-lg bg-[#283039]/50 ${iconColor}`}>
         <span className="material-symbols-outlined text-[24px]">{icon}</span>
    </div>
  </div>
);

const StackedSquadBar = ({ label, sev1, sev2, sev3 }: any) => {
  const total = sev1 + sev2 + sev3;
  const p1 = total > 0 ? (sev1 / total) * 100 : 0;
  const p2 = total > 0 ? (sev2 / total) * 100 : 0;
  const p3 = total > 0 ? (sev3 / total) * 100 : 0;

  return (
    <div className="grid grid-cols-[70px_1fr_20px] items-center gap-3 text-xs group">
      <span className="font-medium text-[11px] text-gray-400 group-hover:text-white transition-colors truncate">{label}</span>
      <div className="h-1.5 w-full bg-[#283039] rounded-sm flex overflow-hidden">
        {sev1 > 0 && <div style={{ width: `${p1}%` }} className="h-full bg-red-500"></div>}
        {sev2 > 0 && <div style={{ width: `${p2}%` }} className="h-full bg-orange-500"></div>}
        {sev3 > 0 && <div style={{ width: `${p3}%` }} className="h-full bg-blue-600"></div>}
        {total === 0 && <div className="w-full h-full opacity-0"></div>}
      </div>
      <span className="font-bold text-[11px] text-gray-500 text-right">{total}</span>
    </div>
  );
};

const LegendItem = ({ color, label }: any) => (
  <div className="flex items-center gap-1.5 text-[9px] text-[#9dabb9] font-bold uppercase tracking-wider">
    <span className={`size-1.5 rounded-full ${color}`}></span> {label}
  </div>
);

const ReliabilityGroup = ({ title, children }: any) => (
  <div className="mb-1">
    <div className="flex items-center gap-2 mb-1 px-1">
       <span className="text-[9px] font-bold text-[#566270] uppercase tracking-wider">{title}</span>
       <div className="h-px bg-[#283039] flex-1"></div>
    </div>
    <div className="flex flex-col">
      {children}
    </div>
  </div>
);

const ReliabilityRowSmall = ({ name, uptime, produced, active, resolved, status = 'good' }: any) => (
  <div className="flex items-center justify-between py-1.5 px-2 hover:bg-[#283039] rounded transition-colors group">
    <div className="flex items-center gap-2 min-w-0">
      <div className={`size-1.5 rounded-full shrink-0 ${status === 'good' ? 'bg-green-500' : 'bg-yellow-500'} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}></div>
      <div className="truncate flex flex-col">
        <p className="text-gray-300 text-[11px] font-bold truncate group-hover:text-white transition-colors leading-tight">{name}</p>
        <p className="text-[#566270] text-[9px] font-medium leading-tight">Up: <span className={status === 'good' ? 'text-green-500' : 'text-yellow-500'}>{uptime}</span></p>
      </div>
    </div>
    <div className="flex items-center gap-4 text-right shrink-0">
        <div className="w-8">
            <span className={`text-[11px] font-bold ${produced > 0 ? 'text-white' : 'text-[#3b4754]'}`}>{produced}</span>
        </div>
        <div className="w-8">
            <span className={`text-[11px] font-bold ${active > 0 ? 'text-orange-500' : 'text-[#3b4754]'}`}>{active}</span>
        </div>
         <div className="w-8">
            <span className={`text-[11px] font-bold ${resolved > 0 ? 'text-green-500' : 'text-[#3b4754]'}`}>{resolved}</span>
        </div>
    </div>
  </div>
);

const IncidentRow = ({ id, service, serviceIcon, severity, status, statusColor, duration, assigneeUrl, assigneeUrl2, onJoinWarRoom }: any) => {
  return (
    <tr className="group hover:bg-[#283039] transition-colors cursor-pointer border-b border-[#283039] last:border-0" onClick={severity === 'SEV1' ? onJoinWarRoom : undefined}>
      <td className="py-2 px-4 text-white font-mono text-[11px]">{id}</td>
      <td className="py-2 px-4">
        <div className="flex items-center gap-2 text-gray-300 text-[11px] font-medium">
           <span className="material-symbols-outlined text-[#566270] text-[14px]">{serviceIcon || 'dns'}</span>
           {service}
        </div>
      </td>
      <td className="py-2 px-4">
        <span className={`inline-flex items-center justify-center px-1.5 py-0.5 rounded text-[9px] font-bold border ${
          severity === 'SEV1' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
          severity === 'SEV2' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
          'bg-blue-500/10 text-blue-500 border-blue-500/20'
        }`}>{severity}</span>
      </td>
      <td className="py-2 px-4">
         <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium border ${
            statusColor === 'blue' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
            statusColor === 'yellow' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
            'bg-[#283039] text-[#9dabb9] border-[#3b4754]'
         }`}>
           <span className={`size-1.5 rounded-full ${
             statusColor === 'blue' ? 'bg-blue-400' :
             statusColor === 'yellow' ? 'bg-yellow-500' : 'bg-[#9dabb9]'
           }`}></span> 
           {status}
         </span>
      </td>
      <td className="py-2 px-4 text-[#9dabb9] text-[11px] font-mono">{duration}</td>
      <td className="py-2 px-4">
        <div className="flex -space-x-2">
           <div className="size-5 rounded-full bg-gray-600 bg-cover border-2 border-[#1c232b]" style={{backgroundImage: `url(${assigneeUrl})`}}></div>
           {assigneeUrl2 && (
             <div className="size-5 rounded-full bg-gray-600 bg-cover border-2 border-[#1c232b]" style={{backgroundImage: `url(${assigneeUrl2})`}}></div>
           )}
        </div>
      </td>
      <td className="py-2 px-4">
         <button className="text-[#566270] hover:text-white p-1 rounded hover:bg-[#3b4754] transition-colors">
           <span className="material-symbols-outlined text-[14px]">more_vert</span>
         </button>
      </td>
    </tr>
  );
};
