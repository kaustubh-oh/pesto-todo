import { Container, Drawer, DrawerProps } from '@mui/material';
import { ComponentProps } from 'react';

interface BottomDrawerProps {
  onCloseHandler: () => void;
  isOpen: boolean;
  setIsOpen: (keepOpen: boolean) => void;
  children: React.ReactNode;
  modalProps?: ComponentProps<typeof Drawer>;
}

export const BottomDrawer = (props: BottomDrawerProps) => {
  const { isOpen, setIsOpen, onCloseHandler } = props;

  const onClose: DrawerProps['onClose'] = () => {
    onCloseHandler();
    setIsOpen(false);
  };
  return (
    <Drawer
      anchor={'bottom'}
      open={isOpen}
      onClose={onClose}
      hideBackdrop={false}
      sx={{
        '& .MuiDrawer-paper': {
          maxWidth: 'sm',
          mx: 'auto',
          mb: 2,
          borderRadius: 4,
          boxSizing: 'border-box',
        },
      }}
      {...props.modalProps}
    >
      <Container maxWidth={'sm'} sx={{ minHeight: '100px', maxHeight: '80vh' }}>
        {props.children}
      </Container>
    </Drawer>
  );
};
