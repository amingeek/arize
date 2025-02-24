import { Controller, Post, Body } from '@nestjs/common';
import { AvalaiService } from './services/avalai.service';
import { SessionService } from './services/session.service';
import { StartSessionDto } from './dtos/start-session.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { ChatMessage } from './interfaces/chat.interface';

@Controller()
export class AppController {
  constructor(
    private readonly avalaiService: AvalaiService,
    private readonly sessionService: SessionService
  ) {}

  @Post('start')
  async startSession(@Body() { sessionId, topic }: StartSessionDto) {
    this.sessionService.createSession(sessionId, topic);
    return await this.handleAIResponse(sessionId);
  }

  @Post('respond')
  async handleResponse(@Body() { sessionId, answer }: UserResponseDto) {
    const session = await this.sessionService.getSession(sessionId);
    
    if (!session) {
      throw new Error('جلسه مورد نظر یافت نشد');
    }

    // ذخیره پاسخ کاربر
    const userMessage: ChatMessage = {
      role: 'user',
      content: answer
    };
    this.sessionService.updateSession(sessionId, userMessage);

    return await this.handleAIResponse(sessionId);
  }

  private async handleAIResponse(sessionId: string) {
    const session = await this.sessionService.getSession(sessionId);
    
    if (!session) {
      throw new Error('جلسه مورد نظر یافت نشد');
    }

    try {
      const { response, isComplete } = await this.avalaiService.generateResponse(
        session.messages,
        session.topic
      );

      // ذخیره پاسخ هوش مصنوعی
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };
      this.sessionService.updateSession(sessionId, aiMessage);

      if (isComplete) {
        const petition = response.replace('[PETITION]', '').trim();
        this.sessionService.deleteSession(sessionId);
        return { success: true, petition };
      }

      return { success: true, question: response };
      
    } catch (error) {
      this.sessionService.deleteSession(sessionId);
      throw error;
    }
  }
}