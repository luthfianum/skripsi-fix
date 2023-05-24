import { ICheckOptions, DefaultOption, ICheck, JwtPayload } from "../types/base.type";
import { HttpStatusCode } from "../types/httpStatusCode";
import { Request } from "express";
import BaseError from "../errors/BaseError";
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
    throw new BaseError(HttpStatusCode.NOT_FOUND, "Data Not Found");
  }
}

const isSelf = (data: any, id: string, result: ICheck) => {
  if (data.id == id) {
    result['isSelf'] = true
  } else {
    throw new BaseError(HttpStatusCode.FORBIDDEN, "Forbidden");
  }
}

export default check;