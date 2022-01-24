import { Field, ArgsType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { description: 'Current page' })
  @IsNumber()
  @IsPositive()
  page: number;

  @Field(() => Int, { description: 'Current page', defaultValue: 10 })
  @IsNumber()
  @IsPositive()
  limit?: number;
}
