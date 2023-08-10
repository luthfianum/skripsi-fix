import sequelize from "../config/sequelize";
import { Mahasiswa } from "../models/mahasiswa.model";
import { NextFunction, Request, Response } from "express";
import {
  BaseResponseProps,
} from "../types/response.type";
import BaseError from "../errors/BaseError";

import MailService from "../config/nodemailer";

class AuthController {
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
      const { email, password } = _req.body;
      const mahasiswa = await AuthController.mahasiswaRepository.findOne({
        where: {
          email,
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
      if (data.nim.length !== 9) 
        throw new BaseError(400, "Input Tidak Valid");
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