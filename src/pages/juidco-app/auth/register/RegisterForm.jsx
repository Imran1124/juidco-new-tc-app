import React from 'react';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  TextField,
  FormProvider,
  SelectField,
  PasswordField,
  LoadingButton
} from '../../../../components/forms';
import { usePostMutation } from '../../../../hooks/useCustomQuery';
import { authApi, resizeFile } from '../../../../utils';
import useErrorAutoFocusField from '../../../../hooks/useErrorFocusField';

const validationSchema = Yup.object().shape({
  mobile: Yup.string().required('Mobile is required').min(10).max(10),
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required').email('Invalid Email'),
  gender: Yup.string().required('Gender is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  dob: Yup.string().required('Date of Birth is required')
});

export default function RegisterForm({ next, prev, data, setData }) {
  const { AutoFocusErrorField } = useErrorAutoFocusField();
  const { register } = authApi;
  const navigate = useNavigate();
  const mutate = usePostMutation({});
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      otp: data.otp || '',
      mobile: data.mobileNo || '',
      name: data.name || '',
      email: data.email || '',
      gender: data?.gender || '',
      password: data.password || '',
      confirmPassword: data.confirmPassword || '',
      dob: data.dob || '',
      photo: data.photo || ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('mobile', values.mobile);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('dob', values.dob);
        formData.append('gender', values.gender);
        formData.append('password', values.password);
        formData.append('confirmPassword', values.confirmPassword);
        formData.append('photo', values.photo);
        const response = await mutate.mutateAsync({
          api: register,
          data: formData
        });

        if (response?.data?.status === true) {
          toast.success(response?.data?.message);
          navigate('/juidco-app/auth/login');
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        toast.error('Something went wrong');
      }
    }
  });

  const handleSelectImg = async (e) => {
    const compressImg = await resizeFile(e.target.files[0]);
    const Cfile = new File([compressImg], e?.target?.files[0]?.name, {
      type: 'image/*'
    });
    formik.setFieldValue('photo', Cfile);
  };

  const { isSubmitting, submitCount, errors } = formik;

  React.useEffect(() => {
    AutoFocusErrorField({ formik });
  }, [errors, submitCount, isSubmitting]);

  return (
    <>
      <FormProvider formik={formik}>
        <h2 className=" font-semibold mb-4">Citizen Registration</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <TextField label="Name" name="name" type="text" formik={formik} />
          </div>
          <div>
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
          </div>
          <div className="-mt-2">
            <TextField
              label="Email"
              name="email"
              type="email"
              formik={formik}
            />
          </div>
          <div className="-mt-2">
            <TextField
              label="Upload Photo"
              accept="image/*"
              name="photo"
              type="file"
              onChange={(e) => handleSelectImg(e)}
            />
            <small className="text-red-500 -mt-6">
              {formik?.errors?.photo && formik?.touched?.photo}
            </small>
          </div>

          <div className="-mt-2">
            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              formik={formik}
            />
          </div>
          <div className="-mt-2">
            <SelectField formik={formik} name="gender" label="Gender">
              <option value="">Select Date</option>
              {['Male', 'Female', 'Other'].map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="-mt-2">
            <PasswordField label="Password" name="password" formik={formik} />
          </div>
          <div className="-mt-2">
            <PasswordField
              label="confirm password"
              name="confirmPassword"
              formik={formik}
            />
          </div>
        </div>

        <div className="text-center mt-2">
          <LoadingButton
            type="submit"
            loading={mutate.isLoading}
            disabled={mutate.isLoading}
          >
            Register Now
          </LoadingButton>
        </div>
      </FormProvider>
    </>
  );
}
