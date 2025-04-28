import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationHistoryProps {
  messages: Message[];
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ messages }) => (
  <div className="space-y-8">
    {messages.length === 0 ? (
      <div className="text-gray-200 text-center italic">Aucun échange pour l'instant.</div>
    ) : (
      messages.map((msg, idx) => (
        <div
          key={idx}
          className={
            msg.role === 'user'
              ? 'flex justify-end animate-fade-in'
              : 'flex justify-start animate-fade-in'
          }
        >
          <div
            className={
              msg.role === 'user'
                ? 'inline-block bg-[#1E75FF] text-white px-8 py-5 rounded-3xl break-words text-right font-medium shadow-[0_2px_24px_0_rgba(31,38,135,0.06)] backdrop-blur-lg w-full'
                : 'inline-block bg-white/40 text-[#1E0E62] px-8 py-5 rounded-3xl break-words text-left font-normal shadow-[0_2px_24px_0_rgba(31,38,135,0.06)] backdrop-blur-lg w-full markdown-content'
            }
            style={{ whiteSpace: 'pre-line', transition: 'all 0.3s', border: 'none' }}
          >
            {msg.role === 'assistant' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
            ) : (
              msg.content
            )}
          </div>
        </div>
      ))
    )}
  </div>
);

export default ConversationHistory; 