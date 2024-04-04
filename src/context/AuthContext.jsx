import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { axios, setSession, authApi } from '../utils';

// ==================== AuthContext hook for authentication and authorization ====================

const AuthContext = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState(null);
  const [userRoutes, setUserRoutes] = useState([]);
  const [permittedWard, setPermittedWard] = useState([]);
  const authLocal = localStorage.getItem('authenticated');

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem('token');
      if (accessToken) {
        setSession(accessToken);
        const response = await axios.post(authApi.getUser);
        if (
          response?.data?.data?.userDetails
          // &&
          // response?.data?.data?.routes?.map((item) => item?.pages).flat(1)
          //   ?.length > 0
        ) {
          setIsAuthenticated(true);
          setIsInitialized(true);
          setUser(response?.data?.data?.userDetails);
          setUserRoutes(response?.data?.data?.routes);
          setPermittedWard(response?.data?.data?.permittedWard);
        } else {
          setIsAuthenticated(false);
          setIsInitialized(true);
          setUser(null);
          setUserRoutes(null);
          toast.error(
            'You are not authorized to access this page. Please contact admin.'
          );
        }

        // setIsAuthenticated(true);
        // setIsInitialized(true);
        // setUser(response?.data?.data?.userDetails);
      } else {
        setIsAuthenticated(false);
        setIsInitialized(true);
        setUser(null);
        setUserRoutes(null);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize, !authLocal, isAuthenticated]);

  // // LOGIN
  const login = async (response) => {
    try {
      const result = response?.data?.data;
      setSession(result?.token);
      setUser(result?.userDetails);
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('roles', JSON.stringify(result?.userDetails?.role));
      localStorage.setItem('citizen_token', result?.token);
      localStorage.setItem('citizenName', result?.userName);
      localStorage.setItem('citizenMobile', result?.mobile);
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithEPramaan = async (response) => {
    try {
      const result = response?.data;
      setSession(result?.token);
      setUser(result?.userDetails);
      setIsAuthenticated(true);
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('roles', JSON.stringify(result?.userDetails?.role));
      localStorage.setItem('citizen_token', result?.token);
      localStorage.setItem('citizenName', result?.userName);
      localStorage.setItem('citizenMobile', result?.mobile);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const logoutResponse = await axios.post(authApi.logout);
      if (logoutResponse?.data?.status) {
        setSession(null);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('roles');
        // navigate('/auth/login');
        toast.success('Logout Success');
      }
    } catch (error) {
      console.log(error);
      toast.error('Logout Failed');
    }
  };

  const logoutChangePassword = async () => {
    try {
      const logoutResponse = await axios.post(authApi.logout);
      if (logoutResponse?.data?.status) {
        setSession(null);
        setIsAuthenticated(false);
        setUser(null);
        // navigate('/auth/login');
        toast.success('Logout Success');
      }
    } catch (error) {
      console.log(error);
      toast.error('Logout Failed');
    }
  };

  return {
    isAuthenticated,
    isInitialized,
    user,
    login,
    logout,
    loginWithEPramaan,
    initialize,
    logoutChangePassword,
    userRoutes,
    permittedWard
  };
};

export default AuthContext;
