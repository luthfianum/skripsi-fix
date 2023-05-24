import { Request } from "express";
import vars from "../config/vars";
import { Op } from "sequelize";
import { DefaultQuery } from "../types/base.type";

const createWhereClause = (startAt?: string, endAt?: string) => {
  let where = {};

  if (startAt && endAt) {
    where = {
      ...where,
      createdAt: {
        [Op.between]: [startAt, endAt],
      },
    };
  }

  return where;
};

const createPaginationLinks = (url: string, limit?: number, offset?: number) => {
  const meta = {
    prev: "",
    next: "",
  };

  if (limit) {
    if (offset) {
      meta.next = `${url}?limit=${limit}&offset=${(+offset) + (+limit)}`;
      meta.prev = `${url}?limit=${limit}&offset=${offset - limit}`;
    } else {
      meta.next = `${url}?limit=${limit}&offset=${limit}`;
      meta.prev = `${url}?limit=${limit}&offset=0`;
    }
  }

  return meta;
};

const metaMaker = (requestData: Request) => {
  const url = `${requestData.hostname}:${vars.port}${requestData.baseUrl}`;
  const { limit, offset, startAt, endAt }: DefaultQuery = requestData.query;

  const where = createWhereClause(startAt, endAt);
  const meta = createPaginationLinks(url, limit, offset);

  return { where, meta };
};

export default metaMaker;