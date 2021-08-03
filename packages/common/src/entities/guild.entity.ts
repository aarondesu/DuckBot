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

  @Field()
  @Column({ nullable: true })
  avatar!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
