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
      <div className="flex-1 overflow-y-auto mb-4">
        <ConversationHistory messages={messages} />
      </div>
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Écrivez votre message..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={!input.trim()}
        >
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default Chat; 