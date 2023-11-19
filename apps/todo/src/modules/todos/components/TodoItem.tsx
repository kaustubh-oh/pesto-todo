import {
  CircularProgress,
  IconButton,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { TASK_STATUS_ENUM } from '@pesto/shared';
import { GoTrash } from 'react-icons/go';
import { PiCheckCircleBold, PiCircleBold } from 'react-icons/pi';
import { ENDPOINTS, TASK_STATUS_CONFIG, Task } from '../../../shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask, fetchAllTasksQueryKeys } from '../../../logic';

interface TodoItemProps extends ListItemButtonProps {
  task: Task;
}

export function TodoItem({ task, ...props }: TodoItemProps) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: fetchAllTasksQueryKeys() });
    },
  });

  const taskConfig =
    TASK_STATUS_CONFIG[
      (task.status as TASK_STATUS_ENUM) ?? TASK_STATUS_ENUM.TODO
    ];

  return (
    <ListItemButton disableRipple color={'primary'} {...props}>
      {task.status && taskConfig.type === 'DONE' ? (
        <PiCheckCircleBold size={24} color={taskConfig.color} />
      ) : (
        <PiCircleBold size={24} color={taskConfig.color} />
      )}
      <ListItemText
        sx={{ ml: 1 }}
        primaryTypographyProps={{
          fontWeight: 'bold',
          sx: { ':first-letter': { textTransform: 'uppercase' } },
        }}
        primary={task.title}
      />
      <Toolbar variant="dense" disableGutters>
        {deleteMutation.isPending ? (
          <CircularProgress size={20} />
        ) : (
          <IconButton
            onClick={() => deleteMutation.mutate(task.id)}
            sx={{ m: -1 }}
          >
            <GoTrash size={18} />
          </IconButton>
        )}
      </Toolbar>
    </ListItemButton>
  );
}
