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
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import { Kuisioner } from "./kuisioner.model";
import { Mahasiswa } from "./mahasiswa.model";

@Table({
  tableName: "penyebaran",
  timestamps: true,
  freezeTableName: true,
  modelName: "penyebaran",
})
export class Penyebaran extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Kuisioner)
  kuisionerId!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Mahasiswa)
  mahasiswaId!: string;

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
  static async generateId(instance: Penyebaran): Promise<void> {
    instance.id = uuidv4().replace(/-/g, '');
  }
}
