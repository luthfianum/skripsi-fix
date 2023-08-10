import {ICheckOptions, DefaultOption} from "../types/checkOption.type";

import JwtPayload from "../types/jwt.type";



import { Request } from "express";
import BaseError from "../errors/BaseError";
import { Model } from "sequelize-typescript";

class check {
  isFound: boolean = false;
  isSelf: boolean = false;

  constructor(data: any, req: Request, option: ICheckOptions = DefaultOption) {
    const { id } = req.user as JwtPayload;

    option?.isFound ?? this.checkIsFound(data)
    option?.isSelf ?? this.checkIsSelf(data, id)
  }

  private checkIsFound(data: any) {
    if (data) {
      this.isFound = true
    } else {
      throw new BaseError(404, "Data Not Found");
    }
  }

  private checkIsSelf(data: Model, id: string) {
    if (data.id == id) {
      this.isSelf = true
    } else {
      throw new BaseError(403, "Forbidden");
    }
  }
}

// const check = (
//   data: any,
//   req: Request,
//   option: ICheckOptions = DefaultOption
// ): ICheck | void => {
//   const result: ICheck = {};
//   const { id } = req.user as JwtPayload;
  
//   option?.isFound ?? isFound(data, result)
//   option?.isSelf ?? isSelf(data, id, result)

//   return result;
// }

// const isFound = (data: any, result: ICheck) => {
//   if (data) {
//     result['isFound'] = true
//   } else {
//     throw new BaseError(404, "Data Not Found");
//   }
// }

// const isSelf = (data: Model, id: string, result: ICheck) => {
//   if (data.id == id) {
//     result['isSelf'] = true
//   } else {
//     throw new BaseError(403, "Forbidden");
//   }
// }

export default check;