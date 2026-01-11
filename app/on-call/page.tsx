import React from 'react';
import { useOnCall } from '../../hooks/use-ops-data';

const OnCallCard = ({ team, primary, secondary, nextRotation }: any) => (
  <div className="bg-[#1c232b] border border-[#3b4754] rounded-lg p-5">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-white font-semibold text-lg">{team}</h3>
      <button className="text-primary text-sm font-medium">View Schedule</button>
    </div>
    
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 text-xs font-bold text-primary uppercase tracking-wider text-right">Pri</div>
        <div className="flex items-center gap-3 flex-1 bg-[#283039] p-2 rounded-lg border border-[#3b4754]">
          <div className="size-8 rounded-full bg-cover" style={{backgroundImage: `url(${primary.avatarUrl})`}}></div>
          <div>
            <p className="text-white text-sm font-medium">{primary.name}</p>
            <p className="text-[#9dabb9] text-xs">Until {primary.until}</p>
          </div>
          <div className="ml-auto">
            <span className="material-symbols-outlined text-green-500 text-sm">phone_in_talk</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Sec</div>
        <div className="flex items-center gap-3 flex-1 bg-[#283039]/50 p-2 rounded-lg border border-[#3b4754] border-dashed">
          <div className="size-8 rounded-full bg-cover grayscale opacity-70" style={{backgroundImage: `url(${secondary.avatarUrl})`}}></div>
          <div>
            <p className="text-gray-300 text-sm font-medium">{secondary.name}</p>
            <p className="text-[#9dabb9] text-xs">Until {secondary.until}</p>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-[#283039]">
       <p className="text-[#9dabb9] text-xs flex items-center gap-2">
         <span className="material-symbols-outlined text-sm">update</span>
         Next rotation: <span className="text-white">{nextRotation}</span>
       </p>
    </div>
  </div>
);

const OnCallPage: React.FC = () => {
  const { shifts, loading } = useOnCall();

  return (
    <div className="p-6 lg:p-8 flex-1 overflow-y-auto bg-[#111418]">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-center mb-8">
           <h2 className="text-white text-xl font-bold">On-Call Schedules</h2>
           <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
             Override Schedule
           </button>
        </div>
        
        {loading ? (
          <p className="text-gray-500">Loading schedules...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shifts.map(shift => (
              <OnCallCard 
                key={shift.id}
                team={shift.team}
                primary={shift.primary}
                secondary={shift.secondary}
                nextRotation={shift.nextRotation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OnCallPage;