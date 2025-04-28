import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

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
    <div className="mb-8 p-5 bg-gradient-to-br from-blue-50/80 to-white/80 rounded-2xl border border-blue-100 shadow-md">
      <h2 className="font-semibold text-[#1E0E62] mb-2 text-lg">Contexte de la décision</h2>
      <TextareaAutosize
        className="w-full border border-blue-200 rounded-xl p-3 text-[#1E0E62] bg-white/70 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#1E75FF]/30 focus:bg-white/80 transition-all duration-300 text-base placeholder-gray-400 backdrop-blur-md resize-none"
        placeholder="Décris-moi le problème, les options, les arguments, les objectifs..."
        value={value}
        onChange={handleChange}
        minRows={3}
        maxRows={15}
      />
    </div>
  );
};

export default ContextUploader; 