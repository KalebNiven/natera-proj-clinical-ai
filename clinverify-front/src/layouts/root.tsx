import { NavigationRail } from '@/components/navigation-rail/navigation-rail';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
  return (
    <Box display="flex" height="100dvh" width="100vw">
      <NavigationRail />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
    </Box>
  );
};
