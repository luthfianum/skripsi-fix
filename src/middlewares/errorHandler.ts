import { NextFunction, Request, Response } from "express";
import { HttpStatusCode } from "../types/httpStatusCode";
import BaseError from "../errors/BaseError";
import vars from "../config/vars";
import { ErrorResponseProps } from "../types/response.type";

const errorHandler = (_err: any, _req: Request, _res: Response) => {
  _err.statusCode = _err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  _err.message = _err.message || "Internal Server Error";
  if(vars.env === "development") {
    _res.status(_err.statusCode).json({
      code: _err.statusCode,
      message: _err.message,
      details: _err.details,
      timestamp: new Date().toISOString(),
      url: _req.originalUrl,
    });
  } else {
    const error: ErrorResponseProps = {
      code: _err.statusCode,
      message: _err.message,
      timestamp: new Date().toISOString(),
      url: _req.originalUrl,
    };
    _res.status(_err.statusCode).json(error);
  }
}

const notFoundErrorHandler = (_req: Request, _res: Response, _next: NextFunction) => {
  const error = new BaseError(HttpStatusCode.NOT_FOUND, "URL Not Found", true);
  _next(error);
};

export { errorHandler, notFoundErrorHandler };