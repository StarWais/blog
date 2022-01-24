import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostUploadRepository {
  constructor(private readonly prisma: PrismaService) {}
  createFile(input: Prisma.PostUploadCreateInput) {
    return this.prisma.postUpload.create({ data: input });
  }
  getFileById(id: number) {
    return this.prisma.postUpload.findUnique({
      where: {
        id,
      },
    });
  }
}
