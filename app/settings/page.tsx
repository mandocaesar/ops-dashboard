import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-8 flex-1 bg-[#111418] flex items-center justify-center text-[#9dabb9]">
      <div className="text-center">
        <span className="material-symbols-outlined text-6xl mb-4 opacity-20">settings_suggest</span>
        <p>Settings configuration not available in demo mode.</p>
      </div>
    </div>
  );
};

export default SettingsPage;