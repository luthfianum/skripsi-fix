import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import BaseError from "../errors/BaseError";
import vars from "../config/vars";
import { JwtPayload } from "../types/base.type";

export function isAuthenticated(_req: Request, _res: Response, _next: NextFunction){
    try {
        const token = _req.headers.authorization?.split(" ")[1] ?? '';
        _req.user = jwt.verify(token, vars.jwtSecret ?? '') as JwtPayload;
        return _next();
    } catch (error) {
        return _next(new BaseError(401, "Authentication Failed"));
    }
}