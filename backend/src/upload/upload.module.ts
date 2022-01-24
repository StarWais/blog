import { UploadService } from './upload.service';
import { UploadRepository } from './upload.repository';
import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { UploadResolver } from './upload.resolver';

@Module({
  imports: [],
  providers: [PrismaService, UploadService, UploadRepository, UploadResolver],
  exports: [UploadService],
})
export class UploadModule {}
