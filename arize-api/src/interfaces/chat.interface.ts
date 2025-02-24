export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatSession {
  sessionId: string;
  topic: string;
  messages: ChatMessage[];
  createdAt: Date;
}