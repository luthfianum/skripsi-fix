import sequelize from "../config/sequelize";
import { Mahasiswa } from "../models/mahasiswa.model";
import { NextFunction, Request, Response } from "express";
import {
  BaseResponsePaginationProps,
  BaseResponseProps,
} from "../types/response.type";
import { IMahasiswa, IMahasiswaInput } from "../types/mahasiswa.type";
import metaMaker from "../utils/pagination";
import { HttpStatusCode } from "../types/httpStatusCode";
import BaseError from "../errors/BaseError";

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

      const response: BaseResponsePaginationProps<IMahasiswa> = {
        code: HttpStatusCode.OK,
        message: "OK",
        payload: {
          count: mahasiswa.length,
          prev: meta.prev,
          next: meta.next,
          results: mahasiswa,
        },
      };

      _res.status(HttpStatusCode.OK).json(response);
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
      mahasiswa.check(_req);

      const response: BaseResponseProps<IMahasiswa> = {
        code: HttpStatusCode.OK,
        message: "OK",
        payload: mahasiswa,
      };
      _res.status(HttpStatusCode.OK).json(response);
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
      const data: IMahasiswaInput = _req.body;
      const mahasiswa = await MahasiswaController.mahasiswaRepository.create(
        data
      );
      const response: BaseResponseProps<IMahasiswa> = {
        code: HttpStatusCode.CREATED,
        message: "OK",
        payload: mahasiswa,
      };
      _res.status(HttpStatusCode.CREATED).json(response);
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
      const data: IMahasiswaInput = _req.body;
      const mahasiswa = await MahasiswaController.mahasiswaRepository.findByPk(id);
      mahasiswa.check(_req, { isSelf: true, isFound: true });

      const newMahasiswa = await MahasiswaController.mahasiswaRepository.update(
        data,
        { where: { id }, returning: true },
      );

      const response: BaseResponseProps<IMahasiswa> = {
        code: HttpStatusCode.OK,
        message: "OK",
        payload: newMahasiswa[1][0],
      };
      _res.status(HttpStatusCode.OK).json(response);
    } catch (error) {
      _next(error);
    }
  }
}

export const mahasiswaController = new MahasiswaController();
