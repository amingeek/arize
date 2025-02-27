import { Injectable, Logger } from '@nestjs/common';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface Session {
  topic: string;
  messages: Message[];
  createdAt: Date;
}

@Injectable()
export class ConversationManagerService {
  private readonly logger = new Logger(ConversationManagerService.name);
  private sessions: Map<string, Session> = new Map();

  startNewSession(sessionId: string, topic: string): void {
    this.sessions.set(sessionId, {
      topic,
      messages: [],
      createdAt: new Date()
    });
    this.logger.log(`New session started: ${sessionId}`);
  }

  updateSession(sessionId: string, message: Message): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages.push(message);
    }
  }

  getSession(sessionId: string): Session | undefined {
    return this.sessions.get(sessionId);
  }

  endSession(sessionId: string): void {
    this.sessions.delete(sessionId);
    this.logger.log(`Session ended: ${sessionId}`);
  }
}