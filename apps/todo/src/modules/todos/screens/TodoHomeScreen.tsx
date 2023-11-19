import { Box, Container, SpeedDial, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PiPlus } from 'react-icons/pi';
import { fetchAllTasks, fetchAllTasksQueryKeys } from '../../../logic';
import { BottomDrawer, TodoItems } from '../../../ui';
import { TodoForm } from '../components/TodoForm';

const allTasksQueryKeys = fetchAllTasksQueryKeys();

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: allTasksQueryKeys,
    queryFn: fetchAllTasks,
    refetchOnWindowFocus: false,
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const renderContent = (
    <Box>
      <TodoForm edit={false} />
    </Box>
  );

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
            8 items pending
          </Typography>
        </Stack>
        <Stack>
          {!isLoading && data ? <TodoItems data={data} /> : 'Loading...'}
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
        onCloseHandler={() => {}}
      >
        {renderContent}
      </BottomDrawer>
    </Container>
  );

  return mainBody;
  // return <DefaultLayout>{mainBody}</DefaultLayout>;
}
