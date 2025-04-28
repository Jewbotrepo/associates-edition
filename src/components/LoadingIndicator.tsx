import React from 'react';

const LoadingIndicator: React.FC = () => (
  <div className="flex items-center justify-center py-4">
    <div className="w-6 h-6 border-4 border-blue-300 border-t-blue-700 rounded-full animate-spin" />
    <span className="ml-3 text-blue-700 font-medium">Jewbot réfléchit…</span>
  </div>
);

export default LoadingIndicator; 