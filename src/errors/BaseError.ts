import { HttpStatusCode } from "../types/httpStatusCode";

class BaseError extends Error {
  statusCode: HttpStatusCode;
  isOperational: boolean;
  details: any;

  constructor(statusCode: HttpStatusCode, message: string, isOperational?: boolean, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational ?? false;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;

