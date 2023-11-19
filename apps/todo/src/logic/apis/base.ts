import axios from 'axios';
import { envConfig } from '../../config';

export const defaultAxiosInstance = axios.create({
  baseURL: envConfig.apiUrl,
});
