import { Navigate, useNavigate } from 'react-router-dom';

// TODO: Auth check
const IS_AUTHENTICATED = true;

export const HomePage = () => {
  const navigate = useNavigate();

  if (!IS_AUTHENTICATED) {
    navigate('/login');
  }

  return <Navigate to="/patients" />;
};
