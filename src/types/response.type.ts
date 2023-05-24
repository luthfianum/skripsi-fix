export interface BaseResponseProps<T> {
  code: number;
  message: string;
  payload: T;
}

export interface ErrorResponseProps {
  code: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
  timestamp: string;
  url: string;
}

export interface BaseResponsePaginationProps<T> {
  code: number;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: Array<T>;
  };
}
