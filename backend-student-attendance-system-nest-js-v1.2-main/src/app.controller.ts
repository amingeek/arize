import { Controller, Post, Body } from '@nestjs/common';
import { AvalaiService } from './services/avalai.service';
import { SessionService } from './services/session.service';
import { UserResponseDto } from './dtos/user-response.dto';
import { StartSessionDto } from './dtos/start-session.dto';
import { ChatMessage } from './interfaces/chat.interface';
import { ChatSession } from './interfaces/chat-session.interface';

@Controller('api')
export class AppController {
  constructor(
    private readonly avalaiService: AvalaiService,
    private readonly sessionService: SessionService
  ) {}

  @Post('start')
  async startSession(@Body() { sessionId, topic }: StartSessionDto) {
    let session: ChatSession | undefined = await this.sessionService.getSession(sessionId);
    
    if (!session) {
      session = await this.sessionService.createSession(sessionId, topic);  // ایجاد جلسه جدید
    }

    // سوال اولیه برای تعیین موضوع
    const initialQuestion = "موضوع جلسه چیست؟";
    return { success: true, question: initialQuestion };
  }

  @Post('respond')
  async handleResponse(@Body() { sessionId, answer }: UserResponseDto) {
    let session: ChatSession | undefined = await this.sessionService.getSession(sessionId);
    
    if (!session) {
      throw new Error('جلسه مورد نظر یافت نشد');
    }

    const userMessage: ChatMessage = {
      role: 'user',
      content: answer
    };
    
    if (!session.topic) {
      session.topic = answer;  // ذخیره موضوع جلسه
      session.messages.push(userMessage);
      await this.sessionService.updateSession(sessionId, session);
      return { success: true, question: "چه اطلاعات دیگری در این جلسه نیاز دارید؟" };
    }

    // ذخیره پیام کاربر
    session.messages.push(userMessage);
    await this.sessionService.updateSession(sessionId, session);

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

      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };

      // ذخیره پاسخ هوش مصنوعی
      session.messages.push(aiMessage);
      await this.sessionService.updateSession(sessionId, session);

      if (isComplete) {
        const petition = response.replace('[PETITION]', '').trim();
        await this.sessionService.deleteSession(sessionId);
        return { success: true, petition };
      }

      return { success: true, question: response };
      
    } catch (error) {
      await this.sessionService.deleteSession(sessionId);
      throw error;
    }
  }
}