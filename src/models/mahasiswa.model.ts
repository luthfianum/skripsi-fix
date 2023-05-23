import {
  BeforeCreate,
  BeforeUpdate,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  IsIn,
  Length,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import vars from "../config/vars";
import { verifyEmail } from "@devmehq/email-validator-js";
import BaseError from "../errors/BaseError";
import { HttpStatusCode } from "../types/httpStatusCode";
import { Request } from "express";
import { DefaultOption, ICheck, ICheckOptions, jwtPayload } from "../types/base.type";
import { Kuisioner } from "./kuisioner.model";

const saltRounds = 10;

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

  // @HasMany(() => Kuisioner, 'PemilikKuisioner')
  // KuisionerSaya: Kuisioner[] = [];

  @Column(DataType.STRING)
  nama!: string;

  @Length({ msg: "Data NIM tidak valid", min: 9, max: 9 })
  @Column(DataType.STRING)
  nim!: string;

  @Column(DataType.STRING)
  email!: string;

  @IsIn({ msg: "Data gender tidak valid", args: [["L", "P"]] })
  @Column(DataType.STRING)
  gender?: string;

  @Column(DataType.STRING)
  studi?: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  angkatan?: string;

  @Column(DataType.STRING)
  kelahiran?: string;

  @Column(DataType.STRING)
  provinsi?: string;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;

  @DeletedAt
  @Column
  deletedAt!: Date;

  // Function

  @BeforeCreate
  static async generateId(instance: Mahasiswa): Promise<void> {
    instance.id = uuidv4();
  }

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: Mahasiswa): Promise<void> {
    instance.password = await bcrypt.hash(instance.password, saltRounds);
  }

  @BeforeCreate
  @BeforeUpdate
  static async validateEmail(instance: Mahasiswa): Promise<void> {
    const { validFormat, validMx } = await verifyEmail({
      emailAddress: instance.email,
      verifyMx: true,
    });
    console.log(validFormat, validMx);
    if (!(validFormat && validMx)) {
      throw new BaseError(HttpStatusCode.NOT_FOUND, "Alamat email tidak benar");
    }
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  public isSelf(id: string): boolean {
    return this.id === id;
  }

  public createToken(): string {
    return jwt.sign(
      {
        nim: this.nim,
        id: this.id,
      },
      vars.jwtSecret,
      {
        expiresIn: "7 days",
      }
    );
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
        throw new BaseError(HttpStatusCode.NOT_FOUND, "Mahasiswa Not Found");
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
