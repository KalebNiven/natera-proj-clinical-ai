import { ArrowLeft, Pause } from '@/components/icons/navigation';
import { Box, Button, Chip, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

export const PatientsDetailLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { caseBundlingId } = useParams();
  return (
    <Box display="flex" flexDirection="column" height="100dvh">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height={'72px'}
        borderBottom={'1px solid #D6D6D6'}
        padding={'16px 32px'}
      >
        <Box display="flex" alignItems="center" gap={'8px'}>
          <Link
            to="/patients"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft />
          </Link>
          <Typography
            fontWeight={500}
            fontSize={'17px'}
            lineHeight={'20px'}
            fontFamily={'Roboto'}
          >
            Case Bundling ID
          </Typography>
          <Chip
            label={caseBundlingId}
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 100, 149, 0.2)',
              backgroundOpacity: 0.2,
              color: '#0081BD',
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={'8px'}>
          <Button variant="outlined" color="primary" disabled>
            Finish Review
          </Button>
          <Button variant="outlined" color="primary">
            <Pause />
            Pause Review
          </Button>
        </Box>
      </Box>
      <Box flexGrow={1}>{children}</Box>
    </Box>
  );
};
