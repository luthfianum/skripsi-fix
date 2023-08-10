import {
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Mahasiswa } from "./mahasiswa.model";
import { v4 as uuidv4 } from "uuid";
import { Kuisioner } from "./kuisioner.model";
import { Pertanyaan } from "./pertanyaan.model";

@Table({
  tableName: "jawaban",
  timestamps: true,
  freezeTableName: true,
  modelName: "Jawaban",
})
export class Jawaban extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  // Penjawab kuisioner
  @Column(DataType.STRING)
  @ForeignKey(() => Mahasiswa)
  mahasiswaId!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Kuisioner)
  kuisionerId!: string;

  @Column(DataType.STRING)
  @ForeignKey(() => Pertanyaan)
  pertanyaanId!: string;

  @Column(DataType.STRING)
  jawaban!: string;

  @Column(DataType.STRING)
  penyebaranId!: string;

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
  static async generateId(instance: Kuisioner): Promise<void> {
    instance.id = uuidv4().replace(/-/g, '');
  }
}
