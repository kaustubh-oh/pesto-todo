import { useState } from 'react';

export function useEditOrNewForm<T>(defaultEditMode: {
  edit: boolean;
  id: string;
  initialValues: T;
}) {
  const [editMode, setEditMode] = useState(defaultEditMode);

  const editTask = (id: string, initialValues: T) => {
    setEditMode({
      edit: true,
      id,
      initialValues,
    });
  };

  const resetEditor = () => {
    setEditMode(defaultEditMode);
  };

  return {
    editMode,
    editTask,
    resetEditor,
  };
}
