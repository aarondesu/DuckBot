import {} from 'discord.js';
import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
} from 'sequelize-typescript';

@Table
export default class ReactionRoles extends Model {
  @Column(DataType.STRING)
  guildId!: string;

  @Column(DataType.STRING)
  channelId!: string;

  @Column(DataType.STRING)
  messageId!: string;

  @Column(DataType.STRING)
  emojiId!: string;

  @Column(DataType.STRING)
  roleId!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;
}
