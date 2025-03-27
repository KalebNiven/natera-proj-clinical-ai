import { Badge, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Chat, DocFilled } from '../icons/navigation';

type NavigationItem = {
  label: string;
  icon: React.ComponentType;
  path: string;
  notification?: number;
  disabled?: boolean;
};

const navigationItems: NavigationItem[] = [
  {
    label: 'Docs',
    icon: DocFilled,
    path: '/patients',
  },

  {
    label: 'Chats',
    icon: Chat,
    path: '/chats',
    notification: 9,
    disabled: true,
  },
];

export const NavigationRailItem = ({ item }: { item: NavigationItem }) => {
  return (
    <Box
      height="72px"
      width="72px"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <NavLink
        key={item.label}
        to={item.path}
        style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '56px',
          width: '54px',
          textDecoration: 'none',
          borderRadius: '8px',
          // pointerEvents: item.disabled ? 'none' : 'auto',
          gap: 1,
          color: isActive ? '#007EB8' : '#838485',
          backgroundColor: isActive ? '#E0ECF2' : 'transparent',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          opacity: item.disabled ? 0.5 : 1,
        })}
      >
        {item.notification ? (
          <Badge badgeContent={item.notification} color="error">
            <item.icon />
          </Badge>
        ) : (
          <item.icon />
        )}
        <Typography variant="subtitle2">{item.label}</Typography>
      </NavLink>
    </Box>
  );
};

export const NavigationRail = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '8px',
        paddingBottom: '8px',
        width: '72px',
        height: '100%',
        borderRight: '1px solid #D6D6D6',
        alignItems: 'center',
      }}
    >
      <Box height="72px" width="72px" />
      {navigationItems.map(item => (
        <NavigationRailItem key={item.label} item={item} />
      ))}
    </Box>
  );
};
