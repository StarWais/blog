import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

@ArgsType()
export class GetUserArgs {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Field(() => Int)
  id: number;
}
