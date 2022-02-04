import { InputType, Field, Int } from '@nestjs/graphql';
import {
  Length,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsAlphanumeric,
} from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field()
  @IsOptional()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(3, 255)
  title?: string;

  @Field()
  @IsOptional()
  @IsNotEmpty()
  @Length(3, 100000)
  content?: string;

  @Field(() => Int)
  @IsOptional()
  @IsPositive()
  pictureId?: number;
}
