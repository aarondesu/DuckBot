import {
  Entity,
  PrimaryColumn,
  BaseEntity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Guild extends BaseEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  avatar!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
