import { FileUpload } from 'graphql-upload';
import { PostUploadRepository } from './post-upload.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Sharp from 'sharp';
import { uuid } from 'uuidv4';
import { join } from 'path';

@Injectable()
export class PostUploadService {
  constructor(private readonly postUploadRepository: PostUploadRepository) {}

  private streamToString = (stream) => {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  };
  async createFile(fileDetails: FileUpload) {
    const { createReadStream, filename } = fileDetails;
    const image = await this.streamToString(createReadStream());
    const sharpImage = Sharp(image);
    const pictureuuid = uuid();
    const newFileName = `${pictureuuid}.avif`;
    const newFilePath = join(process.cwd(), 'src/public/uploads', newFileName);
    const newFileInfo = await sharpImage.avif().toFile(newFilePath);
    return this.postUploadRepository.createFile({
      fileName: pictureuuid,
      fileType: 'avif',
      fileSize: newFileInfo.size,
      filePath: `uploads/${newFileName}`,
    });
  }

  async getFileById(id: number) {
    const file = await this.postUploadRepository.getFileById(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return file;
  }
}
