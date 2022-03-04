import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsNotEmpty } from 'class-validator';
import { PaginationArgs } from 'src/common/pagination/pagination.args';
@ArgsType()
export class GetPublishedPostsArgs extends PaginationArgs {
  @IsOptional()
  @IsNotEmpty()
  @Field(() => String, { nullable: true, description: 'Search Text' })
  searchText?: string;
}
