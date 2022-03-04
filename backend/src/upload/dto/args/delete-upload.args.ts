import { IsPositive } from 'class-validator';
import { ArgsType, Int, Field } from '@nestjs/graphql';

@ArgsType()
export class DeleteUploadArgs {
  @IsPositive()
  @Field(() => Int, { description: 'Id of the upload' })
  id: number;
}
