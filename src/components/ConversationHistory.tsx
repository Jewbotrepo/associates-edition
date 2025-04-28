import React from 'react';
import ReactMarkdown from 'react-markdown';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationHistoryProps {
  messages: Message[];
}

const ConversationHistory: React.FC<ConversationHistoryProps> = ({ messages }) => (
  <div className="space-y-4">
    {messages.length === 0 ? (
      <div className="text-gray-400 text-center">Aucun échange pour l'instant.</div>
    ) : (
      messages.map((msg, idx) => (
        <div
          key={idx}
          className={
            msg.role === 'user'
              ? 'text-right'
              : 'text-left'
          }
        >
          <div
            className={
              msg.role === 'user'
                ? 'inline-block bg-blue-100 text-blue-900 px-4 py-2 rounded-lg max-w-full break-words'
                : 'inline-block bg-gray-50 text-gray-900 px-4 py-2 rounded-lg max-w-full break-words text-left markdown-body'
            }
            style={{ whiteSpace: 'pre-line' }}
          >
            {msg.role === 'assistant' ? (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
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