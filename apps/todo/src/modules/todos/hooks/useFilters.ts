import { useState } from 'react';

export function useFilters<T>(initialFilters: T[]) {
  const [filters, setStatusFilters] = useState<T[]>(initialFilters);

  const filterByAll = () => {
    if (filters.length > 0) {
      setStatusFilters([]);
    } else {
      setStatusFilters(initialFilters);
    }
  };

  const filterByValue = (filter: T) => {
    const idx = filters.indexOf(filter);
    if (idx > -1) {
      setStatusFilters((filters) => {
        const draft = [...filters];
        draft.splice(idx, 1);
        return draft;
      });
    } else {
      setStatusFilters((filters) => [...filters, filter]);
    }
  };

  function getFilteredData<K extends string, V extends { [a in K]: T }>(
    data: V[],
    key: K
  ) {
    return data
      ? data.filter(
          (data) => filters.length === 0 || filters.includes(data[key] as T)
        )
      : [];
  }

  return { filters, filterByAll, filterByValue, getFilteredData };
}
