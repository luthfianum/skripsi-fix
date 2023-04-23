import sequelize from "../config/sequelize";
import { Mahasiswa } from "../models/mahasiswa.model";
import { NextFunction, Request, Response } from "express";
import {
  BaseResponsePaginationProps,
  BaseResponseProps,
} from "../types/response.type";
import { Imahasiswa, ImahasiswaInput } from "../types/mahasiswa.type";
import metaMaker from "../utils/pagination";

export class MahasiswaController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static mahasiswaRepository: any = sequelize.getRepository(Mahasiswa);
  
  constructor() {
    this.getList = this.getList.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
  }

  public async getList(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { where, meta } = metaMaker(_req);

      const mahasiswa = await MahasiswaController.mahasiswaRepository.findAll({
        ...where,
      });

      const response: BaseResponsePaginationProps<Imahasiswa> = {
        code: "200",
        message: "OK",
        payload: {
          count: mahasiswa.length,
          prev: meta.prev,
          next: meta.next,
          results: mahasiswa,
        },
      };

      _res.status(200).json(response);
    } catch (error) {
      _next(error);
    }
  }

  public async getById(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { id } = _req.params;
      const mahasiswa = await MahasiswaController.mahasiswaRepository.findByPk(
        id
      );
      const response: BaseResponseProps<Imahasiswa> = {
        code: "200",
        message: "OK",
        payload: mahasiswa,
      };
      _res.status(200).json(response);
    } catch (error) {
      _next(error);
    }
  }

  public async create(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const data: ImahasiswaInput = _req.body;
      const mahasiswa = await MahasiswaController.mahasiswaRepository.create(
        data
      );
      const response: BaseResponseProps<Imahasiswa> = {
        code: "200",
        message: "OK",
        payload: mahasiswa,
      };
      _res.status(200).json(response);
    } catch (error) {
      _next(error);
    }
  }

  public async update(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { id } = _req.params;
      const data: ImahasiswaInput = _req.body;
      const mahasiswa = await MahasiswaController.mahasiswaRepository.update(
        data,
        { where: { id } }
      );
      const response: BaseResponseProps<Imahasiswa> = {
        code: "200",
        message: "OK",
        payload: mahasiswa,
      };
      _res.status(200).json(response);
    } catch (error) {
      _next(error);
    }
  }
}

export const mahasiswaController = new MahasiswaController();
