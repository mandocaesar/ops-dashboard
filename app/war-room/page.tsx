import React, { useState } from 'react';

const ChatMessage = ({ author, time, content, isBot, isSelf, avatar }: any) => (
  <div className={`flex gap-3 ${isSelf ? 'flex-row-reverse' : ''}`}>
    {!isBot && !isSelf && (
      <div className="size-8 rounded-full bg-cover shrink-0" style={{backgroundImage: `url(${avatar})`}} />
    )}
    {isBot && (
      <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary">
        <span className="material-symbols-outlined text-sm">smart_toy</span>
      </div>
    )}
    <div className={`flex flex-col max-w-[85%] ${isSelf ? 'items-end' : 'items-start'}`}>
      <div className="flex items-baseline gap-2 mb-1">
        <span className="text-xs font-bold text-white">{author}</span>
        <span className="text-[10px] text-text-secondary">{time}</span>
      </div>
      <div className={`p-3 rounded-lg text-sm ${
        isSelf ? 'bg-primary text-white' : 
        isBot ? 'bg-surface-dark border border-border-dark text-gray-200' : 
        'bg-[#283039] text-gray-200'
      }`}>
        {content}
      </div>
    </div>
  </div>
);

const WarRoomPage: React.FC = () => {
  const [isRcaModalOpen, setIsRcaModalOpen] = useState(false);
  const [rcaDraft, setRcaDraft] = useState({
    rootCause: '',
    resolution: '',
    actionItems: ['']
  });

  const handleAddActionItem = () => {
    setRcaDraft({ ...rcaDraft, actionItems: [...rcaDraft.actionItems, ''] });
  };

  const handleActionItemChange = (index: number, value: string) => {
    const newItems = [...rcaDraft.actionItems];
    newItems[index] = value;
    setRcaDraft({ ...rcaDraft, actionItems: newItems });
  };

  const handleSaveRca = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRcaModalOpen(false);
    // In a real app, this would save to backend
    alert('RCA Draft Saved!');
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-background-dark h-[calc(100vh-73px)]">
      {/* Left Chat Pane */}
      <aside className="w-[340px] flex flex-col border-r border-border-dark bg-[#111418] shrink-0 z-10 hidden xl:flex">
        <div className="flex border-b border-border-dark">
          <button className="flex-1 py-3 text-sm font-medium text-primary border-b-2 border-primary bg-primary/5">Chat</button>
          <button className="flex-1 py-3 text-sm font-medium text-text-secondary hover:text-white">Logs</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          <ChatMessage 
            author="PagerDuty Bot" time="09:41 AM" isBot 
            content={<><span className="font-bold">New Alert:</span> High Latency on <span className="font-mono text-xs bg-black/30 px-1 rounded text-danger">us-east-1</span> payments-api</>} 
          />
          <ChatMessage 
            author="Sarah Chen" time="09:43 AM" avatar="https://i.pravatar.cc/150?u=sarah"
            content="I'm seeing 503 errors correlating with the last canary deployment."
          />
          <ChatMessage 
            author="You" time="09:44 AM" isSelf 
            content="I'm rolling back the canary now. Checking ELB logs."
          />
          <ChatMessage 
            author="Mike Ross" time="09:45 AM" avatar="https://i.pravatar.cc/150?u=mike"
            content="Database CPU is spiking. It might be a connection storm from the retries."
          />
        </div>
        <div className="p-4 border-t border-border-dark bg-[#111418]">
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-[#1c232b] border border-border-dark rounded-md px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
            />
            <button className="p-2 bg-[#1c232b] hover:bg-[#2d3845] border border-border-dark rounded-md text-text-secondary">
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
            <button className="p-2 bg-primary hover:bg-primary-dark rounded-md text-white">
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Stage */}
      <main className="flex-1 flex flex-col relative bg-black">
        {/* Video Grid */}
        <div className="flex-1 p-4 grid grid-cols-2 grid-rows-2 gap-4">
          {/* Main shared screen */}
          <div className="col-span-2 row-span-2 relative bg-[#1c232b] rounded-lg overflow-hidden border border-border-dark group">
            <div className="absolute inset-0 flex items-center justify-center">
               <img src="https://raw.githubusercontent.com/grafana/grafana/main/public/img/grafana_icon.svg" className="opacity-10 w-32 h-32" />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                   <p className="text-text-secondary font-mono text-sm">Sharing: Datadog Dashboard / Payments Overview</p>
                   {/* Mock Graph */}
                   <div className="flex items-end gap-1 h-32 w-96 mt-4 mx-auto opacity-50">
                      {[40, 60, 45, 70, 80, 100, 90, 60, 50, 40, 30, 80, 90, 100, 120, 100, 80, 60, 40].map((h, i) => (
                        <div key={i} style={{height: `${h/1.5}%`}} className="flex-1 bg-red-500 rounded-t-sm"></div>
                      ))}
                   </div>
                 </div>
               </div>
            </div>
            <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-xs text-white flex items-center gap-2">
              <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
              Sarah Chen (Sharing)
            </div>
          </div>
        </div>

        {/* Floating Self View & Others */}
        <div className="absolute bottom-20 right-4 flex gap-4">
           <div className="w-48 aspect-video bg-[#283039] rounded-lg border border-border-dark overflow-hidden relative shadow-xl">
             <img src="https://i.pravatar.cc/150?u=mike" className="w-full h-full object-cover opacity-80" />
             <div className="absolute bottom-2 left-2 text-xs font-medium text-white shadow-black drop-shadow-md">Mike Ross</div>
           </div>
           <div className="w-48 aspect-video bg-[#283039] rounded-lg border border-border-dark overflow-hidden relative shadow-xl">
             <div className="w-full h-full bg-gray-800 flex items-center justify-center">
               <span className="material-symbols-outlined text-4xl text-gray-600">person</span>
             </div>
             <div className="absolute bottom-2 left-2 text-xs font-medium text-white shadow-black drop-shadow-md">You</div>
             <div className="absolute top-2 right-2 bg-red-500 p-1 rounded-full">
               <span className="material-symbols-outlined text-[12px] text-white block">mic_off</span>
             </div>
           </div>
        </div>

        {/* Bottom Controls */}
        <div className="h-16 bg-[#111418] border-t border-border-dark flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-xs font-bold uppercase tracking-wider">
              <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
              Live Incident
            </span>
            <span className="text-white font-medium text-sm">#INC-2049: Payments Latency Spike</span>
            <span className="text-text-secondary text-sm">00:42:15</span>
          </div>

          <div className="flex items-center gap-2">
            <button className="size-10 rounded-full bg-[#283039] hover:bg-[#3b4754] text-white flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px]">mic</span>
            </button>
            <button className="size-10 rounded-full bg-[#283039] hover:bg-[#3b4754] text-white flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px]">videocam</span>
            </button>
            <button className="size-10 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-colors">
              <span className="material-symbols-outlined text-[20px]">present_to_all</span>
            </button>
            <button className="h-10 px-6 ml-4 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors">
              Leave Room
            </button>
          </div>

          <div className="flex items-center gap-2">
             <button className="p-2 text-text-secondary hover:text-white"><span className="material-symbols-outlined">group</span></button>
             <button className="p-2 text-text-secondary hover:text-white"><span className="material-symbols-outlined">info</span></button>
          </div>
        </div>
      </main>

      {/* Right Actions Pane */}
      <aside className="w-80 border-l border-border-dark bg-[#111418] flex flex-col shrink-0 hidden 2xl:flex">
        <div className="p-4 border-b border-border-dark">
          <h3 className="text-white font-semibold mb-1">Incident Actions</h3>
          <p className="text-xs text-text-secondary">Execute predefined runbooks</p>
        </div>
        <div className="p-4 flex flex-col gap-3">
          <button className="flex items-center gap-3 p-3 rounded-lg border border-border-dark bg-[#1c232b] hover:bg-[#283039] transition-colors text-left group">
            <div className="p-2 rounded bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">restart_alt</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Rollback Deployment</p>
              <p className="text-[10px] text-text-secondary">Revert to v2.4.0</p>
            </div>
          </button>
          
          <button className="flex items-center gap-3 p-3 rounded-lg border border-border-dark bg-[#1c232b] hover:bg-[#283039] transition-colors text-left group">
            <div className="p-2 rounded bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">dns</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Flush Cache</p>
              <p className="text-[10px] text-text-secondary">Redis Cluster A</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-3 rounded-lg border border-border-dark bg-[#1c232b] hover:bg-[#283039] transition-colors text-left group">
            <div className="p-2 rounded bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">notifications_active</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Escalate Incident</p>
              <p className="text-[10px] text-text-secondary">Page Engineering Manager</p>
            </div>
          </button>

          {/* New Draft RCA Button */}
          <button 
             onClick={() => setIsRcaModalOpen(true)}
             className="flex items-center gap-3 p-3 rounded-lg border border-border-dark bg-[#1c232b] hover:bg-[#283039] transition-colors text-left group mt-4 border-t border-t-[#283039]"
          >
            <div className="p-2 rounded bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
              <span className="material-symbols-outlined">assessment</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Draft RCA</p>
              <p className="text-[10px] text-text-secondary">Prepare Post-Mortem</p>
            </div>
          </button>

        </div>

        <div className="mt-auto border-t border-border-dark p-4">
           <h3 className="text-white font-semibold mb-3 text-sm">Timeline</h3>
           <div className="relative pl-4 border-l border-[#283039] space-y-4">
             <div className="relative">
               <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-red-500 ring-4 ring-[#111418]"></div>
               <p className="text-xs text-text-secondary">09:40 AM</p>
               <p className="text-sm text-white">Incident Declared (SEV1)</p>
             </div>
             <div className="relative">
               <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-[#3b4754] ring-4 ring-[#111418]"></div>
               <p className="text-xs text-text-secondary">09:42 AM</p>
               <p className="text-sm text-white">War Room Created</p>
             </div>
             <div className="relative">
               <div className="absolute -left-[21px] top-1 size-2.5 rounded-full bg-[#3b4754] ring-4 ring-[#111418]"></div>
               <p className="text-xs text-text-secondary">09:45 AM</p>
               <p className="text-sm text-white">Rollback Initiated</p>
             </div>
           </div>
        </div>
      </aside>

      {/* RCA Modal */}
      {isRcaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c232b] border border-[#3b4754] rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[#3b4754] flex justify-between items-center bg-[#283039]/50">
               <div>
                  <h3 className="text-white text-lg font-bold">Draft RCA Report</h3>
                  <p className="text-xs text-[#9dabb9]">Live Incident: #INC-2049</p>
               </div>
               <button onClick={() => setIsRcaModalOpen(false)} className="text-[#9dabb9] hover:text-white transition-colors">
                 <span className="material-symbols-outlined">close</span>
               </button>
             </div>
             
             <form onSubmit={handleSaveRca} className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
               <div>
                 <label className="block text-xs font-bold text-[#9dabb9] mb-2 uppercase tracking-wider">Root Cause Analysis</label>
                 <textarea 
                    value={rcaDraft.rootCause}
                    onChange={(e) => setRcaDraft({...rcaDraft, rootCause: e.target.value})}
                    placeholder="Describe the fundamental reason for the incident..."
                    className="w-full bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#3b4754] transition-all min-h-[100px]"
                 />
               </div>

               <div>
                 <label className="block text-xs font-bold text-[#9dabb9] mb-2 uppercase tracking-wider">Resolution</label>
                 <textarea 
                    value={rcaDraft.resolution}
                    onChange={(e) => setRcaDraft({...rcaDraft, resolution: e.target.value})}
                    placeholder="How was the incident resolved?"
                    className="w-full bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#3b4754] transition-all min-h-[80px]"
                 />
               </div>

               <div>
                 <label className="block text-xs font-bold text-[#9dabb9] mb-2 uppercase tracking-wider">Action Items</label>
                 <div className="flex flex-col gap-3">
                   {rcaDraft.actionItems.map((item, idx) => (
                     <div key={idx} className="flex gap-2">
                       <input 
                          type="text"
                          value={item}
                          onChange={(e) => handleActionItemChange(idx, e.target.value)}
                          placeholder={`Action item #${idx + 1}`}
                          className="flex-1 bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#3b4754] transition-all"
                       />
                     </div>
                   ))}
                   <button 
                     type="button"
                     onClick={handleAddActionItem}
                     className="self-start text-xs font-bold text-primary hover:text-primary-light flex items-center gap-1 mt-1"
                   >
                     <span className="material-symbols-outlined text-[16px]">add</span>
                     Add Action Item
                   </button>
                 </div>
               </div>
             </form>

             <div className="p-6 border-t border-[#3b4754] flex justify-end gap-3 bg-[#283039]/30">
                 <button 
                   onClick={() => setIsRcaModalOpen(false)}
                   className="px-4 py-2 rounded-lg text-sm font-medium text-[#9dabb9] hover:text-white hover:bg-[#283039] transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={handleSaveRca}
                   className="px-4 py-2 rounded-lg text-sm font-bold bg-primary hover:bg-primary-dark text-white transition-colors shadow-lg shadow-blue-900/20 flex items-center gap-2"
                 >
                   <span className="material-symbols-outlined text-[18px]">save</span>
                   Save Draft
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarRoomPage;