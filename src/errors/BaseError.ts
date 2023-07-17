

class BaseError extends Error {
  statusCode: number;
  isOperational: boolean;
  details: any;

  constructor(statusCode: number, message: string, isOperational?: boolean, details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational ?? false;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseError;

