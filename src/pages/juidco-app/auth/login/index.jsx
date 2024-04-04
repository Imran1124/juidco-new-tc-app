import React from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {
  FormProvider,
  TextField,
  PasswordField,
  LoadingButton
} from '../../../../components/forms';
import Page from '../../../../components/helmet';
import useErrorAutoFocusField from '../../../../hooks/useErrorFocusField';
import { usePostMutation } from '../../../../hooks/useCustomQuery';
import { authApi } from '../../../../utils';
import { useAppContext } from '../../../../context';

export default function Login() {
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const ctxValue = useAppContext();
  const { mutateAsync, isLoading } = usePostMutation({});
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      type: 'mobile'
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Required'),
      password: Yup.string().required('Required')
    }),
    onSubmit: async (values) => {
      try {
        const response = await mutateAsync({
          api: authApi.login1,
          data: values
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
    }
  });

  const { isSubmitting, submitCount, errors } = formik;

  React.useEffect(() => {
    AutoFocusErrorField({ formik });
  }, [errors, submitCount, isSubmitting]);

  return (
    <Page title="Login">
      <div>
        {/* <h2 className=" font-semibold mb-4">Login with email No</h2> */}
        <FormProvider formik={formik}>
          <TextField
            label="email No"
            name="email"
            type="email"
            formik={formik}
            placeholder="Enter your register email no"
          />
          <PasswordField label="Password" name="password" formik={formik} />
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
