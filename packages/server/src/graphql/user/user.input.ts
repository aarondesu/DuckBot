/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserIput {
  @Field()
  id!: string;

  @Field()
  tag!: string;

  @Field()
  avatar!: string;

  @Field()
  accessToken!: string;

  @Field({ nullable: true })
  refreshToken!: string;
}

@InputType()
export class UpdateUserInput {
  @Field()
  tag!: string;

  @Field()
  avatar!: string;

  @Field({ nullable: true })
  accessToken!: string;

  @Field({ nullable: true })
  refreshToken!: string;
}
