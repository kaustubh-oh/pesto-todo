import { Button, Container, SpeedDial, Stack, Typography } from '@mui/material';
import { TASK_STATUS_ENUM } from '@pesto/shared';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PiPlus } from 'react-icons/pi';
import { fetchAllTasks, fetchAllTasksQueryKeys } from '../../../logic';
import { CreateTaskSchema, TASK_STATUS_CONFIG, Task } from '../../../shared';
import { BottomDrawer, TodoItems } from '../../../ui';
import { TodoForm } from '../components/TodoForm';
import { useEditOrNewForm } from '../hooks/useEditor';
import { useFilters } from '../hooks/useFilters';
import { TodoFilters } from '../components/TodoFilters';

const allTasksQueryKeys = fetchAllTasksQueryKeys();

const defaultEditMode = {
  edit: false,
  id: '',
  initialValues: CreateTaskSchema.cast({}, { assert: false }),
};

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: allTasksQueryKeys,
    queryFn: fetchAllTasks,
    refetchOnWindowFocus: false,
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const { editMode, editTask, resetEditor } = useEditOrNewForm(defaultEditMode);

  const { getFilteredData, ...filterProps } = useFilters([
    TASK_STATUS_ENUM.TODO,
    TASK_STATUS_ENUM.IN_PROGRESS,
  ]);

  const editTaskHandler = (task: Task) => {
    editTask(
      task.id,
      CreateTaskSchema.cast(task, {
        assert: false,
        stripUnknown: false,
      })
    );
    setIsEditorOpen(true);
  };

  const onComplete = () => {
    setIsEditorOpen(false);
    resetEditor();
  };

  const onCloseHandler = () => {
    setIsEditorOpen(false);
    resetEditor();
  };

  const numCompleted = data
    ? data.reduce(
        (numCompleted, task) =>
          (numCompleted +=
            TASK_STATUS_CONFIG[task.status as TASK_STATUS_ENUM].type === 'DONE'
              ? 1
              : 0),
        0
      )
    : 0;

  const filteredData = getFilteredData(data, 'status');

  const mainBody = (
    <Container maxWidth="md">
      <Stack>
        <Stack py={4} justifyContent={'center'} alignItems={'center'}>
          <Typography variant="h3" textTransform={'uppercase'}>
            To Do List
          </Typography>
          <Typography
            variant="caption"
            color={'gray'}
            textTransform={'uppercase'}
          >
            {numCompleted}/{data?.length} tasks completed
          </Typography>
          <TodoFilters {...filterProps} />
        </Stack>
        <Stack pb={10}>
          {!isLoading && filteredData ? (
            <TodoItems data={filteredData} editTask={editTaskHandler} />
          ) : (
            'Loading...'
          )}
        </Stack>
      </Stack>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: '48%' }}
        icon={<PiPlus size={30} />}
        onClick={() => {
          setIsEditorOpen(true);
        }}
      ></SpeedDial>

      <BottomDrawer
        isOpen={isEditorOpen}
        setIsOpen={setIsEditorOpen}
        onCloseHandler={onCloseHandler}
      >
        <TodoForm onComplete={onComplete} {...editMode} />
      </BottomDrawer>
    </Container>
  );

  return mainBody;
  // return <DefaultLayout>{mainBody}</DefaultLayout>;
}
