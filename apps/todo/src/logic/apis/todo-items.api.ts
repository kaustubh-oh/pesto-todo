import { InferType } from 'yup';
import {
  CreateTaskSchema,
  ENDPOINTS,
  REST_METHODS_ENUM,
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

export const fetchAllTasksQueryKeys = () => [
  REST_METHODS_ENUM.GET,
  ENDPOINTS.TODO.ITEM,
];

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

export const updateTaskMutationKeys = (id: string) => [
  REST_METHODS_ENUM.PATCH,
  ENDPOINTS.TODO.ITEM,
  id,
];

export const updateTaskStatusMutationKeys = (id: string) => [
  REST_METHODS_ENUM.PATCH,
  ENDPOINTS.TODO.ITEM,
  id,
  'task_status',
];

export const deleteTask = async (id: string) => {
  const response = await defaultAxiosInstance.delete(
    `${cleanUrlTrialingSlash(ENDPOINTS.TODO.ITEM, true)}${id}`
  );

  return response.data;
};
