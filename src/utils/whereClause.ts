import { Op } from "sequelize";

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

export default createWhereClause;