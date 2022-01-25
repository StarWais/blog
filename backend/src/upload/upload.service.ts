import { UploadRepository } from './upload.repository';
import { FileUpload } from 'graphql-upload';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Sharp from 'sharp';
import { uuid } from 'uuidv4';
import { join } from 'path';

@Injectable()
export class UploadService {
  constructor(private readonly uploadRepository: UploadRepository) {}

  private streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  };
  async createPostPicture(fileDetails: FileUpload) {
    const { createReadStream } = fileDetails;
    const image = await this.streamToString(createReadStream());
    const sharpImage = Sharp(image);
    const pictureuuid = uuid();
    const newFileName = `${pictureuuid}.avif`;
    const newFilePath = join(process.cwd(), '..', '/uploads', newFileName);
    const newFileInfo = await sharpImage.avif().toFile(newFilePath);
    return this.uploadRepository.createFile({
      fileName: pictureuuid,
      fileType: 'avif',
      fileSize: newFileInfo.size,
      filePath: `uploads/${newFileName}`,
    });
  }

  async getPostPictureById(id: number) {
    const file = await this.uploadRepository.getFileById(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return file;
  }
}
