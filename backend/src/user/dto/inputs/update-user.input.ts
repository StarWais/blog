import { InputType, Field, Int } from '@nestjs/graphql';
import {
  Length,
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsNumber,
  IsPositive,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => Int, {
    description: 'The unique identifier of the user',
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  id?: number;

  @Field({ description: 'User email', nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  @Length(5, 255)
  email?: string;

  @Field({ description: 'User description', nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @Length(5, 255)
  description?: string;

  @Field({ description: 'User name', nullable: true })
  @IsOptional()
  @IsNotEmpty()
  @Length(2, 255)
  name?: string;
}
