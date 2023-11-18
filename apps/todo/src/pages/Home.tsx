import {
  Box,
  Container,
  Divider,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

export function Home() {
  return (
    <Container maxWidth="md">
      <Stack>
        <Stack py={4} justifyContent={'center'} alignItems={'center'}>
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
}
