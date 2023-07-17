import sequelize from "../config/sequelize";
import { NextFunction, Request, Response } from "express";
import { Kuisioner } from "../models/kuisioner.model";
import { IKuisioner, KuisionerInput } from "../types/kuisioner.type";

import { BaseResponsePaginationProps, BaseResponseProps } from "../types/response.type";
import metaMaker from "../utils/pagination";
import check from "../utils/check";

class KuisionerController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static kuisionerRepository: any = sequelize.getRepository(Kuisioner);

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
      const {id: userId} = _req.user;
      const data = _req.body
      const kuisioner = await KuisionerController.kuisionerRepository.create(
        {
          mahasiswaId: userId,
          ...data,
        }
      )
      console.log(kuisioner)
      const response: BaseResponseProps<IKuisioner> = {
        code: 201,
        message: "OK",
        payload: kuisioner,
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
      const kuisioner = await KuisionerController.kuisionerRepository.findAll({
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
      const kuisioner = await KuisionerController.kuisionerRepository.findByPk(id)
      check(kuisioner,_req);

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
      const kuisioner = await KuisionerController.kuisionerRepository.findByPk(id)
      check(kuisioner, _req, { isSelf: true, isFound: true })

      const newKuisioner = await KuisionerController.kuisionerRepository.update(
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
}

const kuisionerController = new KuisionerController();
export default kuisionerController;