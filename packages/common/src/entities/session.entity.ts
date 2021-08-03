/* eslint-disable import/prefer-default-export */
import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SessionEntity } from 'typeorm-store';

@Entity()
export class Session extends BaseEntity implements SessionEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  expiresAt!: number;

  @Column()
  data!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
