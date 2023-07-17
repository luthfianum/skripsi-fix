import sequelize from "../config/sequelize";
import { Mahasiswa } from "../models/mahasiswa.model";
import { NextFunction, Request, Response } from "express";
import {
  BaseResponseProps,
} from "../types/response.type";
import BaseError from "../errors/BaseError";

import MailService from "../config/nodemailer";

class AuthController {
  getMahasiswa(arg0: string, isAuthenticated: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => void, getMahasiswa: any) {
    throw new Error("Method not implemented.");
  }
  getMahasiswaById(arg0: string, isAuthenticated: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => void, getMahasiswaById: any) {
    throw new Error("Method not implemented.");
  }
  createMahasiswa(arg0: string, isAuthenticated: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => void, createMahasiswa: any) {
    throw new Error("Method not implemented.");
  }
  updateMahasiswa(arg0: string, isAuthenticated: (_req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, _res: Response<any, Record<string, any>>, _next: NextFunction) => void, updateMahasiswa: any) {
    throw new Error("Method not implemented.");
  }
  private static mahasiswaRepository = sequelize.getRepository(Mahasiswa);

  constructor() {
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  public async login(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { nim, password } = _req.body;
      const mahasiswa = await AuthController.mahasiswaRepository.findOne({
        where: {
          nim,
        }
      });

      const isPasswordMatch = await mahasiswa?.comparePassword(password);

      if (!mahasiswa || !isPasswordMatch) {
        throw new BaseError(404, "NIM atau Password tidak sesuai");
      }

      const token = mahasiswa.createToken()

      const response: BaseResponseProps<{ token: string }> = {
        code: 200,
        message: "OK",
        payload: {
          token
        },
      };

      _res.status(200).json(response);
    } catch (error) {
      _next(error);
    }
  }

  public async register(    
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    const transaction = await sequelize.transaction()
    try {
      const data = _req.body;
      const mahasiswa = await AuthController.mahasiswaRepository.create(data, { transaction });

      await MailService.getInstance().sendWelcomeEmail(mahasiswa.email)
      transaction.commit();
      const response: BaseResponseProps<Mahasiswa> = {
        code: 201,
        message: "Created",
        payload: data,
      };

      _res.status(201).json(response);
    } catch (error) {
      transaction.rollback();
      _next(error);
    }
  }
    
}

const authController = new AuthController();
export default authController;