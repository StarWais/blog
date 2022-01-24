import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './../guards/roles.guard';
import { GqlAuthGuard } from './../guards/gql-auth.guard';
import { Role } from './../user/models/user.model';
import { Roles } from './../decorators/roles.decorator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PostUpload } from './models/post-upload.model';
import { PostUploadService } from './post-upload.service';

@Resolver(() => PostUpload)
export class PostUploadResolver {
  constructor(private readonly postUploadService: PostUploadService) {}
  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => PostUpload)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) fileDetails: FileUpload,
  ) {
    return this.postUploadService.createFile(fileDetails);
  }
}
