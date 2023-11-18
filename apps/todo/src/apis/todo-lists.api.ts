import { InferType } from 'yup';
import { ENDPOINTS, cleanUrlTrialingSlash } from '../shared';
import { defaultAxiosInstance } from './base';
import { CreateListSchema, ListDetailSchema, ListSchema } from '../schemas';

export const fetchAllLists = async () => {
  const response = await defaultAxiosInstance.get<InferType<typeof ListSchema>>(
    ENDPOINTS.TODO.LIST
  );

  return response.data;
};

export const fetchListDetails = async (id: string) => {
  const response = await defaultAxiosInstance.get<
    InferType<typeof ListDetailSchema>
  >(`${cleanUrlTrialingSlash(ENDPOINTS.TODO.LIST, true)}${id}`);

  return response.data;
};

export const createList = async (
  createListData: InferType<typeof CreateListSchema>
) => {
  const response = await defaultAxiosInstance.post<
    InferType<typeof ListSchema>
  >(ENDPOINTS.TODO.LIST, createListData);

  return response.data;
};

export const updateList = async (
  id: string,
  updateListData: Partial<InferType<typeof CreateListSchema>>
) => {
  const response = await defaultAxiosInstance.patch<
    Partial<InferType<typeof ListSchema>>
  >(`${cleanUrlTrialingSlash(ENDPOINTS.TODO.LIST, true)}${id}`, updateListData);

  return response.data;
};
