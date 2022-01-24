import { Field, ArgsType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

@ArgsType()
export class GetPostArgs {
  @Field({ nullable: true, description: 'Slug of the post' })
  @IsOptional()
  @IsNotEmpty()
  slug?: string;

  @Field(() => Int, { nullable: true, description: 'ID of the post' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  id?: number;
}
