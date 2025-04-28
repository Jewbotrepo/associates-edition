import React, { useState } from 'react';
import ConversationHistory, { Message } from './ConversationHistory';

interface ChatProps {
  messages: Message[];
  onSend: (msg: Message) => void;
  context: string;
}

const Chat: React.FC<ChatProps> = ({ messages, onSend, context }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend({ role: 'user', content: input });
    setInput('');
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto mb-4 animate-fade-in">
        <ConversationHistory messages={messages} />
      </div>
      <form className="flex gap-1 sm:gap-2 items-end mt-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 bg-transparent rounded-3xl px-4 py-4 sm:px-7 sm:py-5 focus:outline-none focus:ring-2 focus:ring-[#1E75FF]/30 focus:bg-white/40 transition-all duration-300 text-sm sm:text-lg placeholder-gray-300 border-0 shadow-none text-[#1E0E62] font-medium min-w-0"
          placeholder="Écris ton message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
        />
        <button
          type="submit"
          className="px-4 py-4 sm:px-7 sm:py-5 rounded-3xl bg-[#1E75FF] text-white font-semibold text-sm sm:text-lg transition-all duration-150 hover:bg-[#1760cc] active:scale-98 focus:outline-none focus:ring-2 focus:ring-[#1E75FF]/40 disabled:opacity-30 disabled:cursor-not-allowed shadow-none border-0 flex-shrink-0"
          disabled={!input.trim()}
        >
          <span className="font-medium">Envoyer</span>
        </button>
      </form>
    </div>
  );
};

export default Chat; 