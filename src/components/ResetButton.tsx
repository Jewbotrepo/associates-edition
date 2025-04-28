import React from 'react';

interface ResetButtonProps {
  onReset: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onReset }) => (
  <button
    onClick={onReset}
    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
  >
    Réinitialiser la conversation
  </button>
);

export default ResetButton; 