export interface DefaultQuery {
  limit?: number;
  offset?: number;

  startAt?: string;
  endAt?: string;
}

export type meta = {
  next: string;
  prev: string;
}



export interface JwtPayload {
  nim: string;
  id: string;
  role?: string;
  iat: number;
  exp: number;
}

export type ICheckOptions = Partial<ICheck>

export const DefaultOption: ICheckOptions = {
  isSelf: false,
  isFound: true,
}

export interface ICheck {
  isFound?: boolean | null,
  isSelf?: boolean | null,
}