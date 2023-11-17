import { object, string } from 'yup';

export const TaskSchema = object({
  uuid: string().uuid(),
  name: string().required(),
  description: string().optional(),
});
