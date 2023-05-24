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
import { EMetodeKuisioner } from "../types/kuisioner.type";

@Table({
  tableName: "kuisioner",
  timestamps: true,
  freezeTableName: true,
  modelName: "Kuisioner",
})
export class Kuisioner extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  // Pemilik kuisioner
  @Column(DataType.STRING)
  @ForeignKey(() => Mahasiswa)
  mahasiswaId!: string;

  @Column(DataType.STRING)
  title!: string;

  @Column(DataType.STRING)
  deskripsi!: string;

  @Column(DataType.STRING)
  metode!: EMetodeKuisioner;

  @Column(DataType.INTEGER)
  responden!: number;

  // Hadiah untuk pengembangan selanjutnya
  // @Column(DataType.STRING)
  // hadiah!: string;

  @Column(DataType.DATE)
  expiredAt!: Date;

  @Column(DataType.INTEGER)
  penyebaran!: number;

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
    instance.id = uuidv4();
  }

  public isSelf(id: string): boolean {
    return this.mahasiswaId === id;
  }
}
