export async function askJewbot({
  userMessage,
  context,
  jewbotPrompt,
  apiKey,
}: {
  userMessage: string;
  context: string;
  jewbotPrompt: string;
  apiKey: string;
}): Promise<string> {
  // Injection du prompt Jewbot et du contexte avant la question utilisateur
  const fullPrompt = `${jewbotPrompt}\n\nCONTEXTE:\n${context}\n\nQUESTION:\n${userMessage}`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'openai/gpt-4.1',
      messages: [
        { role: 'system', content: jewbotPrompt },
        { role: 'user', content: fullPrompt },
      ],
      max_tokens: 1200,
      temperature: 0.4,
    }),
    
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Erreur HTTP OpenRouter:', response.status, errorText);
    throw new Error('Erreur lors de la requête à Jewbot');
  }
  const data = await response.json();
  console.log('Réponse OpenRouter:', data);
  if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
    console.error('Réponse inattendue du LLM:', data);
    throw new Error('Réponse inattendue du LLM (pas de contenu généré)');
  }
  return data.choices[0].message.content;
} 