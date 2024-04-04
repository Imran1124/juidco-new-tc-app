import React from 'react';
import { useStateMachine } from 'little-state-machine';
import toast from 'react-hot-toast';
import Page from '../../../../components/helmet';
import { usePostMutation } from '../../../../hooks/useCustomQuery';
import { authApi, updateAction } from '../../../../utils';
import RotatingLoader from '../../../../components/loaders/RotatingLoader';
import Login from '../login';
import LazyImage from '../../../../components/image/LazyImage';

export default function EPramanLogin() {
  const { actions, state } = useStateMachine({ updateAction });
  const { mutateAsync, isLoading } = usePostMutation({});
  const handleLogin = async () => {
    try {
      const response = await mutateAsync({
        api: authApi?.ePramanLogin,
        data: {
          type: 'mobile'
        }
      });
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        actions?.updateAction({
          ePramaan: {
            codeVerifier: response?.data?.data?.code_verifier,
            nonce: response?.data?.data?.nonce,
            url: response?.data?.data?.url
          }
        });
        // window.location.replace(response?.data?.data?.url);
        window.location.href = response?.data?.data?.url;
      } else {
        toast.error(response?.data?.message);
        actions?.updateAction({
          ePramaan: {
            codeVerifier: '',
            nonce: '',
            url: ''
          }
        });
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (isLoading) {
    return <RotatingLoader />;
  }

  return (
    <Page title="Auth">
      <div className="w-full">
        <div>
          <h2 className="font-semibold mb-4 text-blue-700"></h2>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <button
            onClick={handleLogin}
            type="button"
            className="text-gray-700 font-semibold w-full justify-center bg-gray-300 hover:bg-gray-200 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
          >
            <LazyImage
              src="/images/epraman.webp"
              alt="EPraman"
              className="w-6 h-5 me-2 -ms-1"
            />
            Login with E-Praman
          </button>
        </div>
        {/* <div className="flex flex-col items-center justify-center mt-2">
        <small className="text-gray-500 text-center">
          If you have an account with E-Praman, you can login with your E-Praman
          account.
        </small>
      </div> */}
        {/* or line extra login  */}
        <div className="flex flex-col items-center justify-center mt-4">
          <div className="flex items-center justify-center">
            <div className="w-1/3 border-b border-gray-300"></div>
            <div className="mx-2 text-gray-500">or</div>
            <div className="w-1/3 border-b border-gray-300"></div>
          </div>
        </div>
        <div>
          <Login />
        </div>
      </div>
    </Page>
  );
}
