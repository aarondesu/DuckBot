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
export default class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  tag!: string;

  @Field()
  @Column({ nullable: true })
  avatar!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: string;

  @Column()
  @UpdateDateColumn()
  updatedAt!: string;

  @Column()
  @DeleteDateColumn({ nullable: true })
  deletedAt!: string;
}
