import Meta from "../types/base.type";

const createPaginationLinks = (url: string, limit?: number, offset?: number) => {
  const meta: Meta = {
    prev: '',
    next: '',
  };

  if (limit) {
    meta.next = `${url}?limit=${limit}&offset=${offset ? +offset + +limit : limit}`;
    meta.prev = `${url}?limit=${limit}&offset=${offset ? offset - limit : 0}`;
  }

  return meta;
};

export default createPaginationLinks;