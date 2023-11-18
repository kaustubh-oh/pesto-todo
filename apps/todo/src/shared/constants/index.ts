import { green, grey, orange } from '@mui/material/colors';
import { TASK_STATUS_ENUM } from '@pesto/shared';

export const ENDPOINTS = {
  TODO: {
    LIST: '/todo-lists',
    ITEM: '/todo-items',
  },
};

export const TASK_STATUS_CONFIG = {
  [TASK_STATUS_ENUM.TODO]: {
    text: 'To Do',
    type: 'TODO',
    color: grey[500],
  },
  [TASK_STATUS_ENUM.IN_PROGRESS]: {
    text: 'In Progress',
    type: 'IN_PROGRESS',
    color: orange[500],
  },
  [TASK_STATUS_ENUM.DONE]: {
    text: 'Done',
    type: 'DONE',
    color: green[500],
  },
};
