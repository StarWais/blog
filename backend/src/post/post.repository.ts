import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post as PostModel, Prisma } from '@prisma/client';
import { Paginate } from 'src/common/pagination/pagination';
import { PaginationArgs } from 'src/common/pagination/pagination.args';

@Injectable()
export class PostRepository {
  constructor(private readonly prisma: PrismaService) {}

  getPost(searchArgs: Prisma.PostWhereUniqueInput) {
    return this.prisma.post.findUnique({
      where: searchArgs,
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

  createPost(details: Prisma.PostCreateInput) {
    return this.prisma.post.create({
      data: details,
    });
  }
  deletePost(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
  updatePost(id: number, data: Prisma.PostUpdateInput) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }
}
