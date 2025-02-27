import { ChatMessage } from './chat.interface';

export interface ChatSession {
  sessionId: string;
  topic: string;
  messages: ChatMessage[];
}