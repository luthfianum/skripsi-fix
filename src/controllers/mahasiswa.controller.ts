import sequelize from "../config/sequelize";
import { Mahasiswa } from "../models/mahasiswa.model";
import { NextFunction, Request, Response } from "express";
import {
  BaseResponsePaginationProps,
  BaseResponseProps,
} from "../types/response.type";
import { IMahasiswa, IMahasiswaInput } from "../types/mahasiswa.type";
import metaMaker from "../utils/pagination";

import check from "../utils/check";

class MahasiswaController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static mahasiswaRepository: any = sequelize.getRepository(Mahasiswa);

  public async getList(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { where, meta } = metaMaker(_req);

      const mahasiswa: IMahasiswa[] =
        await MahasiswaController.mahasiswaRepository.findAll({
          ...where,
        });

      const response: BaseResponsePaginationProps<IMahasiswa> = {
        code: 200,
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
      new check(mahasiswa, _req);

      const response: BaseResponseProps<IMahasiswa> = {
        code: 200,
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
      const data: IMahasiswaInput = _req.body;
      const mahasiswa = await MahasiswaController.mahasiswaRepository.create(
        data
      );
      const response: BaseResponseProps<IMahasiswa> = {
        code: 201,
        message: "OK",
        payload: mahasiswa,
      };
      _res.status(201).json(response);
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
      const mahasiswa = await MahasiswaController.mahasiswaRepository.findByPk(
        id
      );
      new check(mahasiswa, _req, { isSelf: true, isFound: true });

      const newMahasiswa = await MahasiswaController.mahasiswaRepository.update(
        data,
        { where: { id }, returning: true }
      );

      const response: BaseResponseProps<IMahasiswa> = {
        code: 200,
        message: "OK",
        payload: newMahasiswa[1][0],
      };
      _res.status(200).json(response);
    } catch (error) {
      _next(error);
    }
  }
}

const mahasiswaController = new MahasiswaController();
export default mahasiswaController;
