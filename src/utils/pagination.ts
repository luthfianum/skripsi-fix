import { Request } from "express";
import vars from "../config/vars";
import { DefaultQuery } from "../types/base.type";
import createPaginationLinks from "./paginationLink";
import createWhereClause from "./whereClause";

const metaMaker = (requestData: Request) => {
  const url = `${requestData.hostname}:${vars.port}${requestData.baseUrl}`;
  const { limit, offset, startAt, endAt }: DefaultQuery = requestData.query;

  const where = createWhereClause(startAt, endAt);
  const meta = createPaginationLinks(url, limit, offset);

  return { where, meta };
};

export default metaMaker;