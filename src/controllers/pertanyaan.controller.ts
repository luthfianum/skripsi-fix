import { NextFunction, Request, Response } from "express";

import { BaseResponsePaginationProps, BaseResponseProps } from "../types/response.type";
import sequelize from "../config/sequelize";
import metaMaker from "../utils/pagination";
import { IPertanyaan, InputPertanyaan } from "../types/pertanyaan.type";
import BaseError from "../errors/BaseError";
import { Section, Pertanyaan, Option } from "../models/index.model";

class PertanyaanController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static pertanyaanRepository: any = sequelize.getRepository(Pertanyaan);
  private static optionRepository: any = sequelize.getRepository(Option);
  private static sectionRepository: any = sequelize.getRepository(Section);

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
        message: "OK",
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
        code: 200,
        message: "OK",
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

      await pertanyaan.destroy()

      const response: BaseResponseProps<any> = {
        code: 200,
        message: "OK",
        payload: {
          id: pertanyaan.id
        },
      };

      _res.status(200).json(response)
    } catch (error) {
      _next(error)
    }
  }

  public async createOption (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ) {
    try {
      const { id, kuisionerId } = _req.params;
      const data = _req.body

      const pertanyaan = await PertanyaanController.pertanyaanRepository.findByPk(id)

      if(!pertanyaan)
        throw new BaseError(404, "Data Not Found")

      if(!(pertanyaan.tipe !== 'radio' || pertanyaan.tipe !== 'checkbox'))
        throw new BaseError(400, "Tipe Pertanyaan Tidak Sesuai")

      const option = await PertanyaanController.optionRepository.create({
        pertanyaanId: id,
        ...data
      })

      const response: BaseResponseProps<any> = {
        code: 201,
        message: "OK",
        payload: option,
      };

      _res.status(201).json(response);

    } catch (error) {
      _next(error)
    }
  }

  public async deleteOption (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ): Promise<void> {
    try {
      const { id, kuisionerId, pertanyaanId } = _req.params;

      const pertanyaan = await PertanyaanController.pertanyaanRepository.findByPk(pertanyaanId)

      if(!pertanyaan)
        throw new BaseError(404, "Data Not Found Pertanyaan")

      if(!(pertanyaan.tipe !== 'radio' || pertanyaan.tipe !== 'checkbox'))
        throw new BaseError(400, "Tipe Pertanyaan Tidak Sesuai")

      const option = await PertanyaanController.optionRepository.findByPk(id)

      if(!option)
        throw new BaseError(404, "Data Not Found")

      const section = await PertanyaanController.sectionRepository.findOne({
        where: {
          optionId: id
        }
      })

      if(section){
        // delete all section
        await PertanyaanController.pertanyaanRepository.destroy({
          where: {
            section: section.id
          }
        })
        await section.destroy()
      }

      await option.destroy()

      const response: BaseResponseProps<any> = {
        code: 200,
        message: "OK",
        payload: {
          id: option.id
        },
      };

      _res.status(200).json(response);

    } catch (error) {
      _next(error)
    }
  }
}

const pertanyaanController = new PertanyaanController();
export default pertanyaanController;