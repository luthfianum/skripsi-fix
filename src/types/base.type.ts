export interface DefaultQuery {
  limit?: number;
  offset?: number;

  startAt?: string;
  endAt?: string;
}

export interface jwtPayload {
  nim: string;
  id: string;
  role?: string;
  iat: number;
  exp: number;
}

export interface ICheckOptions {
  isSelf?: boolean,
  isFound?: boolean,
}

export const DefaultOption: ICheckOptions = {
  isSelf: false,
  isFound: true,
}

export interface ICheck {
  isFound?: boolean | null,
  isSelf?: boolean | null,
}