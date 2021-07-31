/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Entity,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import Guild from './Guild.entity';

@Entity()
export default class Prefix extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne((_type) => Guild)
  @JoinColumn()
  guild!: Guild;

  @Column('char')
  prefix!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
