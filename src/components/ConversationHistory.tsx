import React from 'react';
import ReactMarkdown from 'react-markdown';
import { HiUserCircle, HiSparkles } from 'react-icons/hi';
import remarkGfm from 'remark-gfm';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ConversationHistoryProps {
  messages: Message[];
}

const markdownComponents: any = {
  h1: ({node, ...props}: any) => <h1 style={{fontSize:'1.25rem', fontWeight:600, color:'#1E0E62', margin:'0.8em 0 0.4em 0', fontFamily:'Poppins, sans-serif'}} {...props} />,
  h2: ({node, ...props}: any) => <h2 style={{fontSize:'1.1rem', fontWeight:600, color:'#1E0E62', margin:'0.7em 0 0.3em 0', fontFamily:'Poppins, sans-serif'}} {...props} />,
  h3: ({node, ...props}: any) => <h3 style={{fontSize:'1.0rem', fontWeight:500, color:'#1E0E62', margin:'0.6em 0 0.2em 0', fontFamily:'Poppins, sans-serif'}} {...props} />,
  strong: ({node, ...props}: any) => <strong style={{fontWeight:600, color:'#1E0E62'}} {...props} />,
  p: ({node, ...props}: any) => <p style={{margin:'0.2em 0', color:'#1E0E62', fontSize:'1rem', fontFamily:'Poppins, sans-serif', lineHeight:'1.6'}} {...props} />,
  ul: ({node, ...props}: any) => <ul style={{margin:'0.4em 0 0.4em 1.2em', color:'#1E0E62', fontFamily:'Poppins, sans-serif', fontSize:'1rem', lineHeight:'1.6', listStyle:'disc'}} {...props} />,
  ol: ({node, ...props}: any) => <ol style={{margin:'0.4em 0 0.4em 1.2em', color:'#1E0E62', fontFamily:'Poppins, sans-serif', fontSize:'1rem', lineHeight:'1.6', listStyle:'decimal'}} {...props} />,
  li: ({node, ...props}: any) => <li style={{margin:'0.1em 0'}} {...props} />,
  blockquote: ({node, ...props}: any) => <blockquote style={{borderLeft:'3px solid #1E75FF', margin:'0.5em 0', padding:'0.3em 1em', color:'#1E0E62', background:'#f6f8ff', borderRadius:'0.5em', fontStyle:'italic', fontSize:'0.95rem'}} {...props} />,
};

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
                : 'inline-block bg-white/40 text-[#1E0E62] px-8 py-5 rounded-3xl break-words text-left font-normal shadow-[0_2px_24px_0_rgba(31,38,135,0.06)] backdrop-blur-lg w-full'
            }
            style={{ whiteSpace: 'pre-line', transition: 'all 0.3s', border: 'none' }}
          >
            {msg.role === 'assistant' ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>{msg.content}</ReactMarkdown>
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