import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatMessage } from '../interfaces/chat.interface';

@Injectable()
export class AvalaiService {
  private readonly logger = new Logger(AvalaiService.name);
  private readonly client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.AVALAI_API_KEY, // مطمئن شوید که این متغیر محیطی تنظیم شده است
      baseURL: 'https://openrouter.ai/api/v1', // آدرس پایه OpenRouter
      timeout: 60000, // افزایش زمان انتظار
    });
  }

  async generateResponse(
    messages: ChatMessage[],
    topic: string
  ): Promise<{ response: string; isComplete: boolean }> {
    try {
      const systemMessage: ChatMessage = {
        role: 'system',
        content: this.getSystemPrompt(topic)
      };
  
      const response = await this.client.chat.completions.create({
        model: 'deepseek/deepseek-chat:free', // مدل مورد نظر
        messages: [systemMessage, ...messages],
        temperature: 0.7,
      });
  
      // استفاده از مقدار پیشفرض برای جلوگیری از null/undefined
      const aiResponse = response.choices[0].message.content || '';
  
      return {
        response: aiResponse,
        isComplete: aiResponse.includes('[PETITION]')
      };
    } catch (error) {
      this.logger.error('API Error:', error);
      throw new Error('خطا در ارتباط با سرویس هوش مصنوعی');
    }
  }

  private getSystemPrompt(topic: string): string {
    return `
      شما یک متخصص حقوقی هوشمند هستید. وظیفه شما کمک به کاربر برای ایجاد عریضه حقوقی است.
      
      موضوع اصلی: ${topic}
      
      دستورالعمل‌ها:
      1. در هر مرحله فقط یک سوال مرتبط بپرسید
      2. سوالات باید بر اساس پاسخ‌های قبلی کاربر توسعه یابد
      3. از اصطلاحات پیچیده حقوقی خودداری کنید اما برای نوشته نهایی از آنها استفاده کنید
      4. وقتی اطلاعات کافی جمع شد، عریضه را با [PETITION] شروع کنید
      5. در صورت درخواست کاربر برای پایان، فرآیند را متوقف کنید
      6. به زبان فارسی پاسخ دهید
      7. نام و نام خانوادگی فرد و کد ملی و هر مشخصاتی که نیاز داری رو از کاربر بپرس تا یک عریضه کامل بسازی 
      8. هیچ فیلدی خالی نمونه و هرچیزی که نیاز داری رو از کاربر بپرس و اطلاعات رو کامل بگیر و وارد کن 
      9. از نمونه های مشابه درون اینترنت الگو برداری کن 
    `;
  }
}