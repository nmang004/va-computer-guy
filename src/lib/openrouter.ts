export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp?: number;
}

export interface ChatResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface StreamResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    delta: {
      role?: string;
      content?: string;
    };
    finish_reason?: string;
  }[];
}

class OpenRouterClient {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1';
  private primaryModel: string;
  private fallbackModel: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    this.primaryModel = process.env.NEXT_PUBLIC_CHAT_MODEL || 'qwen/qwen3-30b-a3b-instruct-2507';
    this.fallbackModel = process.env.NEXT_PUBLIC_CHAT_FALLBACK_MODEL || 'openai/gpt-4o-mini';
    
    if (!this.apiKey) {
      throw new Error('OPENROUTER_API_KEY environment variable is required');
    }
  }

  private async makeRequest(
    endpoint: string,
    method: string = 'POST',
    body?: unknown
  ): Promise<Response> {
    const headers: HeadersInit = {
      'Authorization': `Bearer ${this.apiKey}`,
      'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://vacomputerguy.com',
      'X-Title': 'VA Computer Guy',
      'Content-Type': 'application/json',
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
    }

    return response;
  }

  async chat(
    messages: ChatMessage[],
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      stream?: boolean;
    } = {}
  ): Promise<ChatResponse | ReadableStream> {
    const {
      model = this.primaryModel,
      temperature = 0.7,
      maxTokens = 2000,
      stream = false,
    } = options;

    const requestBody = {
      model,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature,
      max_tokens: maxTokens,
      stream,
      // Add safety settings
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };

    try {
      const response = await this.makeRequest('/chat/completions', 'POST', requestBody);
      
      if (stream) {
        return response.body!;
      } else {
        return await response.json() as ChatResponse;
      }
    } catch (error) {
      // Try fallback model if primary fails
      if (model === this.primaryModel && model !== this.fallbackModel) {
        console.warn(`Primary model ${model} failed, trying fallback ${this.fallbackModel}:`, error);
        return this.chat(messages, { ...options, model: this.fallbackModel });
      }
      throw error;
    }
  }

  async chatStream(
    messages: ChatMessage[],
    onChunk: (content: string) => void,
    onComplete: () => void,
    onError: (error: Error) => void,
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    } = {}
  ): Promise<void> {
    try {
      const stream = await this.chat(messages, { ...options, stream: true }) as ReadableStream;
      const reader = stream.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          onComplete();
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            
            if (data === '[DONE]') {
              onComplete();
              return;
            }

            try {
              const parsed: StreamResponse = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content;
              
              if (content) {
                onChunk(content);
              }
            } catch (parseError) {
              console.warn('Failed to parse stream chunk:', parseError);
            }
          }
        }
      }
    } catch (error) {
      onError(error as Error);
    }
  }

  async getModels(): Promise<unknown[]> {
    try {
      const response = await this.makeRequest('/models', 'GET');
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }

  isConfigured(): boolean {
    return !!this.apiKey;
  }
}

export const openrouter = new OpenRouterClient();