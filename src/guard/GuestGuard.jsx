import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context';

// comment: This component is used to check the authentication of the user and redirect to the login page if not authenticated.

export default function GuestGuard({ children }) {
  const ctxValue = useAppContext();
  // useEffect(() => {
  //   initialize();
  // }, []);

  if (ctxValue?.isAuthenticated) {
    return <Navigate to={'/juidco-app'} replace />;
  }

  return <>{children}</>;
}
