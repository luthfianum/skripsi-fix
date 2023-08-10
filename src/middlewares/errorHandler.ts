import { NextFunction, Request, Response } from "express";
import { ErrorResponseProps } from "../types/response.type";
import vars from "../config/vars";

const errorHandler = (_err: any, _req: Request, _res: Response, _next: NextFunction) => {
  _err.statusCode = _err.statusCode || 500;
  _err.message = _err.message || "Internal Server Error";
  const error: ErrorResponseProps = {
    code: _err.statusCode,
    message: _err.message,
    timestamp: new Date().toISOString(),
    url: _req.originalUrl,
  };
  if(vars.env === "development") {
    _res.status(_err.statusCode).json({
      ...error,
      details: _err.details,
    });
  } else {
    _res.status(_err.statusCode).json(error);
  }
}

export default errorHandler;