import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { InferType } from 'yup';
import { TaskSchema } from '../schemas';
import { PiCheckCircleBold, PiCircleBold } from 'react-icons/pi';
import { TASK_STATUS_CONFIG } from '../shared';
import { TASK_STATUS_ENUM } from '@pesto/shared';

interface TodoItemsProps {
  data: InferType<typeof TaskSchema>[];
}

export function TodoItems({ data, ...props }: TodoItemsProps) {
  return (
    <List>
      {data?.map((task) => {
        const taskConfig =
          TASK_STATUS_CONFIG[
            (task.status as TASK_STATUS_ENUM) ?? TASK_STATUS_ENUM.TODO
          ];
        return (
          <ListItem key={task.id} disablePadding>
            <ListItemButton color={'primary'}>
              {task.status && taskConfig.type == 'DONE' ? (
                <PiCheckCircleBold size={24} color={taskConfig.color} />
              ) : (
                <PiCircleBold size={24} color={taskConfig.color} />
              )}
              <ListItemText
                sx={{ ml: 1, textTransform: 'capitalize' }}
                primary={task.title}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
