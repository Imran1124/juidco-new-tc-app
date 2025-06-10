import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {
  TextField,
  PasswordField,
  LoadingButton
} from '../../../../components/forms';
import Page from '../../../../components/helmet';
import useErrorAutoFocusField from '../../../../hooks/useErrorFocusField';
import { usePostMutation } from '../../../../hooks/useCustomQuery';
import { authApi } from '../../../../utils';
import { useAppContext } from '../../../../context';
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { encryptPassword } from '../../../../hooks/useCrypto';

export default function Login() {
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const ctxValue = useAppContext();
  const { mutateAsync, isLoading } = usePostMutation({});

  // sasadasd
  const methods = useForm({
    defaultValues: {
      email: '',
      password: '',
      type: 'mobile'
    },
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required')
      })
    )
  });

  const onSubmit = async (data) => {
    try {
      const response = await mutateAsync({
        api: authApi.login1,
        data: {
          email: data.email,
          password: encryptPassword(data.password),
          type: data.type
        }
      });
      if (response?.data?.status === true) {
        ctxValue?.login(response);
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { handleSubmit, formState } = methods;

  return (
    <Page title="Login">
      <div>
        {/* <h2 className=" font-semibold mb-4">Login with email No</h2> */}
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <RHFTextField label="Password" name="password" />
          <div className="text-center mt-8">
            <LoadingButton
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              Login
            </LoadingButton>
          </div>
          {/* reset password */}

          <div className="text-center mt-4">
            <Link to="/juidco-app/auth/register" className="text-[#5846BE]">
              Register
            </Link>
            &nbsp; | &nbsp;
            <Link to="#" className="text-[#5846BE]">
              Forgot Password
            </Link>
          </div>
        </FormProvider>
      </div>
    </Page>
  );
}
