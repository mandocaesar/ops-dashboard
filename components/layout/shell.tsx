import React from 'react';
import { ViewState, User } from '../../lib/types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  currentUser: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, currentUser }) => {
  const navItems = [
    { view: ViewState.DASHBOARD, icon: 'dashboard', label: 'Dashboard' },
    { view: ViewState.INCIDENTS, icon: 'warning', label: 'Incidents' },
    { view: ViewState.WAR_ROOM, icon: 'emergency_home', label: 'War Room' },
    { view: ViewState.SERVICES, icon: 'dns', label: 'Services' },
    { view: ViewState.ON_CALL, icon: 'calendar_month', label: 'On-Call' },
    { view: ViewState.SETTINGS, icon: 'settings', label: 'Settings' },
  ];

  return (
    <aside className="flex w-64 flex-col bg-[#111418] border-r border-[#283039] shrink-0 h-screen transition-all duration-300 hidden md:flex">
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <span className="material-symbols-outlined text-xl">shield_lock</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white text-lg font-bold leading-none tracking-tight">OpsCommander</h1>
              <p className="text-[#9dabb9] text-xs font-normal mt-1">SRE Platform</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => setView(item.view)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group ${
                  currentView === item.view ? 'bg-primary/10 text-primary' : 'hover:bg-[#283039] text-[#9dabb9] hover:text-white'
                }`}
              >
                <span className={`material-symbols-outlined ${currentView === item.view ? 'text-primary' : 'text-[#9dabb9] group-hover:text-white'}`}>
                  {item.icon}
                </span>
                <p className="text-sm font-medium leading-normal">{item.label}</p>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-2 mt-auto border-t border-[#283039] pt-4 cursor-pointer hover:bg-[#283039] rounded-lg transition-colors">
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 ring-2 ring-[#283039]" 
            style={{ backgroundImage: `url("${currentUser.avatarUrl}")` }}
          />
          <div className="flex flex-col overflow-hidden">
            <p className="text-white text-sm font-medium leading-none truncate">{currentUser.name}</p>
            <p className="text-[#9dabb9] text-xs leading-none mt-1 truncate">{currentUser.role}</p>
          </div>
          <span className="material-symbols-outlined text-[#9dabb9] ml-auto text-sm">logout</span>
        </div>
      </div>
    </aside>
  );
};

export const Header: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283039] px-6 py-3 bg-[#111418] shrink-0">
      <div className="flex items-center gap-8 w-full max-w-2xl">
        <div className="flex items-center gap-4 text-white">
          <h2 className="text-white text-lg font-bold leading-tight">{title}</h2>
        </div>
        <div className="hidden md:flex w-full flex-1 items-stretch rounded-lg h-9 max-w-md">
          <div className="text-[#9dabb9] flex border-none bg-[#283039] items-center justify-center pl-4 rounded-l-lg border-r-0">
            <span className="material-symbols-outlined text-[18px]">search</span>
          </div>
          <input 
            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg rounded-l-none text-white focus:outline-0 border-none bg-[#283039] h-full placeholder:text-[#9dabb9] px-4 pl-2 text-xs" 
            placeholder="Search incidents, services, logs..." 
          />
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-3 items-center">
        {children}
        <button className="flex size-8 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#283039] hover:bg-[#3b4754] transition-colors text-white relative">
          <span className="material-symbols-outlined text-[18px]">notifications</span>
          <span className="absolute top-2 right-2 size-1.5 bg-red-500 rounded-full border border-[#283039]"></span>
        </button>
      </div>
    </header>
  );
};