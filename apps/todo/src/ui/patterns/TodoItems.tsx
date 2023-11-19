import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { TASK_STATUS_ENUM } from '@pesto/shared';
import { PiCheckCircleBold, PiCircleBold } from 'react-icons/pi';
import { InferType } from 'yup';
import { TASK_STATUS_CONFIG, TaskSchema } from '../../shared';

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
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
