import { array, date, object, string } from 'yup';
import { TaskSchema } from './task.schema';

export const CreateListSchema = object({
  icon: string().optional().default(''),
  title: string().min(2).required().default(''),
  description: string().optional().default(''),
});

export const ListSchema = CreateListSchema.shape({
  id: string(),
  createdAt: date(),
  updatedAt: date(),
});

export const ListDetailSchema = ListSchema.shape({
  items: array(TaskSchema).default([]),
});
