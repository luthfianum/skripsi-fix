import { NextFunction } from "express";
import BaseError from "../errors/BaseError";

const notFoundErrorHandler = (_req: Request, _res: Response, _next: NextFunction) => {
  const error = new BaseError(404, "URL Not Found", true);
  _next(error);
};

export default notFoundErrorHandler;