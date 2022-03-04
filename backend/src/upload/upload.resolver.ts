import { UploadService } from './upload.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../guards/gql-auth.guard';
import { User } from '../user/models/user.model';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { FileUpload as FileUploadModel } from './models/upload.model';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { DeleteUploadArgs } from './dto/args/delete-upload.args';

@Resolver(() => FileUploadModel)
export class UploadResolver {
  constructor(private readonly uploadService: UploadService) {}
  @UseGuards(GqlAuthGuard)
  @Mutation(() => FileUploadModel)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) fileDetails: FileUpload,
    @CurrentUser() currentUser: User,
  ) {
    return this.uploadService.uploadPicture(fileDetails, currentUser);
  }
  @UseGuards(GqlAuthGuard)
  @Query(() => [FileUploadModel])
  async getMyUploads(@CurrentUser() currentUser: User) {
    const uploads = await this.uploadService.getMyUploads(currentUser);
    return uploads;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => FileUploadModel)
  async deleteUpload(
    @Args() { id }: DeleteUploadArgs,
    @CurrentUser() currentUser: User,
  ) {
    return this.uploadService.deleteUpload(id, currentUser);
  }
}
