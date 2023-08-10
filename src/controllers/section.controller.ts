import sequelize from "../config/sequelize";
import { NextFunction, Request, Response } from "express";
import { IKuisioner, KuisionerInput } from "../types/kuisioner.type";

import { BaseResponsePaginationProps, BaseResponseProps } from "../types/response.type";
import metaMaker from "../utils/pagination";
import check from "../utils/check";
import BaseError from "../errors/BaseError";
import { Section } from "../models/section.model";
import { InputSection } from "../types/section.type";

class SectionController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static sectionRepository: any = sequelize.getRepository(Section);


  constructor() {
    this.getList = this.getList.bind(this);
    this.create = this.create.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
  }

  public async create (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      const data: InputSection = _req.body
      console.log(data)
      const section = await SectionController.sectionRepository.create(
        {
          ...data,
        }
      )
      const response: BaseResponseProps<IKuisioner> = {
        code: 201,
        message: "OK",
        payload: section,
      };
      _res.status(201).json(response);
    } catch (error) {
      _next(error)
    }
  }

  public async getList (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      const {id: userId} = _req.user;
      const { where, meta } = metaMaker(_req);
      const kuisioner = await SectionController.sectionRepository.findAll({
        where: {
          mahasiswaId: userId,
          ...where
        }
      })

      const response: BaseResponsePaginationProps<IKuisioner> = {
        code: 200,
        message: "OK",
        payload: {
          count: kuisioner.length,
          prev: meta.prev,
          next: meta.next,
          results: kuisioner,
        },
      };

      _res.status(200).json(response);

    } catch (error) {
      _next(error)
    }
  }

  public async getById (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      console.log(_req.params)
      const { id } = _req.params;
      const kuisioner = await SectionController.sectionRepository.findByPk(id)
      new check(kuisioner,_req);

      const response: BaseResponseProps<IKuisioner> = {
        code: 200,
        message: "OK",
        payload: kuisioner,
      };

      _res.status(200).json(response);

    } catch (error) {
      _next(error)
    }
  }

  public async update (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      const { id } = _req.params;
      const data: Partial<KuisionerInput> = _req.body;
      const kuisioner = await SectionController.sectionRepository.findByPk(id)
      
      if(!kuisioner) 
        throw new BaseError(404, "Data Not Found")
      
      if (kuisioner.mahasiswaId !== _req.user.id) 
        throw new BaseError(403, "Forbidden");

      const newKuisioner = await SectionController.sectionRepository.update(
        data,
        { where: { id }, returning: true },
      );

      const response: BaseResponseProps<IKuisioner> = {
        code: 200,
        message: "OK",
        payload: newKuisioner[1][0],
      };

      _res.status(200).json(response);

    } catch (error) {
      _next(error)
    }
  }

  public async delete (
    _req: Request,
    _res: Response,
    _next: NextFunction
  ){
    try {
      const { id } = _req.params;
      const kuisioner = await SectionController.sectionRepository.findByPk(id)

      if(!kuisioner) 
        throw new BaseError(404, "Data Not Found")
      
      if (kuisioner.mahasiswaId !== _req.user.id) 
        throw new BaseError(403, "Forbidden");

      await SectionController.sectionRepository.destroy({
        where: { id },
      });

      const response: BaseResponseProps<any> = {
        code: 200,
        message: "OK",
        payload: {
          id
        },
      };

      _res.status(200).json(response);

    } catch (error) {
      _next(error)
    }
  }


}

const sectionController = new SectionController();
export default sectionController;