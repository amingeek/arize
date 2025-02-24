import { Controller, Post, Body, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { NewPersonService } from './new-person.service';
import { NewPerson } from '@prisma/client';


@Controller('new-person')
export class NewPersonController {
  private readonly logger = new Logger(NewPersonController.name);

  constructor(private newPersonService: NewPersonService) {}

  @Post()
  async createNewPerson(@Body() data: any) {
    try {
      this.logger.log('Attempting to create NewPerson with data:', data);
      
      // ذخیره فایل تصویر در مسیر مشخص
      const imageFilePath = await this.saveImageFile(data.face, data.fileName, data);

      // جایگزینی نام فایل تصویر با مسیر کامل
      data.face = 'https://nest.storage.iran.liara.space/' + imageFilePath;

      const newPerson = await this.newPersonService.createNewPerson(data);
      this.logger.log('NewPerson created successfully:', newPerson);
      return newPerson;
    } catch (error) {
      this.logger.error('NewPerson creation failed:', error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async saveImageFile(fileContent: string, fileName: string, data: any): Promise<string> {
    // نام فایل را به عنوان مسیر ذخیره‌سازی استفاده می‌کنیم
    const imageFilePath = `${data.nationalCode}.jpg`;

    // اینجا باید کد ذخیره فایل را اضافه کنید
    // بر اساس نوع فایل، از کتابخانه‌های مربوط به ذخیره فایل استفاده کنید

    return imageFilePath;
  }
}
