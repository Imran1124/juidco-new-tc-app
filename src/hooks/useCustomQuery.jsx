// Project: Juidco Municipal Corporation
// Name : Imran Alam
// Date and time: 05/02/2024, 11:00 AM
// Description: useApi hook for fetching data from api and useMutation for post method api call with
// axios instance and react-query library for state management and caching.
// Test cases: none
// Open issues: none
// Risks: none
// Last updated: 05/02/2024, 11:00 AM
// Unit Test Cases: none

import { useQuery, useMutation } from 'react-query';
import { axios } from '../utils';

// ==================== get method api call with axios instance and react-query library for state management and caching ====================
export function useApi({ key, api, options, value, config }) {
  const result = useQuery({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => {
      const res = await axios.get(api, {
        ...config
      });
      return res?.data;
    },
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options
  });
  return result;
}

// ==================== post method api call with axios instance and react-query library for state management and caching ====================
export function useApiPost({ key, api, options, value, config }) {
  const result = useQuery({
    queryKey: [key ?? api, ...(value ?? [])],
    queryFn: async () => {
      const res = await axios.post(api, {
        ...config
      });
      return res?.data;
    },
    refetchOnReconnect: 'always',
    refetchOnWindowFocus: false,
    ...options
  });
  return result;
}

// ==================== post method api call with axios instance and react-query library for state management and caching using useMutation ====================
const postApi = (api, data) => {
  return axios.post(api, data);
};

export const usePostMutation = ({ options }) => {
  return useMutation({
    mutationFn: ({ api, data }) => postApi(api, data),
    ...options
  });
};
