import { PropsWithChildren } from 'react';
import { Container, Stack } from '@mui/material';
import { useLayoutContext } from '../../context';

export const Layout = ({ children }: PropsWithChildren) => {
  const { headerHeight } = useLayoutContext();

  return (
    <Container>
      <Stack sx={{ py: 2, minHeight: `calc(100vh - ${headerHeight}px)` }}>{children}</Stack>
    </Container>
  );
};
