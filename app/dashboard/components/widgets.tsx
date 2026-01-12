import React from 'react';
import { LegendItem } from '../../../components/ui/shared';

export const StackedSquadBar = ({ label, sev1, sev2, sev3 }: any) => {
  const total = sev1 + sev2 + sev3;
  const p1 = total > 0 ? (sev1 / total) * 100 : 0;
  const p2 = total > 0 ? (sev2 / total) * 100 : 0;
  const p3 = total > 0 ? (sev3 / total) * 100 : 0;

  return (
    <div className="grid grid-cols-[75px_1fr_25px] items-center gap-4 text-xs group py-1">
      <span className="font-semibold text-[11px] text-gray-400 group-hover:text-white transition-colors truncate">{label}</span>
      <div className="h-2 w-full bg-[#283039] rounded-sm flex overflow-hidden shadow-inner">
        {sev1 > 0 && <div style={{ width: `${p1}%` }} className="h-full bg-red-500 shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>}
        {sev2 > 0 && <div style={{ width: `${p2}%` }} className="h-full bg-orange-500 shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>}
        {sev3 > 0 && <div style={{ width: `${p3}%` }} className="h-full bg-blue-600 shadow-[inset_0_0_4px_rgba(0,0,0,0.2)]"></div>}
        {total === 0 && <div className="w-full h-full opacity-0"></div>}
      </div>
      <span className="font-bold text-[11px] text-[#566270] text-right group-hover:text-white transition-colors">{total}</span>
    </div>
  );
};

export const ReliabilityGroup = ({ title, children }: any) => (
  <div className="mb-2">
    <div className="flex items-center gap-2 mb-1.5 px-1">
       <span className="text-[9px] font-bold text-[#566270] uppercase tracking-wider whitespace-nowrap">{title}</span>
       <div className="h-px bg-[#283039] flex-1"></div>
    </div>
    <div className="flex flex-col gap-0.5">
      {children}
    </div>
  </div>
);

export const ReliabilityRowSmall = ({ name, uptime, produced, active, resolved, status = 'good' }: any) => (
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

export const IncidentsBySquadWidget = () => (
  <div className="flex flex-col rounded-lg border border-[#3b4754] bg-[#1c232b] p-4 min-h-[480px] h-full shadow-lg">
    <div className="flex justify-between items-start mb-5">
      <div>
        <h3 className="text-white text-sm font-bold uppercase tracking-wide">Incidents by Squad</h3>
        <p className="text-[#9dabb9] text-[10px] mt-0.5">Last 30 Days • Criticality Distribution</p>
      </div>
      <div className="text-right">
        <span className="text-white text-xl font-bold">12</span>
        <span className="text-[#9dabb9] text-[10px] ml-1.5 font-bold uppercase tracking-tighter">Total</span>
      </div>
    </div>
    
    <div className="flex flex-col gap-1.5 mb-6">
      <StackedSquadBar label="Search" sev1={1} sev2={2} sev3={3} />
      <StackedSquadBar label="Checkout" sev1={1} sev2={1} sev3={1} />
      <StackedSquadBar label="Payments" sev1={2} sev2={0} sev3={0} />
      <StackedSquadBar label="Auth" sev1={0} sev2={1} sev3={0} />
      <StackedSquadBar label="Platform" sev1={0} sev2={0} sev3={0} />
      <StackedSquadBar label="Mobile" sev1={0} sev2={0} sev3={0} />
    </div>

    {/* Key Highlights - Expanded to fill space */}
    <div className="flex-1 flex flex-col bg-[#111418]/60 rounded-lg border border-[#283039] p-5 mb-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]">
       <div className="flex items-center gap-2 mb-3">
         <span className="material-symbols-outlined text-primary text-[20px]">lightbulb</span>
         <h4 className="text-[#9dabb9] text-[10px] font-bold uppercase tracking-widest">Key Performance Highlights</h4>
       </div>
       <div className="space-y-4">
         <div className="flex gap-3 items-start">
           <div className="size-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
           <p className="text-[12px] text-gray-300 leading-relaxed">
             <span className="text-white font-bold">Payments</span> squad accounts for <span className="text-red-400 font-bold">40%</span> of all critical incidents this week, primarily due to gateway latency.
           </p>
         </div>
         <div className="flex gap-3 items-start">
           <div className="size-1.5 rounded-full bg-green-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
           <p className="text-[12px] text-gray-300 leading-relaxed">
             <span className="text-white font-bold">Platform</span> & <span className="text-white font-bold">Mobile</span> squads have maintained a perfect <span className="text-green-400 font-bold">0 incident</span> record in the last 14 days.
           </p>
         </div>
         <div className="flex gap-3 items-start">
           <div className="size-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
           <p className="text-[12px] text-gray-300 leading-relaxed">
             <span className="text-white font-bold">Search</span> indexing performance has stabilized after the recent SEV2 resolution, with latencies down <span className="text-blue-400 font-bold">15%</span>.
           </p>
         </div>
       </div>
    </div>

    <div className="flex items-center justify-end gap-4 pt-3 border-t border-[#283039]">
        <LegendItem color="bg-red-500" label="Critical" />
        <LegendItem color="bg-orange-500" label="High" />
        <LegendItem color="bg-blue-600" label="Moderate" />
    </div>
  </div>
);

export const SystemReliabilityWidget = () => (
  <div className="flex flex-col rounded-lg border border-[#3b4754] bg-[#1c232b] p-4 min-h-[480px] h-full shadow-lg">
     <div className="mb-4 flex justify-between items-end">
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
      
      <div className="flex flex-col gap-1 overflow-y-auto pr-1 h-full max-h-[360px] custom-scrollbar">
        
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
);