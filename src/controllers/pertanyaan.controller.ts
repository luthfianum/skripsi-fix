import { NextFunction, Request, Response } from "express";

import { BaseResponsePaginationProps, BaseResponseProps } from "../types/response.type";
import sequelize from "../config/sequelize";
import { Pertanyaan } from "../models/pertanyaan.model";
import metaMaker from "../utils/pagination";
import { IPertanyaan, InputPertanyaan } from "../types/pertanyaan.type";
import { Option } from "../models/option.model";

class PertanyaanController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static pertanyaanRepository: any = sequelize.getRepository(Pertanyaan);

  public async getListByKuisionerId(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ) {
    try {
      const { kuisionerId } = _req.params;
      const { where, meta } = metaMaker(_req);
      const pertanyaan = await PertanyaanController.pertanyaanRepository.findAll({
        includes: [
          {
            model: Option,
          }
        ],
        where: {
          kuisionerId,
          ...where
        }
      })

      const response: BaseResponsePaginationProps<IPertanyaan> = {
        code: 200,
        message: "OK",
        payload: {
          count: pertanyaan.length,
          prev: meta.prev,
          next: meta.next,
          results: pertanyaan,
        },
      };

      _res.status(200).json(response);
    } catch (error) {
      _next(error)
    }
  }

  public async create(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ) {
    try {
      const { kuisionerId } = _req.params;
      const data: InputPertanyaan = _req.body
      const pertanyaan = await PertanyaanController.pertanyaanRepository.create(
        {
          ...data,
          kuisionerId,
        }
      )

      const response: BaseResponseProps<IPertanyaan> = {
        code: 201,
        message: "CREATED",
        payload: pertanyaan,
      };
      _res.status(201).json(response);
    } catch (error) {
      _next(error)
    }
  }

  public async getById(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ) {
    try {
      const { id } = _req.params;
      const pertanyaan = await PertanyaanController.pertanyaanRepository.findByPk(id);

      const response: BaseResponseProps<IPertanyaan> = {
        code: 201,
        message: "CREATED",
        payload: pertanyaan,
      };

      _res.status(200).json(response)
    } catch (error) {
      _next(error)
    }
  }

  public async update(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      const { id } = _req.params;
      const data: InputPertanyaan = _req.body
      const pertanyaan = await PertanyaanController.pertanyaanRepository.findByPk(id);

      const updatedPertanyaan = await pertanyaan.update(data)

      const response: BaseResponseProps<IPertanyaan> = {
        code: 201,
        message: "CREATED",
        payload: updatedPertanyaan,
      };

      _res.status(200).json(response)
    } catch (error) {
      _next(error)
    }
  }

  public async delete(
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      const { id } = _req.params;
      const pertanyaan = await PertanyaanController.pertanyaanRepository.findByPk(id);

      await pertanyaan.softDestroy()

      const response: BaseResponseProps<IPertanyaan> = {
        code: 201,
        message: "CREATED",
        payload: pertanyaan,
      };

      _res.status(200).json(response)
    } catch (error) {
      _next(error)
    }
  }
}

const pertanyaanController = new PertanyaanController();
export default pertanyaanController;