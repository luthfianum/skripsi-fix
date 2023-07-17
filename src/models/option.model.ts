import {
  Column,
  DataType,
  Table,
  ForeignKey,
  Model,
  BeforeCreate,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Pertanyaan } from "./pertanyaan.model";

@Table({
  tableName: "option",
  timestamps: true,
  freezeTableName: true,
  modelName: "option",
})
export class Option extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Pertanyaan)
  pertanyaanId!: string;

  @Column(DataType.STRING)
  option!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;

  @BeforeCreate
  static async generateId(instance: Option): Promise<void> {
    instance.id = uuidv4().replace(/-/g, '');
  }
}
