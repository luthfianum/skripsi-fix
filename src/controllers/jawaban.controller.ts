import sequelize from "../config/sequelize";
import { NextFunction, Request, Response } from "express";
import { Jawaban } from "../models/jawaban.model";
import { BaseResponsePaginationProps, BaseResponseProps } from "../types/response.type";
import metaMaker from "../utils/pagination";
import IJawaban, { IJawabanInput } from "../types/jawaban.type";


class JawabanController {
  private static jawabanRepository: any = sequelize.getRepository(Jawaban);

  public async getByKuisionerId (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      const { kuisionerId } = _req.params;
      const { where, meta } = metaMaker(_req);

      const jawaban = await JawabanController.jawabanRepository.findAll({
        where: {
          kuisionerId,
          ...where
        }
      });

      const response: BaseResponsePaginationProps<IJawaban> = {
        code: 200,
        message: "OK",
        payload: {
          count: jawaban.length,
          prev: meta.prev,
          next: meta.next,
          results: jawaban,
        },
      }
      _res.status(200).json(response);
    } catch (error) {
      _next(error);
    }
  }

  public async getByPertanyaanId (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      const { id } = _req.params;
      
      const jawaban = await JawabanController.jawabanRepository.findAll({
        where: {
          pertanyaanId: id,
        }
      });

      const response: BaseResponseProps<IJawaban> = {
        code: 200,
        message: "OK",
        payload: jawaban,
      }
      _res.status(200).json(response);
    } catch (error) {  
      _next(error);
    }
  }

  public async create (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    const {id: userId} = _req.user;
    const data: IJawabanInput = _req.body
    const jawaban = await JawabanController.jawabanRepository.create(
      {
        ...data,
        mahasiswaId: userId,
      }
    )

    const response: BaseResponseProps<IJawaban> = {
      code: 201,
      message: "OK",
      payload: jawaban,
    };
    _res.status(201).json(response);
  }
}

export default new JawabanController();