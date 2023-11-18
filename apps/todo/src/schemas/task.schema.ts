import { date, mixed, object, string } from 'yup';
import { ListSchema } from './list.schema';
import { TASK_STATUS_ENUM } from '@pesto/shared';

export const CreateTaskSchema = object({
  title: string().required(),
  description: string().optional().default(''),
  status: mixed()
    .oneOf(Object.values(TASK_STATUS_ENUM))
    .default(TASK_STATUS_ENUM.TODO),
});

export const TaskSchema = CreateTaskSchema.shape({
  id: string().uuid(),
  createdAt: date(),
  updatedAt: date(),
});

export const TaskDetailSchema = TaskSchema.shape({
  list: ListSchema,
});
