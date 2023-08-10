import {
  Model,
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Table,
  UpdatedAt,
  ForeignKey,
  BeforeUpdate,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Kuisioner } from "./kuisioner.model";
import { TipePertanyaan } from "../types/pertanyaan.type";

@Table({
  tableName: "pertanyaan",
  timestamps: true,
  freezeTableName: true,
  modelName: "Pertanyaan",
})
export class Pertanyaan extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Kuisioner)
  kuisionerId!: string;

  @Column(DataType.STRING)
  pertanyaan!: string;

  @Column(DataType.STRING)
  tipe!: TipePertanyaan;

  @Column(DataType.STRING)
  section!: string;

  @Column(DataType.BOOLEAN)
  master!: boolean;

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
  static async generateId(instance: Pertanyaan): Promise<void> {
    instance.id = uuidv4().replace(/-/g, '');
  }

  @BeforeUpdate
  @BeforeCreate
  static async masterSync (instance: Pertanyaan): Promise<void> {
    instance.master = !Boolean(instance.section)
  }
}
