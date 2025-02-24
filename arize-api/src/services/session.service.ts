import { Injectable, Logger, Inject } from '@nestjs/common';
import { ChatSession, ChatMessage } from '../interfaces/chat.interface';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class SessionService {
  private readonly logger = new Logger(SessionService.name);
  private readonly SESSION_TTL = 86400; // 24 ساعت

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async createSession(sessionId: string, topic: string): Promise<void> {
    const session: ChatSession = {
      sessionId,
      topic,
      messages: [],
      createdAt: new Date(),
    };
    await this.cacheManager.set(sessionId, session, this.SESSION_TTL);
    this.logger.log(`Session created: ${sessionId}`);
  }

  async getSession(sessionId: string): Promise<ChatSession | undefined> {
    const session = await this.cacheManager.get<ChatSession>(sessionId);
    return session ?? undefined;
  }

  async updateSession(sessionId: string, message: ChatMessage): Promise<void> {
    const session = await this.getSession(sessionId);
    if (session) {
      session.messages.push(message);
      await this.cacheManager.set(sessionId, session, this.SESSION_TTL);
    }
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.cacheManager.del(sessionId);
    this.logger.log(`Session deleted: ${sessionId}`);
  }
}