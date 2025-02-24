// new-person.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { NewPerson } from '@prisma/client';

@Injectable()
export class NewPersonService {
  constructor(private prisma: PrismaService) {}

  async createNewPerson(data: NewPerson): Promise<NewPerson> {
    try {
      const newPerson = await this.prisma.client.newPerson.create({
        data,
      });

      return newPerson;
    } catch (error) {
      throw new ConflictException('Failed to create NewPerson');
    }
  }
}