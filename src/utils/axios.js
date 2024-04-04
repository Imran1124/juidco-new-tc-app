import axios from 'axios';

// ----------------------------------------------------------------------
const axiosInstance = axios.create({
  // baseURL: 'https://smartulb.co.in/auth/api'
  baseURL: 'https://jharkhandegovernance.com/auth/api'
  // baseURL: 'http://172.18.1.103:8005/api'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // localStorage.removeItem('authenticated');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// intercept every response
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data?.authenticated == false) {
      delete axiosInstance.defaults.headers.common.Authorization;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.setItem('authenticated', response.data?.authenticated);
      // window.location.href = '/auth/login';
      window.location.reload();
    }
    return response;
  },
  async (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
