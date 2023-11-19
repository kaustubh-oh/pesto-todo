import axios, { AxiosError, AxiosResponse } from 'axios';
import { envConfig } from '../../config';

import { enqueueSnackbar } from 'notistack';

export const defaultAxiosInstance = axios.create({
  baseURL: envConfig.apiUrl,
});

export interface ErrorResponseBody {
  error: string;
  message: string[];
  statusCode: number;
}

defaultAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ErrorResponseBody>) => {
    enqueueSnackbar(error?.response?.data?.message[0], { variant: 'error' });
  }
);
