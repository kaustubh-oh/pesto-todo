import { Container, RadioGroup, Stack, Typography } from '@mui/material';
import { DefaultLayout } from '../layouts/DefaultLayout';

export function Home() {
  const mainBody = (
    <Container maxWidth="md">
      <Stack>
        <Stack pb={4} justifyContent={'center'} alignItems={'center'}>
          <Typography variant="h3">To Do List</Typography>
          <Typography
            variant="caption"
            color={'gray'}
            textTransform={'uppercase'}
          >
            8 items pending
          </Typography>
        </Stack>
        <Stack>
          <RadioGroup></RadioGroup>
        </Stack>
      </Stack>
    </Container>
  );

  return <DefaultLayout>{mainBody}</DefaultLayout>;
}
