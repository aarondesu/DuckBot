/* eslint-disable import/prefer-default-export */
import { Field, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  tag!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar!: string;

  @CreateDateColumn({ nullable: true })
  createdAt!: string;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: string;
}
