import React from 'react';

// --- Atomic UI Components ---

export const FilterSelect = ({ value }: { value: string }) => (
  <button className="flex items-center gap-1.5 px-2.5 py-1 bg-[#111418] hover:bg-[#283039] border border-[#3b4754] rounded text-[11px] font-medium text-gray-300 transition-colors">
    {value}
    <span className="material-symbols-outlined text-[14px]">expand_more</span>
  </button>
);

export const LegendItem = ({ color, label }: { color: string, label: string }) => (
  <div className="flex items-center gap-1.5 text-[9px] text-[#9dabb9] font-bold uppercase tracking-wider">
    <span className={`size-1.5 rounded-full ${color}`}></span> {label}
  </div>
);

export const MetricCard = ({ title, icon, value, subValue, subType, iconColor }: any) => (
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

export const IncidentRow = ({ id, service, serviceIcon, severity, status, statusColor, duration, assigneeUrl, assigneeUrl2, onJoinWarRoom }: any) => {
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