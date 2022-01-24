import { UploadService } from './upload.service';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guards/roles.guard';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { Role } from '../user/models/user.model';
import { Roles } from '../decorators/roles.decorator';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload as FileUploadModel } from './models/upload.model';

@Resolver(() => FileUploadModel)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}
  @Roles(Role.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => FileUploadModel)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) fileDetails: FileUpload,
  ) {
    return this.uploadService.createPostPicture(fileDetails);
  }
}
