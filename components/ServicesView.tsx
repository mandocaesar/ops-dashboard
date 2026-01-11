import React from 'react';

const ServiceCard = ({ name, region, status, latency, errorRate, uptime }: any) => (
  <div className="bg-[#1c232b] border border-[#3b4754] rounded-lg p-5 flex flex-col gap-4 hover:border-primary/50 transition-colors">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#283039] rounded-lg text-primary">
          <span className="material-symbols-outlined">dns</span>
        </div>
        <div>
          <h3 className="text-white font-semibold">{name}</h3>
          <p className="text-[#9dabb9] text-xs">{region}</p>
        </div>
      </div>
      <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium ${
        status === 'Operational' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
      }`}>
        <span className={`size-2 rounded-full ${status === 'Operational' ? 'bg-green-500' : 'bg-red-500'}`}></span>
        {status}
      </div>
    </div>
    
    <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-[#283039]">
      <div className="text-center">
        <p className="text-[#9dabb9] text-xs mb-1">Latency</p>
        <p className="text-white font-medium">{latency}</p>
      </div>
      <div className="text-center border-l border-[#283039]">
        <p className="text-[#9dabb9] text-xs mb-1">Error Rate</p>
        <p className={`${parseFloat(errorRate) > 1 ? 'text-red-500' : 'text-white'} font-medium`}>{errorRate}</p>
      </div>
      <div className="text-center border-l border-[#283039]">
        <p className="text-[#9dabb9] text-xs mb-1">Uptime</p>
        <p className="text-white font-medium">{uptime}</p>
      </div>
    </div>
    
    <div className="flex items-center justify-between text-xs">
      <span className="text-[#9dabb9]">Last deployed 2h ago</span>
      <button className="text-primary hover:text-primary-light">View Details</button>
    </div>
  </div>
);

export const ServicesView: React.FC = () => {
  return (
    <div className="p-6 lg:p-8 flex-1 overflow-y-auto bg-[#111418]">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-white text-xl font-bold mb-6">Service Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <ServiceCard name="Payments API" region="us-east-1" status="Operational" latency="45ms" errorRate="0.02%" uptime="99.99%" />
          <ServiceCard name="Auth Service" region="global" status="Operational" latency="12ms" errorRate="0.00%" uptime="100%" />
          <ServiceCard name="Search Indexer" region="us-west-2" status="Degraded" latency="850ms" errorRate="2.4%" uptime="99.5%" />
          <ServiceCard name="Frontend App" region="global" status="Operational" latency="120ms" errorRate="0.1%" uptime="99.9%" />
          <ServiceCard name="Notification Svc" region="eu-central-1" status="Operational" latency="65ms" errorRate="0.01%" uptime="99.95%" />
          <ServiceCard name="Inventory DB" region="us-east-1" status="Operational" latency="5ms" errorRate="0.00%" uptime="100%" />
        </div>
      </div>
    </div>
  );
};