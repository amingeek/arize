// gpt-interview.service.ts
import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

@Injectable()
export class GptInterviewerService {
  private readonly logger = new Logger(GptInterviewerService.name);
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.AVALAI_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1/chat/completions'
    });
  }

  private systemPrompt(topic: string): Message {
    return {
      role: 'system',
      content: `
        // محتوای سیستم پرامپت بدون تغییر باقی می‌ماند
        شما یک وکیل مجازی هوشمند هستید. وظیفه شما جمع‌آوری اطلاعات لازم برای تنظیم یک دادخواست حقوقی است.
        
        موضوع اصلی: ${topic}
        
        قوانین:
        1. در هر مرحله فقط یک سوال بپرسید
        2. سوالات باید به صورت منطقی و بر اساس پاسخ‌های قبلی کاربر توسعه یابد
        3. از اصطلاحات پیچیده حقوقی خودداری کنید
        4. وقتی اطلاعات کافی جمع‌آوری شد، متن کامل دادخواست را با علامت [PETITION] شروع کنید
        5. در صورت درخواست کاربر برای پایان، روند را قطع کنید
        6. از کلمات قوی و محکم در متن خود استفاده کنید و از قوانین مختلف نام ببرید
      `
    };
  }

  async conductInterview(
    messages: Message[],
    topic: string
  ): Promise<{ response: string; isComplete: boolean }> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'deepseek/deepseek-chat:free', // یا نام مدل مورد نظر آوالای
        messages: [this.systemPrompt(topic), ...messages],
        temperature: 0.7,
      });

      const aiResponse = completion.choices[0].message.content ?? '';
      return {
        response: aiResponse,
        isComplete: aiResponse.includes('[PETITION]')
      };
    } catch (error) {
      this.logger.error('خطا در ارتباط با API:', error.stack);
      throw new Error('خطا در ارتباط با سرویس تولید محتوا');
    }
  }
}