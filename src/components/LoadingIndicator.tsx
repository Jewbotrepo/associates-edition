import React from 'react';

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center justify-center py-4 animate-fade-in">
    <div className="w-7 h-7 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin shadow-lg" style={{boxShadow:'0 2px 8px #b6c7e6cc'}} />
    <span className="ml-4 text-blue-700 font-semibold text-lg tracking-tight animate-pulse">Jewbot réfléchit…</span>
  </div>
);

export default LoadingIndicator; 