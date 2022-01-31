import { InputType, Field } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';

@InputType()
export class RefreshTokenInput {
  @Field({ description: 'Refresh token' })
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
