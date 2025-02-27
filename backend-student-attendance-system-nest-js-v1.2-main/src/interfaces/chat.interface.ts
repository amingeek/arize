export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'; // اضافه کردن 'system'
  content: string;
}