import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

@Table({
  tableName: "mahasiswa",
  timestamps: true,
  freezeTableName: true,
  modelName: "Mahasiswa",
})
export class Mahasiswa extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
  })
  id!: string;

  @Column(DataType.STRING)
  nama!: string;

  @Column(DataType.STRING)
  nim!: string;

  @Column(DataType.STRING)
  gender!: string;

  @Column(DataType.STRING)
  studi!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  angkatan!: string;

  @Column(DataType.STRING)
  kelahiran!: string;

  @Column(DataType.STRING)
  provinsi!: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
