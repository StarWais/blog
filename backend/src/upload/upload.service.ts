import { FileUpload } from 'graphql-upload';
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { Role, User } from './../user/models/user.model';
import * as Sharp from 'sharp';
import { uuid } from 'uuidv4';
import { join } from 'path';
import { unlink } from 'fs/promises';

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  private streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  };
  private createFile = async (fileDetails: FileUpload) => {
    const { createReadStream } = fileDetails;
    const image = await this.streamToString(createReadStream());
    const sharpImage = Sharp(image);
    const pictureuuid = uuid();
    const newFileName = `${pictureuuid}.avif`;
    const newFilePath = join(process.cwd(), '..', '/uploads', newFileName);
    const newFileInfo = await sharpImage.avif().toFile(newFilePath);
    return {
      fileName: pictureuuid,
      fileType: 'avif',
      fileSize: newFileInfo.size,
      filePath: `uploads/${newFileName}`,
    };
  };
  async uploadPicture(fileDetails: FileUpload, user: User) {
    const file = await this.createFile(fileDetails);
    return this.prisma.upload.create({
      data: {
        ...file,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async deleteFile(fileName: string) {
    const filePath = join(process.cwd(), '..', '/uploads', fileName);
    await unlink(filePath);
  }

  async getPictureByIdWithPermissions(pictureId: number, user: User) {
    const file = await this.getPictureById(pictureId);
    if (file.userId !== user.id && user.role !== Role.ADMIN) {
      throw new NotFoundException('You are not the author of this file');
    }
    return file;
  }

  async deleteUpload(id: number, user: User) {
    const file = await this.getPictureByIdWithPermissions(id, user);
    const deletedFile = await this.prisma.upload.delete({
      where: {
        id: file.id,
      },
    });
    await this.deleteFile(`${file.fileName}.${file.fileType}`);
    return deletedFile;
  }

  async getPictureById(id: number) {
    const file = await this.prisma.upload.findUnique({
      where: { id },
    });
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return file;
  }

  async getMyUploads(user: User) {
    return this.prisma.upload.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }
}
