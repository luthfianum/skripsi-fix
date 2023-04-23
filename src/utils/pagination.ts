import { Request } from "express";
import vars from "../config/vars";
import { Op } from "sequelize";
import { DefaultQuery } from "../types/base.type";

const metaMaker = (requestData: Request) => {
  const url = `${requestData.hostname}:${vars.port}${requestData.baseUrl}`;

  const { limit, offset, startAt, endAt }: DefaultQuery = requestData.query;
  let where = {};
  const meta = {
    prev: "",
    next: "",
  };

  if (startAt && endAt) {
    where = {
      ...where,
      createdAt: {
        [Op.between]: [startAt, endAt],
      },
    };
  }

  if (limit) {
    where = {
      ...where,
      limit: limit,
    };
    // set offset if ada
    if (offset) {
      where = {
        ...where,
        offset: offset,
      };
      meta.next = `${url}?limit=${limit}&offset=${(+offset) + (+limit)}`;
      meta.prev = `${url}?limit=${limit}&offset=${offset - limit}`;
    } else {
      meta.next = `${url}?limit=${limit}&offset=${limit}`;
      meta.prev = `${url}?limit=${limit}&offset=0`;
    }
  }

  return { where, meta };
}

export default metaMaker;