import { InputType, Field, Int } from '@nestjs/graphql';
import { Length, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field()
  @IsNotEmpty()
  @IsOptional()
  @Length(3, 255)
  title?: string;

  @Field()
  @IsNotEmpty()
  @IsOptional()
  @Length(3, 100000)
  content?: string;

  @Field(() => Int)
  @IsOptional()
  @IsPositive()
  pictureId?: number;
}
