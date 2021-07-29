import { GuildInfo } from 'passport-discord';
import {
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';

@Table
export default class User extends Model {
  @Unique
  @PrimaryKey
  @Column(DataType.STRING)
  discordId!: string;

  @Column(DataType.STRING)
  discordTag!: string;

  @Column(DataType.STRING)
  avatar!: string;

  @Column(DataType.JSON)
  guilds!: Array<GuildInfo>;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
}
