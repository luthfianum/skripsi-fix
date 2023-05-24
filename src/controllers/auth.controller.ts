import sequelize from "../config/sequelize";
import { Mahasiswa } from "../models/mahasiswa.model";
import { NextFunction, Request, Response } from "express";
import {
  BaseResponseProps,
} from "../types/response.type";
import BaseError from "../errors/BaseError";
import { HttpStatusCode } from "../types/httpStatusCode";
import MailService from "../config/nodemailer";

export class AuthController {
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
        throw new BaseError(HttpStatusCode.NOT_FOUND, "NIM atau Password tidak sesuai");
      }

      const token = mahasiswa.createToken()

      const response: BaseResponseProps<{ token: string }> = {
        code: HttpStatusCode.OK,
        message: "OK",
        payload: {
          token
        },
      };

      _res.status(HttpStatusCode.OK).json(response);
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
        code: HttpStatusCode.CREATED,
        message: "Created",
        payload: data,
      };

      _res.status(HttpStatusCode.CREATED).json(response);
    } catch (error) {
      transaction.rollback();
      _next(error);
    }
  }
    
}

export const authController = new AuthController();