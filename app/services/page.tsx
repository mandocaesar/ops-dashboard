import React, { useState } from 'react';
import { useServices, useOnCall } from '../../hooks/use-ops-data';
import { Service, OnCallShift } from '../../lib/types';

const ServiceCard = ({ service, onClick }: { service: Service; onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="bg-[#1c232b] border border-[#3b4754] rounded-lg p-5 flex flex-col gap-4 hover:border-primary/50 cursor-pointer transition-all hover:translate-y-[-2px] hover:shadow-xl group"
  >
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#283039] rounded-lg text-primary group-hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined">dns</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">{service.name}</h3>
          <p className="text-[#9dabb9] text-xs">{service.region}</p>
        </div>
      </div>
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
        service.status === 'Operational' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
      }`}>
        <span className={`size-2 rounded-full ${service.status === 'Operational' ? 'bg-green-500' : 'bg-red-500'}`}></span>
        {service.status}
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-[#283039]">
      <div className="text-center">
        <p className="text-[#9dabb9] text-xs mb-1 uppercase font-bold tracking-tighter">Latency</p>
        <p className="text-white font-medium">{service.latency}</p>
      </div>
      <div className="text-center border-l border-[#283039]">
        <p className="text-[#9dabb9] text-xs mb-1 uppercase font-bold tracking-tighter">Errors</p>
        <p className={`${parseFloat(service.errorRate) > 1 ? 'text-red-500' : 'text-white'} font-medium`}>{service.errorRate}</p>
      </div>
      <div className="text-center border-l border-[#283039]">
        <p className="text-[#9dabb9] text-xs mb-1 uppercase font-bold tracking-tighter">Uptime</p>
        <p className="text-white font-medium">{service.uptime}</p>
      </div>
    </div>
    
    <div className="flex items-center justify-between text-xs">
      <span className="text-[#566270]">ID: {service.id}</span>
      <button className="text-primary font-bold hover:text-white transition-colors flex items-center gap-1">
        View Details
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </button>
    </div>
  </div>
);

const ServiceDetail = ({ service, team, onBack }: { service: Service; team?: OnCallShift; onBack: () => void }) => {
  return (
    <div className="max-w-[1200px] mx-auto animate-in fade-in slide-in-from-left-4 duration-300">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#9dabb9] hover:text-white transition-colors mb-6 group"
      >
        <span className="material-symbols-outlined group-hover:translate-x-[-2px] transition-transform">arrow_back</span>
        Back to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Stats & Meta */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#1c232b] border border-[#3b4754] rounded-xl p-8 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6">
               <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${
                 service.status === 'Operational' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
               }`}>
                 {service.status}
               </div>
             </div>
             
             <div className="flex items-center gap-5 mb-8">
                <div className="size-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-4xl">dns</span>
                </div>
                <div>
                   <h1 className="text-3xl font-black text-white tracking-tight">{service.name}</h1>
                   <p className="text-[#9dabb9] font-medium flex items-center gap-2">
                     <span className="material-symbols-outlined text-sm">public</span>
                     Deployed in {service.region} • v2.8.4-stable
                   </p>
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#111418] p-5 rounded-lg border border-[#3b4754]/50">
                   <p className="text-[#566270] text-[10px] font-bold uppercase tracking-widest mb-1">Latency (p99)</p>
                   <p className="text-white text-2xl font-black">{service.latency}</p>
                   <p className="text-green-500 text-[10px] font-bold mt-1">↓ 2.1% since yesterday</p>
                </div>
                <div className="bg-[#111418] p-5 rounded-lg border border-[#3b4754]/50">
                   <p className="text-[#566270] text-[10px] font-bold uppercase tracking-widest mb-1">Error Rate</p>
                   <p className="text-white text-2xl font-black">{service.errorRate}</p>
                   <p className="text-[#566270] text-[10px] font-bold mt-1">Within SLO threshold</p>
                </div>
                <div className="bg-[#111418] p-5 rounded-lg border border-[#3b4754]/50">
                   <p className="text-[#566270] text-[10px] font-bold uppercase tracking-widest mb-1">Availability</p>
                   <p className="text-white text-2xl font-black">{service.uptime}</p>
                   <p className="text-[#9dabb9] text-[10px] font-bold mt-1">Rolling 30 day avg</p>
                </div>
             </div>
          </div>

          <div className="bg-[#1c232b] border border-[#3b4754] rounded-xl p-6">
             <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Service Description</h3>
             <p className="text-gray-400 text-sm leading-relaxed">
               Core backend microservice responsible for processing real-time transactions, handling webhook callbacks, and maintaining the financial audit ledger. 
               Built with high availability in mind, this service utilizes multi-region replication and circuit breakers for downstream dependencies.
             </p>
             <div className="flex gap-2 mt-6">
                {['gRPC', 'PostgreSQL', 'Redis', 'Kafka'].map(tag => (
                  <span key={tag} className="px-2.5 py-1 bg-[#283039] text-[#9dabb9] text-[10px] font-bold rounded border border-[#3b4754]">{tag}</span>
                ))}
             </div>
          </div>
        </div>

        {/* Right Column: Ownership & On-Call */}
        <div className="space-y-6">
           {/* Team Ownership Card */}
           <div className="bg-[#1c232b] border border-[#3b4754] rounded-xl overflow-hidden shadow-xl">
              <div className="bg-[#283039] px-6 py-4 border-b border-[#3b4754]">
                <h3 className="text-white font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">groups</span>
                  Team Ownership
                </h3>
              </div>
              <div className="p-6">
                {team ? (
                  <div className="space-y-6">
                    <div>
                       <p className="text-primary font-black text-xl mb-1">{team.team}</p>
                       <p className="text-[#566270] text-xs font-medium">Reporting to Infrastructure Engineering</p>
                    </div>

                    <div className="space-y-4">
                       <div>
                          <p className="text-[#566270] text-[10px] font-bold uppercase tracking-wider mb-2">Active Primary</p>
                          <div className="flex items-center gap-3 bg-[#111418] p-3 rounded-lg border border-[#3b4754]/50">
                             <div className="size-10 rounded-full bg-cover ring-2 ring-primary ring-offset-2 ring-offset-[#111418]" style={{backgroundImage: `url(${team.primary.avatarUrl})`}}></div>
                             <div className="flex-1 overflow-hidden">
                               <p className="text-white text-sm font-bold truncate">{team.primary.name}</p>
                               <p className="text-[#566270] text-[10px] font-medium truncate">Until {team.primary.until}</p>
                             </div>
                             <button className="p-2 bg-green-500/10 text-green-500 rounded hover:bg-green-500 hover:text-white transition-colors">
                               <span className="material-symbols-outlined text-sm">call</span>
                             </button>
                          </div>
                       </div>

                       <div>
                          <p className="text-[#566270] text-[10px] font-bold uppercase tracking-wider mb-2">Active Secondary</p>
                          <div className="flex items-center gap-3 bg-[#111418]/50 p-3 rounded-lg border border-[#3b4754]/30 border-dashed">
                             <div className="size-10 rounded-full bg-cover grayscale opacity-50" style={{backgroundImage: `url(${team.secondary.avatarUrl})`}}></div>
                             <div className="flex-1 overflow-hidden">
                               <p className="text-gray-400 text-sm font-bold truncate">{team.secondary.name}</p>
                               <p className="text-[#566270] text-[10px] font-medium truncate">Shadow rotation</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="pt-4 border-t border-[#3b4754]">
                       <button className="w-full py-2 bg-[#283039] hover:bg-[#3b4754] text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-2">
                         <span className="material-symbols-outlined text-sm">event_note</span>
                         View Team Schedule
                       </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[#566270] italic text-sm">No ownership data available.</p>
                )}
              </div>
           </div>

           {/* Quick Actions */}
           <div className="bg-[#1c232b] border border-[#3b4754] rounded-xl p-6">
              <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4">Operations</h3>
              <div className="grid grid-cols-1 gap-2">
                 <button className="flex items-center gap-3 p-3 bg-[#111418] hover:bg-red-500/10 hover:border-red-500/30 border border-[#3b4754] rounded-lg transition-all group">
                    <span className="material-symbols-outlined text-red-500 group-hover:scale-110 transition-transform">report</span>
                    <span className="text-white text-xs font-bold">Declare Incident for Service</span>
                 </button>
                 <button className="flex items-center gap-3 p-3 bg-[#111418] hover:bg-primary/10 hover:border-primary/30 border border-[#3b4754] rounded-lg transition-all">
                    <span className="material-symbols-outlined text-primary">analytics</span>
                    <span className="text-white text-xs font-bold">View Service Metrics</span>
                 </button>
                 <button className="flex items-center gap-3 p-3 bg-[#111418] hover:bg-primary/10 hover:border-primary/30 border border-[#3b4754] rounded-lg transition-all">
                    <span className="material-symbols-outlined text-primary">history</span>
                    <span className="text-white text-xs font-bold">Deployment History</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage: React.FC = () => {
  const { services, loading } = useServices();
  const { shifts } = useOnCall();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = services.find(s => s.id === selectedServiceId);
  const ownerTeam = shifts.find(shift => shift.id === selectedService?.ownerTeamId);

  return (
    <div className="p-6 lg:p-8 flex-1 overflow-y-auto bg-[#111418]">
      {selectedService ? (
        <ServiceDetail 
          service={selectedService} 
          team={ownerTeam}
          onBack={() => setSelectedServiceId(null)} 
        />
      ) : (
        <div className="max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-white text-2xl font-black tracking-tight">Service Catalog</h2>
              <p className="text-[#566270] text-sm font-medium mt-1">Real-time health monitoring for all platform microservices.</p>
            </div>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-[#1c232b] border border-[#3b4754] text-white text-sm font-bold rounded-lg hover:bg-[#283039] transition-colors flex items-center gap-2">
                 <span className="material-symbols-outlined text-sm">filter_alt</span>
                 Filter
               </button>
               <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20">
                 <span className="material-symbols-outlined text-sm">add</span>
                 Register Service
               </button>
            </div>
          </div>
          
          {loading ? (
             <div className="flex flex-col items-center justify-center h-64 text-[#566270]">
                <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold text-sm">Analyzing Catalog Integrity...</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
              {services.map(s => (
                <ServiceCard 
                  key={s.id} 
                  service={s}
                  onClick={() => setSelectedServiceId(s.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesPage;