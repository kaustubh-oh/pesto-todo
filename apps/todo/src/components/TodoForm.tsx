import { IconButton, Input, Stack, Toolbar } from '@mui/material';
import { PiArrowRight } from 'react-icons/pi';

export function TodoForm() {
  const onSave = () => {};
  return (
    <Stack component={'form'} onSubmit={onSave} py={2}>
      <Input
        disableUnderline
        placeholder="I am going to"
        sx={{ fontSize: '1.5em' }}
        autoFocus
      />
      <Input
        disableUnderline
        placeholder="description"
        sx={{ fontSize: '0.9em', mt: -0.5 }}
      />
      <Toolbar
        sx={{ w: '100%', px: '0!important', minHeight: '2em!important' }}
      >
        <IconButton sx={{ ml: 'auto' }}>
          <PiArrowRight />
        </IconButton>
      </Toolbar>
    </Stack>
  );
}
