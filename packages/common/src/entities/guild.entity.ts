/* eslint-disable import/prefer-default-export */
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Guild extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  icon!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
