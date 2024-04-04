import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { useAppContext } from '../context';

// comment: This component is used to check the authentication of the user and redirect to the login page if not authenticated.
// It also checks the user's access to the page and redirects to the 403 page if the user is not authorized to access the page.
// It also checks the requested location and redirects to the requested location if the user is authenticated and authorized to access the page.

AuthGuard.propTypes = {
  children: PropTypes.node
};

export default function AuthGuard({ children }) {
  const ctxValue = useAppContext();
  const { pathname, search } = useLocation();
  const { id } = useParams();
  const [requestedLocation, setRequestedLocation] = useState(null);

  const isAuthPath = () => {
    // const flatRoutes = ctxValue?.userRoutes
    //   ?.map((item) => item?.pages)
    //   ?.flat(1);
    let authPath = [
      // ...(flatRoutes?.map((el) =>
      //   id ? el?.route + '/' + id : search ? el?.route + search : el?.route
      // ) || []),
      '/juidco-app/home',
      '/juidco-app/water-tanker'
    ]?.includes(search ? pathname + search : pathname);
    return authPath;
  };

  if (!ctxValue?.isInitialized) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold text-gray-600">Please wait...</h1>
          </div>
        </div>
      </div>
    );
  }

  if (!ctxValue?.isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to="/juidco-app/auth/e-praman-login" />;
  }

  // if (ctxValue?.isAuthenticated && !isAuthPath()) {
  //   return (
  //     <div className="flex flex-col h-screen">
  //       <div className="flex flex-col flex-1 items-center justify-center">
  //         <div className="flex flex-col items-center">
  //           <h1 className="text-lg font-bold text-gray-600">
  //             403
  //             <span className="text-lg font-medium text-gray-400"> | </span>
  //             Unauthorized
  //           </h1>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
