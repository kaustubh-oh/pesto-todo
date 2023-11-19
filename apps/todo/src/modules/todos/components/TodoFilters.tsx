import { Button, Palette, Stack } from '@mui/material';
import { TASK_STATUS_ENUM } from '@pesto/shared';
import { TASK_STATUS_CONFIG } from '../../../shared';
import { useFilters } from '../hooks/useFilters';

interface TodoFiltersProps
  extends Omit<
    ReturnType<typeof useFilters<TASK_STATUS_ENUM>>,
    'getFilteredData'
  > {}

export function TodoFilters({
  filters,
  filterByAll,
  filterByValue,
  ...props
}: TodoFiltersProps) {
  return (
    <Stack spacing={1} py={2} direction={'row'}>
      <Button
        size={'small'}
        disableElevation
        sx={{ minWidth: '4em', fontSize: '0.7em' }}
        color="success"
        variant={filters.length === 0 ? 'contained' : 'outlined'}
        onClick={() => filterByAll()}
      >
        All
      </Button>
      {Object.values(TASK_STATUS_ENUM).map((status) => {
        const config = TASK_STATUS_CONFIG[status];
        return (
          <Button
            size={'small'}
            key={status}
            onClick={() => filterByValue(status)}
            disableElevation
            color={config.palette}
            variant={filters.includes(status) ? 'contained' : 'outlined'}
            startIcon={<config.icon color={config.color} />}
            sx={{
              minWidth: '4em',
              fontSize: '0.7em',
            }}
          >
            {config.text}
          </Button>
        );
      })}
    </Stack>
  );
}
