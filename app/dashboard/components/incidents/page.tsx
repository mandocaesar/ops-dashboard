import React, { useState } from 'react';
import { useIncidents } from '../../hooks/use-ops-data';

interface IncidentsViewProps {
  onJoinWarRoom: () => void;
}

const IncidentsPage: React.FC<IncidentsViewProps> = ({ onJoinWarRoom }) => {
  const { incidents, createIncident } = useIncidents();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newIncident, setNewIncident] = useState({
    title: '',
    severity: 'SEV3',
    service: 'Payments',
    assignee: '',
    source: 'Manual'
  });

  // RCA Modal State
  const [isRcaModalOpen, setIsRcaModalOpen] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [rcaDraft, setRcaDraft] = useState({
    rootCause: '',
    resolution: '',
    actionItems: ['']
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createIncident({
      title: newIncident.title,
      severity: newIncident.severity as any,
      service: newIncident.service,
      assignee: newIncident.assignee,
      source: newIncident.source
    });
    setIsModalOpen(false);
    setNewIncident({ title: '', severity: 'SEV3', service: 'Payments', assignee: '', source: 'Manual' });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getSourceIcon = (source: string = 'Manual') => {
    switch (source) {
      case 'PEGA Ticket': return 'confirmation_number';
      case 'Email': return 'mail';
      case 'WhatsApp Group': return 'chat';
      case 'Google Workspace': return 'work_alert';
      default: return 'edit_note';
    }
  };

  // RCA Handlers
  const handleOpenRcaDraft = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSelectedIncidentId(id);
    setRcaDraft({ rootCause: '', resolution: '', actionItems: [''] });
    setIsRcaModalOpen(true);
  };

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
    // In a real app, this would use an updateIncident API method
    alert("Saving RCA...");
    setIsRcaModalOpen(false);
  };

  return (
    <div className="p-6 lg:p-8 flex-1 overflow-y-auto bg-[#111418] relative">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
        
        {/* Filters & Actions */}
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-2 bg-[#1c232b] p-1 rounded-lg border border-[#3b4754]">
            <button className="px-4 py-1.5 rounded-md bg-[#283039] text-white text-sm font-medium shadow-sm">All</button>
            <button className="px-4 py-1.5 rounded-md text-[#9dabb9] hover:text-white text-sm font-medium">Active</button>
            <button className="px-4 py-1.5 rounded-md text-[#9dabb9] hover:text-white text-sm font-medium">Resolved</button>
          </div>
          
          <div className="flex gap-2 items-center">
             <div className="hidden md:flex gap-2">
                <select className="bg-[#1c232b] border border-[#3b4754] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-primary">
                  <option>Severity: All</option>
                  <option>SEV1</option>
                  <option>SEV2</option>
                </select>
                <select className="bg-[#1c232b] border border-[#3b4754] text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-primary">
                  <option>Service: All</option>
                  <option>Payments</option>
                  <option>Auth</option>
                </select>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ml-2 shadow-lg shadow-red-900/20"
            >
              <span className="material-symbols-outlined text-[18px]">add_alert</span>
              Declare Incident
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col gap-3">
          {incidents.map((inc) => {
            const isCritical = inc.severity === 'SEV1' || inc.severity === 'SEV2';
            const isExpanded = expandedId === inc.id;
            
            return (
              <div 
                key={inc.id} 
                onClick={() => toggleExpand(inc.id)}
                className={`bg-[#1c232b] border rounded-lg transition-all cursor-pointer group overflow-hidden ${
                  isExpanded ? 'border-primary/50 ring-1 ring-primary/20' : 'border-[#3b4754] hover:border-[#4b5563]'
                }`}
              >
                {/* Main Row */}
                <div className="p-4 flex items-center gap-4">
                  <div className={`w-1 h-8 rounded-full shrink-0 self-center ${
                    inc.severity === 'SEV1' ? 'bg-red-500' : 
                    inc.severity === 'SEV2' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold truncate text-sm">{inc.title}</span>
                      <span className="text-[#9dabb9] text-xs font-mono">{inc.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#9dabb9]">
                       <div className="flex items-center gap-1 text-xs">
                         <span className="material-symbols-outlined text-[14px]">{getSourceIcon(inc.source)}</span>
                         <span>{inc.source || 'Manual'}</span>
                       </div>
                       <span className="text-[#3b4754]">•</span>
                       <span>{inc.service}</span>
                       <span className="text-[#3b4754]">•</span>
                       <span>{inc.time}</span>
                       <span className="text-[#3b4754]">•</span>
                       <span>{inc.assignee}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 ml-auto">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        inc.severity === 'SEV1' ? 'bg-red-500/10 text-red-500' :
                        inc.severity === 'SEV2' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-blue-500/10 text-blue-500'
                      }`}>{inc.severity}</span>
                      
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border hidden sm:block ${
                        inc.status === 'Resolved' 
                          ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                          : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {inc.status}
                      </span>
                      
                      {isCritical && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); onJoinWarRoom(); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white shadow shadow-red-500/20 hover:shadow-red-500/40 transition-all text-xs font-bold whitespace-nowrap animate-pulse ml-2"
                        >
                          <span className="material-symbols-outlined text-[16px]">emergency_home</span>
                          Join War Room
                        </button>
                      )}

                      <span className={`material-symbols-outlined text-[#9dabb9] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                        expand_more
                      </span>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-[#3b4754] bg-[#111418]/50 p-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="md:col-span-2 space-y-4">
                        <div>
                           <h4 className="text-xs font-bold text-[#9dabb9] uppercase tracking-wider mb-2">Description</h4>
                           <p className="text-sm text-gray-300 leading-relaxed">{inc.description}</p>
                        </div>
                        <div>
                           <h4 className="text-xs font-bold text-[#9dabb9] uppercase tracking-wider mb-2">Resolution Steps</h4>
                           <div className="space-y-2">
                             {inc.steps?.map((step) => (
                               <div key={step.id} className="flex items-center gap-3 text-sm">
                                  {step.status === 'done' && <span className="material-symbols-outlined text-green-500 text-[18px]">check_circle</span>}
                                  {step.status === 'current' && <span className="size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>}
                                  {step.status === 'pending' && <span className="material-symbols-outlined text-[#3b4754] text-[18px]">radio_button_unchecked</span>}
                                  <span className={step.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-200'}>{step.text}</span>
                               </div>
                             ))}
                             {(!inc.steps || inc.steps.length === 0) && <p className="text-sm text-[#9dabb9] italic">No steps recorded.</p>}
                           </div>
                        </div>

                        {/* RCA Report Section */}
                        {inc.rca && (
                          <div className="mt-4 pt-4 border-t border-[#3b4754]/50">
                            <h4 className="text-xs font-bold text-[#9dabb9] uppercase tracking-wider mb-3 flex items-center gap-2">
                              <span className="material-symbols-outlined text-sm">assessment</span> 
                              RCA Report
                            </h4>
                            <div className="bg-[#1c232b] rounded-lg p-4 border border-[#3b4754]">
                               <div className="mb-3">
                                 <span className="text-xs text-[#9dabb9] font-bold block mb-1">ROOT CAUSE</span>
                                 <p className="text-sm text-gray-300">{inc.rca.rootCause}</p>
                               </div>
                               <div className="mb-3">
                                 <span className="text-xs text-[#9dabb9] font-bold block mb-1">RESOLUTION</span>
                                 <p className="text-sm text-gray-300">{inc.rca.resolution}</p>
                               </div>
                               <div>
                                 <span className="text-xs text-[#9dabb9] font-bold block mb-1">ACTION ITEMS</span>
                                 <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                   {inc.rca.actionItems.map((item: string, i: number) => <li key={i}>{item}</li>)}
                                 </ul>
                               </div>
                            </div>
                          </div>
                        )}
                        {!inc.rca && (
                          <div className="mt-4 pt-4 border-t border-[#3b4754]/50">
                             <button 
                               onClick={(e) => handleOpenRcaDraft(e, inc.id)}
                               className="flex items-center gap-2 text-primary hover:text-primary-light text-sm font-medium transition-colors"
                             >
                               <span className="material-symbols-outlined">add_circle</span>
                               Draft RCA Report
                             </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4 border-l border-[#3b4754] pl-6">
                        <div>
                          <h4 className="text-xs font-bold text-[#9dabb9] uppercase tracking-wider mb-2">Timeline</h4>
                          <div className="space-y-3 relative">
                            <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-[#283039]"></div>
                            <div className="flex gap-3 relative">
                              <div className="size-2.5 rounded-full bg-red-500 mt-1.5 shrink-0 ring-4 ring-[#111418]/50"></div>
                              <div>
                                <p className="text-xs text-[#9dabb9]">{inc.time}</p>
                                <p className="text-sm text-gray-300">Incident detected</p>
                              </div>
                            </div>
                             <div className="flex gap-3 relative">
                              <div className="size-2.5 rounded-full bg-[#3b4754] mt-1.5 shrink-0 ring-4 ring-[#111418]/50"></div>
                              <div>
                                <p className="text-xs text-[#9dabb9]">5m later</p>
                                <p className="text-sm text-gray-300">Assignee notified</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[#3b4754]">
                           <h4 className="text-xs font-bold text-[#9dabb9] uppercase tracking-wider mb-2">Source Info</h4>
                           <div className="flex items-center gap-3 p-3 bg-[#283039]/50 rounded border border-[#3b4754]">
                             <div className="p-2 bg-[#1c232b] rounded text-primary">
                               <span className="material-symbols-outlined text-[20px]">{getSourceIcon(inc.source)}</span>
                             </div>
                             <div>
                               <p className="text-sm text-white font-medium">{inc.source || 'Manual'}</p>
                               <p className="text-xs text-[#9dabb9]">{inc.sourceId || 'ID: N/A'}</p>
                             </div>
                           </div>
                        </div>
                        
                        <div className="pt-4 border-t border-[#3b4754]">
                          <div className="flex justify-between items-center">
                            <button className="text-xs font-medium text-primary hover:text-primary-light flex items-center gap-1">
                              View Full Timeline
                              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Create Incident Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c232b] border border-[#3b4754] rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-6 border-b border-[#3b4754] flex justify-between items-center bg-[#283039]/50">
               <h3 className="text-white text-lg font-bold">Declare New Incident</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-[#9dabb9] hover:text-white transition-colors">
                 <span className="material-symbols-outlined">close</span>
               </button>
             </div>
             <form onSubmit={handleCreate} className="p-6 flex flex-col gap-4">
                <div>
                   <label className="block text-xs font-bold text-[#9dabb9] mb-1.5 uppercase tracking-wider">Incident Title</label>
                   <input 
                      type="text" 
                      required
                      value={newIncident.title}
                      onChange={e => setNewIncident({...newIncident, title: e.target.value})}
                      placeholder="e.g. High latency on checkout..."
                      className="w-full bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#3b4754] transition-all"
                   />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9dabb9] mb-1.5 uppercase tracking-wider">Severity</label>
                    <div className="relative">
                      <select 
                        value={newIncident.severity}
                        onChange={e => setNewIncident({...newIncident, severity: e.target.value as any})}
                        className="w-full bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all"
                      >
                        <option value="SEV1">SEV1 (Critical)</option>
                        <option value="SEV2">SEV2 (High)</option>
                        <option value="SEV3">SEV3 (Moderate)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#9dabb9] pointer-events-none text-[20px]">expand_more</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9dabb9] mb-1.5 uppercase tracking-wider">Reported Via</label>
                    <div className="relative">
                      <select 
                        value={newIncident.source}
                        onChange={e => setNewIncident({...newIncident, source: e.target.value})}
                        className="w-full bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all"
                      >
                        <option value="Manual">Manual</option>
                        <option value="PEGA Ticket">PEGA Ticket</option>
                        <option value="Email">Email Report</option>
                        <option value="WhatsApp Group">WhatsApp Group</option>
                        <option value="Google Workspace">Google Workspace</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#9dabb9] pointer-events-none text-[20px]">expand_more</span>
                    </div>
                  </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-[#9dabb9] mb-1.5 uppercase tracking-wider">Service</label>
                   <div className="relative">
                      <select 
                        value={newIncident.service}
                        onChange={e => setNewIncident({...newIncident, service: e.target.value})}
                        className="w-full bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all"
                      >
                        <option value="Payments">Payments</option>
                        <option value="Search">Search</option>
                        <option value="Auth">Auth</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Database">Database</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-2.5 text-[#9dabb9] pointer-events-none text-[20px]">expand_more</span>
                    </div>
                </div>

                <div>
                   <label className="block text-xs font-bold text-[#9dabb9] mb-1.5 uppercase tracking-wider">Assignee</label>
                   <div className="relative">
                     <input 
                        type="text" 
                        value={newIncident.assignee}
                        onChange={e => setNewIncident({...newIncident, assignee: e.target.value})}
                        placeholder="Assign to..."
                        className="w-full bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-2.5 pl-10 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#3b4754] transition-all"
                     />
                     <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#3b4754]">person</span>
                   </div>
                </div>

                <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#3b4754]">
                   <button 
                     type="button" 
                     onClick={() => setIsModalOpen(false)}
                     className="px-4 py-2 rounded-lg text-sm font-medium text-[#9dabb9] hover:text-white hover:bg-[#283039] transition-colors"
                   >
                     Cancel
                   </button>
                   <button 
                     type="submit"
                     className="px-4 py-2 rounded-lg text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-colors shadow-lg shadow-red-900/20 flex items-center gap-2"
                   >
                     <span className="material-symbols-outlined text-[18px]">campaign</span>
                     Declare Incident
                   </button>
                </div>
             </form>
          </div>
        </div>
      )}

      {/* RCA Draft Modal (Reused from Dashboard but kept local for now for simplicity of this refactor) */}
      {isRcaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1c232b] border border-[#3b4754] rounded-lg shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-[#3b4754] flex justify-between items-center bg-[#283039]/50">
               <div>
                  <h3 className="text-white text-lg font-bold">Draft RCA Report</h3>
                  <p className="text-xs text-[#9dabb9]">ID: {selectedIncidentId}</p>
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
                    required
                 />
               </div>

               <div>
                 <label className="block text-xs font-bold text-[#9dabb9] mb-2 uppercase tracking-wider">Resolution</label>
                 <textarea 
                    value={rcaDraft.resolution}
                    onChange={(e) => setRcaDraft({...rcaDraft, resolution: e.target.value})}
                    placeholder="How was the incident resolved?"
                    className="w-full bg-[#111418] border border-[#3b4754] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-[#3b4754] transition-all min-h-[80px]"
                    required
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
                   Publish Report
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentsPage;