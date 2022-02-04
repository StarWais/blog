import { PaginationArgs } from './../../../common/pagination/pagination.args';
import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@ArgsType()
export class GetCommentsArgs extends PaginationArgs {
  @Field(() => Int, { description: 'Post id' })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  postId: number;
}
