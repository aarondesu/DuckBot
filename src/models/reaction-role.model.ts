/* eslint-disable import/no-cycle */
import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Guild from './guilds.model';

@Table
export default class ReactionRole extends Model {
  @ForeignKey(() => Guild)
  @Column(DataType.BIGINT)
  guildID!: string;

  @Column(DataType.BIGINT)
  channelID!: string;

  @Column(DataType.BIGINT)
  messageID!: string;

  @Column(DataType.BIGINT)
  emojiID!: string;

  @Column(DataType.BIGINT)
  roleID!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @DeletedAt
  deletedAt!: Date;

  @BelongsTo(() => Guild)
  guild!: Guild;
}
