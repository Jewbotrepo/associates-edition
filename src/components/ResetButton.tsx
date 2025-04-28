import React from 'react';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
  <button
    onClick={onReset}
    className="mt-6 px-6 py-3 bg-gradient-to-r from-red-200 via-red-300 to-red-100 text-red-700 font-semibold rounded-xl shadow-md hover:from-red-300 hover:to-red-200 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
  >
    Réinitialiser la conversation
  </button>
);

export default ResetButton; 