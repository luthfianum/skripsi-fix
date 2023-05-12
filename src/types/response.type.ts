export interface BaseResponseProps<T> {
  code: number;
  message: string;
  payload: T;
}

export interface UploadResponseProps {
  code: string;
  message: string;
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
