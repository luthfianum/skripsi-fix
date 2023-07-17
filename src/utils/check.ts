import { ICheckOptions, DefaultOption, ICheck, JwtPayload } from "../types/base.type";

import { Request } from "express";
import BaseError from "../errors/BaseError";
import { Model } from "sequelize-typescript";
const check = (
  data: any,
  req: Request,
  option: ICheckOptions = DefaultOption
): ICheck | void => {
  const result: ICheck = {};
  const { id } = req.user as JwtPayload;
  
  option?.isFound ?? isFound(data, result)
  option?.isSelf ?? isSelf(data, id, result)

  return result;
}

const isFound = (data: any, result: ICheck) => {
  if (data) {
    result['isFound'] = true
  } else {
    throw new BaseError(404, "Data Not Found");
  }
}

const isSelf = (data: Model, id: string, result: ICheck) => {
  if (data.id == id) {
    result['isSelf'] = true
  } else {
    throw new BaseError(403, "Forbidden");
  }
}

export default check;