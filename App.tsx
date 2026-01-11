import React, { useState } from 'react';
import { ViewState, User } from './lib/types';
import { Sidebar, Header } from './components/layout/shell';

// Route Imports (Simulating Next.js pages)
import DashboardPage from './app/dashboard/page';
import WarRoomPage from './app/war-room/page';
import IncidentsPage from './app/incidents/page';
import ServicesPage from './app/services/page';
import OnCallPage from './app/on-call/page';
import SettingsPage from './app/settings/page';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Alex Mercer',
  role: 'Lead Site Reliability Engineer',
  avatarUrl: 'https://i.pravatar.cc/150?u=alex'
};

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD:
        return <DashboardPage onJoinWarRoom={() => setView(ViewState.WAR_ROOM)} />;
      case ViewState.WAR_ROOM:
        return <WarRoomPage />;
      case ViewState.INCIDENTS:
        return <IncidentsPage onJoinWarRoom={() => setView(ViewState.WAR_ROOM)} />;
      case ViewState.SERVICES:
        return <ServicesPage />;
      case ViewState.ON_CALL:
        return <OnCallPage />;
      case ViewState.SETTINGS:
        return <SettingsPage />;
      default:
        return <DashboardPage onJoinWarRoom={() => setView(ViewState.WAR_ROOM)} />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: return 'Overview';
      case ViewState.WAR_ROOM: return 'Active War Room: #INC-2049';
      case ViewState.INCIDENTS: return 'Incident Management';
      case ViewState.SERVICES: return 'Service Catalog';
      case ViewState.ON_CALL: return 'On-Call Schedule';
      case ViewState.SETTINGS: return 'Platform Settings';
      default: return 'OpsCommander';
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#111418]">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        currentUser={MOCK_USER} 
      />
      <div className="flex flex-1 flex-col h-screen overflow-hidden">
        <Header title={getTitle()}>
          {currentView === ViewState.DASHBOARD && (
             <button 
               className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-blue-900/20"
               onClick={() => setView(ViewState.INCIDENTS)}
             >
               Create Incident
             </button>
          )}
        </Header>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;