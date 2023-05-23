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
import { DefaultOption, ICheck, ICheckOptions, jwtPayload } from "../types/base.type";
import BaseError from "../errors/BaseError";
import { Request } from "express";
import { HttpStatusCode } from "../types/httpStatusCode";

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

  public check(
    req: Request,
    option: ICheckOptions = DefaultOption
  ): ICheck | void {
    console.log(option)
    const result: ICheck = {};
    if (option?.isFound) {
      if(this){
        result['isFound'] = true
      } else {
        throw new BaseError(HttpStatusCode.NOT_FOUND, "Kuisioner Not Found");
      }
    }
    if (option?.isSelf) {
      const { id } = req.user as jwtPayload;
      if(this.isSelf(id)){
        result['isSelf'] = true
      } else {
        throw new BaseError(HttpStatusCode.FORBIDDEN, "Forbidden");
      }
    }
    console.log(result)
    return result; 
  }
}
