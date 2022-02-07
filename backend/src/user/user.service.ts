import { Prisma } from '@prisma/client';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from './../prisma.service';
import { UploadService } from './../upload/upload.service';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { Role, User } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with provided id not found`);
    }
    return user;
  }

  async emailUserExists(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    return Boolean(user);
  }

  async getUserAvatar(input: Prisma.UserAvatarWhereUniqueInput) {
    const avatar = await this.prisma.userAvatar.findUnique({
      where: input,
    });
    return avatar;
  }
  async getUserAvatarUpload(input: Prisma.UserAvatarWhereUniqueInput) {
    const avatar = await this.prisma.userAvatar.findUnique({
      where: input,
      select: {
        upload: true,
      },
    });
    return avatar.upload;
  }
  private async createUserAvatar(uploadId: number) {
    return this.prisma.userAvatar.create({
      data: {
        upload: {
          connect: {
            id: uploadId,
          },
        },
      },
    });
  }
  private async getOrCreateUserAvatar(
    input: Prisma.PostPictureWhereUniqueInput,
    uploadId: number,
  ) {
    const avatar = await this.getUserAvatar(input);
    if (avatar) {
      return avatar;
    }
    return await this.createUserAvatar(uploadId);
  }

  async getTotalLikesCount(userId: number) {
    const likesCount = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            postLikes: true,
            commentLikes: true,
          },
        },
      },
    });
    return likesCount._count.commentLikes + likesCount._count.postLikes;
  }
  async getTotalCommentsCount(userId: number) {
    const commentsCount = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return commentsCount._count.comments;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new NotFoundException(`User with provided email does not exist`);
    }
    return user;
  }

  createUser(details: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: details,
    });
  }

  async updateLastActive(userId: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        lastActivedAt: new Date(),
      },
    });
  }

  async updateUser(details: UpdateUserInput, currentUser?: User) {
    let userId: number;
    if (details.id) {
      if (currentUser.role === Role.ADMIN) {
        userId = details.id;
      } else {
        throw new ForbiddenException();
      }
    } else {
      userId = currentUser.id;
    }
    if (details.pictureId) {
      const upload = await this.uploadService.getPictureByIdWithPermissions(
        details.pictureId,
        currentUser,
      );
      const avatar = await this.getOrCreateUserAvatar(
        {
          uploadId: upload.id,
        },
        upload.id,
      );
      return this.prisma.user.update({
        where: { id: userId },
        data: {
          name: details.name,
          email: details.email,
          description: details.description,
          picture: {
            connect: {
              id: avatar.id,
            },
          },
        },
      });
    }
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: details.name,
        email: details.email,
        description: details.description,
      },
    });
  }
}
