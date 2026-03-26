import { buildApiHeaders } from './auth';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

export interface ChatRequest {
  gatewayUrl: string;
  token: string;
  messages: { role: string; content: string }[];
  onChunk?: (text: string) => void;
  signal?: AbortSignal;
}

export async function* streamChat(req: ChatRequest) {
  const url = `${req.gatewayUrl}/v1/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: buildApiHeaders(req.token),
    body: JSON.stringify({
      model: 'modelroute',
      messages: req.messages,
      stream: true,
    }),
    signal: req.signal,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API Error ${response.status}: ${error}`);
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;
          
          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              yield delta;
              req.onChunk?.(delta);
            }
          } catch {
            // Skip invalid JSON
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

export async function sendChat(
  gatewayUrl: string,
  token: string,
  messages: { role: string; content: string }[]
): Promise<string> {
  const url = `${gatewayUrl}/v1/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: buildApiHeaders(token),
    body: JSON.stringify({
      model: 'modelroute',
      messages,
      stream: false,
    }),
  });

  if (!response.ok) {
    throw new Error(`API Error ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}
