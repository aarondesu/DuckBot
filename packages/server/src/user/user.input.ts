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
}

@InputType()
export class UpdateUserInput {
  @Field()
  tag!: string;

  @Field()
  avatar!: string;
}
