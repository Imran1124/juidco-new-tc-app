import axios from './axios';

export const isValidToken = (token) => {
  if (!token) {
    return false;
  }
  return true;
};

// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export const setSession = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    // console.log('result', token);
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
};
