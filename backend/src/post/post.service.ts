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
import { GetPublishedPostsArgs } from './dto/args/get-published-posts-args';

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
  async getPost(
    searchArgs: GetPostArgs,
    currentUser: User | null = null,
    selectUnpublished = false,
  ) {
    if (!searchArgs.id && !searchArgs.slug) {
      throw new BadRequestException('You must provide either an id or a slug');
    }
    const post = await this.prisma.post.findUnique({
      where: {
        ...searchArgs,
      },
    });

    if (
      !post ||
      (selectUnpublished
        ? false
        : !post.published &&
          (post.authorId === currentUser?.id ||
            currentUser?.role === Role.ADMIN))
    ) {
      throw new NotFoundException(`Post with provided params not found`);
    }
    return post;
  }
  async publishPost(searchArgs: GetPostArgs, currentUser: User) {
    const post = await this.getPost(searchArgs, currentUser);

    return this.prisma.post.update({
      where: { id: post.id },
      data: {
        published: true,
      },
    });
  }
  getAllPosts(paginationArgs: PaginationArgs) {
    return Paginate<PostModel, Prisma.PostFindManyArgs>(
      paginationArgs,
      this.prisma,
      'post',
      {
        orderBy: [
          {
            published: 'desc',
          },
          {
            createdAt: 'desc',
          },
        ],
      },
    );
  }
  getPublishedPosts(getPublishedPostArgs: GetPublishedPostsArgs) {
    const paginationArgs = {
      page: getPublishedPostArgs.page,
      limit: getPublishedPostArgs.limit,
    };
    const searchText =
      getPublishedPostArgs.searchText === null
        ? undefined
        : getPublishedPostArgs.searchText;
    const extendedSearchOptions: Prisma.PostWhereInput = searchText
      ? {
          OR: [
            {
              title: {
                search: searchText,
              },
            },
            {
              content: {
                search: searchText,
              },
            },
          ],
        }
      : {};
    return Paginate<PostModel, Prisma.PostFindManyArgs>(
      paginationArgs,
      this.prisma,
      'post',
      {
        where: {
          published: true,
          ...extendedSearchOptions,
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    );
  }
  getMyPosts(paginationArgs: PaginationArgs, currentUser: User) {
    return Paginate<PostModel, Prisma.PostFindManyArgs>(
      paginationArgs,
      this.prisma,
      'post',
      {
        where: { authorId: currentUser.id },
        orderBy: {
          createdAt: 'desc',
        },
      },
    );
  }
  async deletePost(searchArgs: GetPostArgs, currentUser: User) {
    const post = await this.getPost(searchArgs, currentUser, true);
    return this.prisma.post.delete({
      where: { id: post.id },
    });
  }
  async updatePost(id: number, data: UpdatePostInput, currentUser: User) {
    const post = await this.getPost({ id }, currentUser);
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
  async getPostLikesCount(postId: number) {
    const likesCount = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
    return likesCount._count.likes;
  }
  async getPostCommentsCount(postId: number) {
    const likesCount = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return likesCount._count.comments;
  }
}
