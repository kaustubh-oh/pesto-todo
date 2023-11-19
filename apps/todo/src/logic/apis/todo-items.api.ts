import { InferType } from 'yup';
import {
  CreateTaskSchema,
  ENDPOINTS,
  TaskSchema,
  cleanUrlTrialingSlash,
} from '../../shared';
import { defaultAxiosInstance } from './base';

export const fetchAllTasks = async () => {
  const response = await defaultAxiosInstance.get<
    InferType<typeof TaskSchema>[]
  >(ENDPOINTS.TODO.ITEM);

  return response.data;
};

export const createTask = async (
  createTaskData: InferType<typeof CreateTaskSchema>
) => {
  const response = await defaultAxiosInstance.post<
    InferType<typeof TaskSchema>
  >(ENDPOINTS.TODO.ITEM, createTaskData);

  return response.data;
};

export const updateTask = async (
  id: string,
  updateTaskData: Partial<InferType<typeof CreateTaskSchema>>
) => {
  const response = await defaultAxiosInstance.patch<
    Partial<InferType<typeof TaskSchema>>
  >(`${cleanUrlTrialingSlash(ENDPOINTS.TODO.ITEM, true)}${id}`, updateTaskData);

  return response.data;
};
