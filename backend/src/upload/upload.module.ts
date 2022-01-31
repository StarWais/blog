import { UploadService } from './upload.service';
import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { UploadResolver } from './upload.resolver';

@Module({
  imports: [],
  providers: [PrismaService, UploadService, UploadResolver],
  exports: [UploadService],
})
export class UploadModule {}
