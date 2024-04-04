import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateMachine } from 'little-state-machine';
import { Button } from '@material-tailwind/react';
import { useApiPost } from '../../../../hooks/useCustomQuery';
import { authApi, updateAction } from '../../../../utils';
import { useAppContext } from '../../../../context';
import RotatingLoader from '../../../../components/loaders/RotatingLoader';

export default function RedirectEPramaan() {
  const ctxValue = useAppContext();
  const { state } = useStateMachine({ updateAction });
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');

  const { data, isFetching } = useApiPost({
    api: authApi?.ePramanRedirect,
    key: 'redirectEpramaan',
    config: {
      type: 'mobile',
      code: code,
      nonce: state?.ePramaan?.nonce,
      codeVerifier: state?.ePramaan?.codeVerifier
    },
    value: [code],
    options: {
      enable: !!code,
      onSuccess: (response) => {
        if (response?.status) {
          ctxValue?.loginWithEPramaan(response);
        } else {
          navigate('/juidco-app/auth/e-praman-login');
        }
      },
      onError: (error) => {
        navigate('/juidco-app/auth/e-praman-login');
      }
    }
  });

  if (isFetching) {
    return (
      <div className="flex flex-col h-28">
        <RotatingLoader />
        <div className="flex flex-col flex-1 items-center justify-center">
          <div className="flex flex-col items-center">
            <h1 className="text-base font-bold text-gray-600">
              Please wait...
            </h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-28">
      <div className="flex flex-col flex-1 items-center justify-center">
        <div className="flex flex-col items-center">
          <Button
            color="blue"
            onClick={() => navigate('/juidco-app/auth/e-praman-login')}
          >
            Go back to E-Praman Login
          </Button>
        </div>
      </div>
    </div>
  );
}
