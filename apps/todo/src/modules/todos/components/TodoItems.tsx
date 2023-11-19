import { List, ListItem } from '@mui/material';
import { Task } from '../../../shared';
import { TodoItem } from './TodoItem';

interface TodoItemsProps {
  data: Task[];
  editTask: (task: Task) => void;
}

export function TodoItems({ data, ...props }: TodoItemsProps) {
  return (
    <List>
      {data?.map((task) => {
        return (
          <ListItem key={task.id} disablePadding>
            <TodoItem task={task} editTask={props.editTask} />
          </ListItem>
        );
      })}
    </List>
  );
}
