import { LogoClinverify, LogoNateraTypography } from '@/components/icons/logo';
import { Avatar, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export const HeaderBar = () => {
  return (
    <Box
      minHeight="80px"
      height="80px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX="32px"
    >
      <Link to="/">
        <Box display="flex" alignItems="center" gap={2}>
          <LogoNateraTypography />
          <LogoClinverify />
        </Box>
      </Link>
      <Avatar sx={{ bgcolor: '#0281BD' }}>N</Avatar>
    </Box>
  );
};
