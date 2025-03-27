import { HeaderBar } from '@/components/header/header-bar';
import { Box } from '@mui/material';
import React from 'react';

export const PatientsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display="flex" flexDirection="column" height="100dvh">
      <HeaderBar />
      <Box
        flexGrow={1}
        overflow="auto"
        sx={{
          scrollbarGutter: 'stable',
          scrollbarColor: 'lightgray white',
          scrollbarWidth: 'thin',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
