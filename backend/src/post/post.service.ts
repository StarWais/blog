import { Paginate } from 'src/common/pagination/pagination';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import slugify from 'slugify';
import { Post as PostModel, Prisma } from '@prisma/client';

import { PrismaService } from './../prisma.service';
import { UploadService } from './../upload/upload.service';
import { Role, User } from './../user/models/user.model';
import { PaginationArgs } from './../common/pagination/pagination.args';
import { UpdatePostInput } from './dto/inputs/update-post-input';

import { CreatePostInput } from './dto/inputs/create-post.input';
import { GetPostArgs } from './dto/args/get-post-args';

@Injectable()
export class PostService {
  constructor(
    private readonly uploadService: UploadService,
    private readonly prisma: PrismaService,
  ) {}

  private generateSlug = (title: string) =>
    slugify(`${title} ${Date.now()}`, { lower: true });
  private async createPostPicture(uploadId: number) {
    return this.prisma.postPicture.create({
      data: {
        upload: {
          connect: {
            id: uploadId,
          },
        },
      },
    });
  }
  private async getOrCreatePostPicture(
    input: Prisma.PostPictureWhereUniqueInput,
    uploadId: number,
  ) {
    const picture = await this.getPostPicture(input);
    if (picture) {
      return picture;
    }
    return await this.createPostPicture(uploadId);
  }
  async getPost(searchArgs: GetPostArgs, currentUser: User | null = null) {
    if (!searchArgs.id && !searchArgs.slug) {
      throw new BadRequestException('You must provide either an id or a slug');
    }
    const post = await this.prisma.post.findUnique({
      where: {
        ...searchArgs,
      },
    });

    if ((!post || !post.published) && currentUser?.role !== Role.ADMIN) {
      throw new NotFoundException(`Post with provided params not found`);
    }
    return post;
  }
  getAllPosts(paginationArgs: PaginationArgs) {
    return Paginate<PostModel>(paginationArgs, this.prisma, 'post', {
      orderBy: [
        {
          published: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }
  getPublishedPosts(paginationArgs: PaginationArgs) {
    return Paginate<PostModel>(paginationArgs, this.prisma, 'post', {
      where: { published: true },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async deletePost(id: number, currentUser: User) {
    const post = await this.getPost({ id });
    if (post.authorId !== currentUser.id) {
      throw new BadRequestException('You are not the author of this post');
    }
    return this.prisma.post.delete({
      where: { id: post.id },
    });
  }
  async updatePost(id: number, data: UpdatePostInput, currentUser: User) {
    const post = await this.getPost({ id });
    if (post.authorId !== currentUser.id) {
      throw new BadRequestException('You are not the author of this post');
    }
    if (data.pictureId) {
      const upload = await this.uploadService.getPictureByIdWithPermissions(
        data.pictureId,
        currentUser,
      );

      const picture = await this.getOrCreatePostPicture(
        { uploadId: upload.id },
        upload.id,
      );
      return this.prisma.post.update({
        where: { id: post.id },
        data: {
          picture: {
            connect: {
              id: picture.id,
            },
          },
          content: data.content,
          title: data.title,
          slug: this.generateSlug(data.title),
        },
      });
    }
    return this.prisma.post.update({
      where: { id: post.id },
      data: {
        content: data.content,
        title: data.title,
        slug: this.generateSlug(data.title),
      },
    });
  }
  async getPostPicture(input: Prisma.PostPictureWhereUniqueInput) {
    const picture = await this.prisma.postPicture.findUnique({
      where: input,
    });
    return picture;
  }
  async getPostPictureUpload(input: Prisma.PostPictureWhereUniqueInput) {
    const picture = await this.prisma.postPicture.findUnique({
      where: input,
      select: {
        upload: true,
      },
    });
    return picture.upload;
  }
  async createPost(details: CreatePostInput, currentUser: User) {
    const upload = await this.uploadService.getPictureByIdWithPermissions(
      details.pictureId,
      currentUser,
    );

    const picture = await this.getOrCreatePostPicture(
      { uploadId: upload.id },
      upload.id,
    );

    return this.prisma.post.create({
      data: {
        title: details.title,
        content: details.content,
        author: {
          connect: {
            id: currentUser.id,
          },
        },
        picture: {
          connect: {
            id: picture.id,
          },
        },
        slug: this.generateSlug(details.title),
      },
    });
  }
}
