import { yupResolver } from '@hookform/resolvers/yup';
import {
  FormHelperText,
  IconButton,
  Input,
  Stack,
  Toolbar,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { InferType } from 'yup';
import { createTask, fetchAllTasksQueryKeys, updateTask } from '../../../logic';
import {
  CreateTask,
  CreateTaskSchema,
  ENDPOINTS,
  REST_METHODS_ENUM,
} from '../../../shared';
interface TodoFormProps {
  edit: boolean;
  id?: string;
  initialValues?: InferType<typeof CreateTaskSchema>;
  onComplete: () => void;
}

export function TodoForm(props: TodoFormProps) {
  const queryClient = useQueryClient();

  const { register, reset, handleSubmit, formState } = useForm({
    mode: 'onChange',
    resolver: yupResolver(CreateTaskSchema),
    defaultValues: CreateTaskSchema.cast(props.initialValues, {
      assert: false,
    }),
  });

  console.log('errors', formState.errors);

  const mutation = useMutation({
    mutationKey: [
      props.edit ? REST_METHODS_ENUM.PATCH : REST_METHODS_ENUM.POST,
      ENDPOINTS.TODO.ITEM,
      ...(props.edit && props?.id ? [props.id] : []),
    ],
    mutationFn: ({
      edit = false,
      data,
      id = '',
    }: {
      edit: boolean;
      data: CreateTask;
      id?: string;
    }) => (edit && id ? updateTask(id, data) : createTask(data)),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: fetchAllTasksQueryKeys() });
      reset();
      props.onComplete();
    },
  });

  const onSave: Parameters<typeof handleSubmit>[0] = (data) => {
    mutation.mutate({ edit: props.edit, data, id: props?.id });
  };

  return (
    <Stack component={'form'} onSubmit={handleSubmit(onSave)} py={2}>
      <Input
        disableUnderline
        placeholder="I am going to"
        sx={{ fontSize: '1.5em' }}
        {...register('title')}
      />
      {formState.dirtyFields.title && !!formState.errors.title ? (
        <FormHelperText error={true} sx={{ fontStyle: 'italic', mt: -0.5 }}>
          {formState.errors.title.message}
        </FormHelperText>
      ) : null}
      <Input
        disableUnderline
        placeholder="description"
        {...register('description')}
        sx={{ fontSize: '0.9em', mt: -0.5 }}
      />
      {formState.dirtyFields.description && !!formState.errors.description ? (
        <FormHelperText error={true} sx={{ fontStyle: 'italic', mt: -0.5 }}>
          {formState.errors.description.message}
        </FormHelperText>
      ) : null}
      <Toolbar
        sx={{ w: '100%', px: '0!important', minHeight: '2em!important' }}
      >
        <IconButton
          disabled={Object.values(formState.errors).length > 0}
          type={'submit'}
          color={'primary'}
          sx={{ ml: 'auto' }}
        >
          <PiArrowRightBold />
        </IconButton>
      </Toolbar>
    </Stack>
  );
}
