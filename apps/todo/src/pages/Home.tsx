import { Box, Stack, Typography } from '@mui/material';

export function Home() {
  return (
    <Box>
      <Stack>
        <Stack py={6} justifyContent={'center'} alignItems={'center'}>
          <Typography variant="h3">To Do List</Typography>
        </Stack>
        <Box>hi there</Box>
      </Stack>
    </Box>
  );
}
