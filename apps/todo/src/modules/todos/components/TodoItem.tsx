import {
  CircularProgress,
  IconButton,
  IconButtonProps,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { TASK_STATUS_ENUM } from '@pesto/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GoTrash } from 'react-icons/go';
import { PiCheckCircleBold, PiCircleBold } from 'react-icons/pi';
import {
  deleteTask,
  fetchAllTasksQueryKeys,
  updateTask,
  updateTaskStatusMutationKeys,
} from '../../../logic';
import { TASK_STATUS_CONFIG, Task } from '../../../shared';

interface TodoItemProps extends ListItemButtonProps {
  task: Task;
  editTask: (task: Task) => void;
}

export function TodoItem({ task, ...props }: TodoItemProps) {
  const queryClient = useQueryClient();

  const taskConfig =
    TASK_STATUS_CONFIG[
      (task.status as TASK_STATUS_ENUM) ?? TASK_STATUS_ENUM.TODO
    ];

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: fetchAllTasksQueryKeys() });
    },
  });

  const updateStatusMutation = useMutation({
    mutationKey: updateTaskStatusMutationKeys(task.id),
    mutationFn: () => {
      return updateTask(task.id, { status: taskConfig.next });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: fetchAllTasksQueryKeys() });
    },
  });

  const updateTaskStatus: IconButtonProps['onClick'] = (e) => {
    e.stopPropagation();
    if (task.status !== TASK_STATUS_ENUM.DONE) {
      updateStatusMutation.mutate();
    }
  };

  const deleteTaskHandler: IconButtonProps['onClick'] = (e) => {
    e.stopPropagation();
    deleteMutation.mutate(task.id);
  };

  const editTaskHandler: ListItemButtonProps['onClick'] = (e) => {
    if (taskConfig.type !== 'DONE') props.editTask(task);
  };

  return (
    <ListItemButton
      disableRipple
      color={'primary'}
      {...props}
      onClick={editTaskHandler}
    >
      <IconButton
        disableRipple={task.status === TASK_STATUS_ENUM.DONE}
        onClick={updateTaskStatus}
        sx={{ m: -1 }}
      >
        {task.status && taskConfig.type === 'DONE' ? (
          <PiCheckCircleBold size={24} color={taskConfig.color} />
        ) : (
          <PiCircleBold size={24} color={taskConfig.color} />
        )}
      </IconButton>
      <ListItemText
        sx={{ ml: 1 }}
        primaryTypographyProps={{
          fontWeight: 'bold',
          sx: {
            ':first-letter': { textTransform: 'uppercase' },
            ...(task.status === TASK_STATUS_ENUM.DONE
              ? { textDecoration: 'line-through', color: 'grey' }
              : null),
          },
        }}
        primary={task.title}
        secondary={task.description}
        secondaryTypographyProps={{
          fontSize: '0.8em',
          sx: {
            fontStyle: 'italic',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            pr: 2,
          },
        }}
      />
      <Toolbar variant="dense" disableGutters>
        {deleteMutation.isPending ? (
          <CircularProgress size={20} />
        ) : (
          <IconButton onClick={deleteTaskHandler} sx={{ m: -1 }}>
            <GoTrash size={18} />
          </IconButton>
        )}
      </Toolbar>
    </ListItemButton>
  );
}
