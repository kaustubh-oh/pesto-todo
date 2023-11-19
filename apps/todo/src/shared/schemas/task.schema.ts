import { InferType, date, mixed, object, string } from 'yup';
// import { ListSchema } from './list.schema';
import { TASK_STATUS_ENUM } from '@pesto/shared';

export const CreateTaskSchema = object({
  title: string().required(),
  description: string().optional().default(''),
  status: mixed<TASK_STATUS_ENUM>()
    .oneOf(Object.values(TASK_STATUS_ENUM))
    .optional()
    .default(TASK_STATUS_ENUM.TODO),
}).noUnknown();

export const TaskSchema = CreateTaskSchema.shape({
  id: string().required().uuid(),
  createdAt: date(),
  updatedAt: date(),
});

// export const TaskDetailSchema = TaskSchema.shape({
//   list: ListSchema,
// });

export type Task = InferType<typeof TaskSchema>;
export type CreateTask = InferType<typeof CreateTaskSchema>;
export type UpdateTask = InferType<typeof CreateTaskSchema>;
