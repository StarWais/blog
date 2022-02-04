import { InputType, Field, Int } from '@nestjs/graphql';
import {
  Length,
  IsNotEmpty,
  IsPositive,
  IsAlphanumeric,
} from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(3, 255)
  title: string;

  @Field()
  @IsNotEmpty()
  @Length(3, 100000)
  content: string;

  @Field(() => Int)
  @IsPositive()
  pictureId: number;
}
