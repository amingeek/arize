import { Injectable } from '@nestjs/common';
import { ChatSession } from '../interfaces/chat-session.interface';

@Injectable()
export class SessionService {
  private sessions: ChatSession[] = [];

  async getSession(sessionId: string): Promise<ChatSession | undefined> {
    return this.sessions.find(session => session.sessionId === sessionId);
  }

  async createSession(sessionId: string, topic: string): Promise<ChatSession> {
    const newSession: ChatSession = {
      sessionId,
      topic,
      messages: []
    };
    this.sessions.push(newSession);
    return newSession;
  }

  async updateSession(sessionId: string, updatedSession: ChatSession): Promise<void> {
    const index = this.sessions.findIndex(session => session.sessionId === sessionId);
    if (index !== -1) {
      this.sessions[index] = updatedSession;
    } else {
      throw new Error('جلسه مورد نظر یافت نشد');
    }
  }

  async deleteSession(sessionId: string): Promise<void> {
    this.sessions = this.sessions.filter(session => session.sessionId !== sessionId);
  }
}