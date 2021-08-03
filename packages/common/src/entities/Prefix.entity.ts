/* eslint-disable import/prefer-default-export */
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

import { Guild } from './guild.entity';

@Entity()
export class Prefix extends BaseEntity {
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
