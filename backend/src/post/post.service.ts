import { UploadService } from './../upload/upload.service';
import { User } from './../user/models/user.model';
import { PaginationArgs } from './../common/pagination/pagination.args';
import { UpdatePostInput } from './dto/inputs/update-post-input';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import slugify from 'slugify';

import { CreatePostInput } from './dto/inputs/create-post.input';
import { GetPostArgs } from './dto/args/get-post-args';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly uploadService: UploadService,
  ) {}

  private generateSlug = (title: string) =>
    slugify(`${title} ${Date.now()}`, { lower: true });

  async getPost(searchArgs: GetPostArgs, currentUser: User | null = null) {
    if (!searchArgs.id && !searchArgs.slug) {
      throw new BadRequestException('You must provide either an id or a slug');
    }
    const post = await this.postRepository.getPost(searchArgs);
    const isDraft = !post.published;
    const isAuthor = Boolean(currentUser) && post.authorId === currentUser.id;
    if (!post || (isDraft && !isAuthor)) {
      throw new NotFoundException(`Post with provided params not found`);
    }
    return post;
  }

  getAllPosts(paginationArgs: PaginationArgs) {
    return this.postRepository.getAllPosts(paginationArgs);
  }

  getPublishedPosts(paginationArgs: PaginationArgs) {
    return this.postRepository.getPublishedPosts(paginationArgs);
  }

  async deletePost(id: number, currentUser: User) {
    const post = await this.getPost({ id });
    if (post.authorId !== currentUser.id) {
      throw new BadRequestException('You are not the author of this post');
    }
    return this.postRepository.deletePost(post.id);
  }

  async updatePost(id: number, data: UpdatePostInput, currentUser: User) {
    const post = await this.getPost({ id });
    if (post.authorId !== currentUser.id) {
      throw new BadRequestException('You are not the author of this post');
    }
    return this.postRepository.updatePost(post.id, {
      ...data,
      slug: this.generateSlug(data.title),
    });
  }
  async createPost(details: CreatePostInput, currentUser: User) {
    const picture = await this.uploadService.getPostPictureById(
      details.pictureId,
    );
    return this.postRepository.createPost({
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
    });
  }
}
