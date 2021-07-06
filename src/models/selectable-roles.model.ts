import {
  Table,
  Model,
  UpdatedAt,
  CreatedAt,
  Column,
  DataType,
} from 'sequelize-typescript';

@Table
export default class SelectableRoles extends Model {
  @Column(DataType.STRING)
  guildId!: string;

  @Column(DataType.STRING)
  channelId!: string;

  @Column(DataType.STRING)
  roleId!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}
