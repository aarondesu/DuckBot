/* eslint-disable import/no-cycle */
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import ReactionRole from './reaction-role.model';

@Table
export default class Guild extends Model {
  @PrimaryKey
  @Column(DataType.BIGINT)
  guildID!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;

  @HasMany(() => ReactionRole)
  reactionRoles!: ReactionRole[];
}
