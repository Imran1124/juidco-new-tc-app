import React from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {
  TextField,
  FormProvider,
  LoadingButton
} from '../../../../components/forms';
import useCountDown from '../../../../hooks/useCountDown';
import { usePostMutation } from '../../../../hooks/useCustomQuery';
import { authApi } from '../../../../utils';

const validationSchema = Yup.object().shape({
  otp: Yup.string().required('OTP is required').min(6).max(6)
});

export default function VerifyOtp({ next, data, setData, prev }) {
  const { mutateAsync } = usePostMutation({});
  const { verifyOtp } = authApi;
  const { minutes, seconds, togglerTimer, runTimer } = useCountDown(0.1);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mobile: data.mobileNo || '',
      otp: data.otp || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {}) => {
      try {
        const response = await mutateAsync({
          api: verifyOtp,
          data: {
            mobileNo: values.mobile,
            otp: values.otp
          }
        });
        if (response?.data?.status === true) {
          next({ ...data, otp: values.otp });
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error('Invalid OTP');
      }
    }
  });

  React.useEffect(() => {
    togglerTimer();
    return () => {
      togglerTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resendOtp = async () => {
    try {
      const response = await mutateAsync({
        api: authApi.sendOtp,
        data: {
          mobileNo: formik?.values.mobile,
          type: 'Register'
        }
      });
      togglerTimer();
      setData({ mobileNo: formik?.values.mobile, otp: '' });
      formik.setFieldValue('otp', '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormProvider formik={formik}>
        <h1 className="text-sm mt-8 mb-4">
          Please enter the 6-digit verification code sent to your phone number
          +91-
          {data?.mobileNo}{' '}
          <span
            className="text-sm text-blue-700"
            onClick={() => prev({ mobile: formik?.values.mobile, otp: '' })}
          >
            Edit
          </span>
        </h1>
        <TextField
          label="Verify OTP"
          name="otp"
          type="number"
          formik={formik}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 6);
          }}
        />
        <div className="text-center">
          <LoadingButton
            type="submit"
            loading={formik?.isSubmitting}
            disabled={formik?.isSubmitting}
          >
            Verify OTP
          </LoadingButton>
        </div>
        <div className="text-center mt-4 text-sm">
          Didn't receive the code?{' '}
          {runTimer ? (
            <span className={`text-gray-700 cursor-pointer`}>
              Resend in {minutes}:{seconds}
            </span>
          ) : (
            <span
              className={`text-blue-700 cursor-pointer`}
              onClick={resendOtp}
            >
              Resend OTP
            </span>
          )}
        </div>
      </FormProvider>
    </>
  );
}
