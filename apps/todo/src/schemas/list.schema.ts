import { object, string } from 'yup';

export const ListSchema = object({
  icon: string(),
  name: string().min(2).required().default(''),
  description: string().optional(),
});
