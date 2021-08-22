export type TLoadingAndErrorState = {
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export type NormalizeError = {
  data: {
    status: number;
    message: string;
    statusText: string;
    raw: any;
  };
};

export type ResponseError = {
  data: any;
  status: 'error';
};
