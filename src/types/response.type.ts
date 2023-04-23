export interface BaseResponseProps<T> {
  code: string;
  message: string;
  payload: T;
}

export interface UploadResponseProps {
  code: string;
  message: string;
}

export interface BaseResponsePaginationProps<T> {
  code: string;
  message: string;
  payload: {
    count: number;
    prev: string;
    next: string;
    results: Array<T>;
  };
}
