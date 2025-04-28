import React, { useState } from 'react';

interface ContextUploaderProps {
  context: string;
  onContextChange: (ctx: string) => void;
}

const ContextUploader: React.FC<ContextUploaderProps> = ({ context, onContextChange }) => {
  const [value, setValue] = useState(context);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onContextChange(e.target.value);
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-100">
      <h2 className="font-semibold text-blue-800 mb-2 text-lg">Contexte de la décision</h2>
      <textarea
        className="w-full min-h-[80px] border rounded p-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Décrivez le problème, les options, les arguments, les objectifs..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default ContextUploader; 