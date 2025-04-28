import React, { useState } from 'react';
import Chat from './components/Chat';
import ContextUploader from './components/ContextUploader';
import ResetButton from './components/ResetButton';
import LoadingIndicator from './components/LoadingIndicator';
import { Message } from './components/ConversationHistory';
import { askJewbot } from './utils/openRouterApi';

const LOCAL_STORAGE_KEY = 'jewbot-associates-history';
const LOCAL_CONTEXT_KEY = 'jewbot-associates-context';
const JEWBOT_PROMPT = `
You are **Jewbot - Associates Edition**, the 5th partner of the Jewbot company. You are a smart, impartial, and strategic advisor built to help your 4 other partners resolve disagreements or make important decisions efficiently.  
You **do not take sides**: your goal is to **maximize the company's success** while **respecting fairness, logic, and Jewish ethical values**.

---

## 🎯 Mission:
- Analyze the arguments presented by each associate **objectively**.
- Identify strengths, weaknesses, and blind spots in the proposals.
- Suggest possible **compromises**, **solutions**, or **prioritizations**.
- If needed, highlight **long-term impacts** and **risks**.
- Always prioritize the **company's best interest**, not individual preferences.
- Ensure that **Jewish values (emet/truth, shalom/peace, derech eretz/respect)** are respected in the advice.

---

## 🛠️ Context Input:
- Current decision/problem
- Main options proposed (briefly summarized)
- Each associate's main arguments (if provided)
- Company's overall objectives (if available)

---

## 📜 CRITICAL RULES:
- **Neutrality**: Never favor one associate unless facts and strategy clearly justify it.
- **Clarity**: Provide structured, easy-to-understand recommendations.
- **Prioritization**: If there are multiple good options, clearly recommend the most strategically sound one, explaining why.
- **Respect**: Always keep a respectful, professional tone.
- **Realism**: Offer practical, achievable advice — no unrealistic idealism.
- **Ethical focus**: Always favor solutions aligned with Jewish ethical principles.

---

## ✍️ Output Structure:
1. **Summary of the Situation** (brief, fact-based)
2. **Strengths and Weaknesses of Each Option** (bullet points)
3. **Potential Risks/Benefits** (short list)
4. **Jewbot's Clear Recommendation** (**bold, take a position, and justify it**)
5. **Alternative or Backup Solution** (optional)
6. **Associates Conclusion** (encouraging team unity)

---

## 🧐 Language & Style:
- Always in **French** (always use informal tone 'tu' instead of 'vous').
- Clear, logical, friendly, and motivating.
- Concise but complete.
- No passive-aggressive comments.
- Remind them lightly that "divergent opinions are a strength when handled wisely."

---

## 📝 Additional instructions:
- Be as concise and precise as possible. Use short, impactful sentences. Avoid unnecessary details.
- At the end, always give your own clear solution: take a position (for or against the main options) and justify it.
- Do not stay neutral in the conclusion: make a recommendation and explain why.

---
## 📝 Token Limit:
- Your answer must fit within 1200 tokens maximum. If needed, summarize or omit less important details to stay within this limit.
`;
const REACT_APP_OPENROUTER_API_KEY = process.env.REACT_APP_OPENROUTER_API_KEY;
function App() {
  // Historique de la conversation (localStorage)
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  // Contexte structuré (localStorage)
  const [context, setContext] = useState<string>(() => {
    return localStorage.getItem(LOCAL_CONTEXT_KEY) || '';
  });
  // Chargement
  const [loading, setLoading] = useState(false);
  // Erreur
  const [error, setError] = useState<string | null>(null);

  // Reset complet
  const handleReset = () => {
    setMessages([]);
    setContext('');
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_CONTEXT_KEY);
    setError(null);
  };

  // Mise à jour de l'historique
  const handleNewMessage = async (msg: Message) => {
    setMessages(prev => {
      const updated = [...prev, msg];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    setError(null);
    setLoading(true);
    try {
      // Appel à l'API OpenRouter (si clé présente)
      if (!REACT_APP_OPENROUTER_API_KEY) {
        throw new Error('Clé API OpenRouter manquante.');
      }
      const assistantReply = await askJewbot({
        userMessage: msg.content,
        context,
        jewbotPrompt: JEWBOT_PROMPT,
        apiKey: REACT_APP_OPENROUTER_API_KEY,
      });
      setMessages(prev => {
        const updated = [...prev, { role: 'assistant' as const, content: assistantReply }];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (e: any) {
      setError(e.message || 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  // Mise à jour du contexte
  const handleContextChange = (ctx: string) => {
    setContext(ctx);
    localStorage.setItem(LOCAL_CONTEXT_KEY, ctx);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8" style={{background: 'none'}}>
      <header className="mb-10 text-center flex flex-col items-center justify-center">
        <img src="/logo.svg" alt="Logo Jewbot" style={{height:'64px', width:'auto', marginBottom:'12px'}} />
        <p className="text-[#1E0E62] text-lg mt-3 font-medium" style={{fontFamily:'Poppins, sans-serif', opacity:0.7}}>Assistant interne pour la prise de décision entre associés</p>
      </header>
      <main className="w-full max-w-2xl flex-1">
        <ContextUploader context={context} onContextChange={handleContextChange} />
        <div className="frosted p-6 flex flex-col justify-center items-center w-full shadow-xl transition-all duration-500">
          <Chat messages={messages} onSend={handleNewMessage} context={context} />
          {loading && <LoadingIndicator />}
          {error && <div className="text-red-600 mt-2 font-semibold animate-pulse">{error}</div>}
        </div>
        <ResetButton onReset={handleReset} />
      </main>
    </div>
  );
}

export default App;
