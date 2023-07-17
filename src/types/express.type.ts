/* eslint-disable @typescript-eslint/no-namespace */
declare namespace Express {
  interface Request {
    user: {
      nim: string;
      id: string;
      role?: string;
      iat: number;
      exp: number;
    };
  }
}