import React from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {
  TextField,
  FormProvider,
  LoadingButton
} from '../../../../components/forms';
import { usePostMutation } from '../../../../hooks/useCustomQuery';
import { authApi } from '../../../../utils';

const validationSchema = Yup.object().shape({
  mobile: Yup.string().required('Mobile is required').min(10).max(10)
});

export default function SendOTP({ next, data, setData }) {
  const { mutateAsync } = usePostMutation({});
  const { sendOtp } = authApi;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mobile: data.mobileNo || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {}) => {
      try {
        const response = await mutateAsync({
          api: sendOtp,
          data: {
            mobileNo: values.mobile,
            type: 'Register'
          }
        });
        if (response?.data?.status === true) {
          next({ ...data, mobileNo: values.mobile });
          toast.success(response?.data?.message);
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
  return (
    <>
      <FormProvider formik={formik}>
        <h2 className=" font-semibold mt-8 mb-4">Citizen Registration</h2>
        <TextField
          label="Mobile"
          name="mobile"
          type="number"
          formik={formik}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, 10);
          }}
        />
        <div className="text-center ">
          <LoadingButton
            type="submit"
            loading={formik?.isSubmitting}
            disabled={formik?.isSubmitting}
          >
            Send OTP
          </LoadingButton>
        </div>
      </FormProvider>
    </>
  );
}
