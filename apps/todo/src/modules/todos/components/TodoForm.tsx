import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, Input, Stack, Toolbar } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { PiArrowRight } from 'react-icons/pi';
import { InferType } from 'yup';
import { createTask, fetchAllTasksQueryKeys, updateTask } from '../../../logic';
import { CreateTaskSchema, ENDPOINTS } from '../../../shared';
interface TodoFormProps {
  edit: boolean;
  id?: string;
  initialValues?: InferType<typeof CreateTaskSchema>;
  onComplete: () => void;
}

export function TodoForm(props: TodoFormProps) {
  const queryClient = useQueryClient();
  const { register, reset, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateTaskSchema),
    defaultValues: CreateTaskSchema.cast(props.initialValues, {
      assert: false,
    }),
  });

  const mutation = useMutation({
    mutationKey: [
      ENDPOINTS.TODO.ITEM,
      ...(props.edit && props?.id ? [props.id] : []),
    ],
    mutationFn: (data: InferType<typeof CreateTaskSchema>) =>
      props.edit && props.id ? updateTask(props.id, data) : createTask(data),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: fetchAllTasksQueryKeys() });
    },
  });

  const onSave: Parameters<typeof handleSubmit>[0] = (data) => {
    mutation.mutate(data);
    reset();
    props.onComplete();
  };

  return (
    <Stack component={'form'} onSubmit={handleSubmit(onSave)} py={2}>
      <Input
        disableUnderline
        placeholder="I am going to"
        sx={{ fontSize: '1.5em' }}
        {...register('title')}
        error={!!formState.errors.title}
      />
      <Input
        disableUnderline
        placeholder="description"
        {...register('description')}
        sx={{ fontSize: '0.9em', mt: -0.5 }}
      />
      <Toolbar
        sx={{ w: '100%', px: '0!important', minHeight: '2em!important' }}
      >
        <IconButton type={'submit'} sx={{ ml: 'auto' }}>
          <PiArrowRight />
        </IconButton>
      </Toolbar>
    </Stack>
  );
}
