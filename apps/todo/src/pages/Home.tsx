import { Container, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchAllTasks } from '../apis/todo-items.api';
import { TodoItems } from '../components/TodoItems';
import { ENDPOINTS } from '../shared';

export function Home() {
  const { data, isLoading } = useQuery({
    queryKey: [ENDPOINTS.TODO.ITEM],
    queryFn: fetchAllTasks,
    refetchOnWindowFocus: false,
  });

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
    </Container>
  );

  return mainBody;
  // return <DefaultLayout>{mainBody}</DefaultLayout>;
}
