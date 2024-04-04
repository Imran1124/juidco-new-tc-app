import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import {
  FormProvider,
  TextField,
  SelectField
} from '../../../components/forms';
import { usePostMutation } from '../../../hooks/useCustomQuery';
import RotatingLoader from '../../../components/loaders/RotatingLoader';

const CustomForms = (props) => {
  const handleOpen = () => props?.setOpen(!props?.open);
  const mutate = usePostMutation({});
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...props?.formData?.reduce((acc, item) => {
        acc[item?.name] = item?.value;
        return acc;
      }, {})
    },
    validationSchema: Yup.object().shape({
      ...props?.formData?.reduce((acc, item) => {
        if (item?.isRequired) {
          acc[item?.name] = Yup.string().required(`${item?.label} is required`);
        }
        return acc;
      }, {})
    }),
    onSubmit: async (values) => {
      try {
        if (props?.isEdit) {
          const res = await mutate?.mutateAsync({
            api: props?.editApi,
            data: values
          });
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            handleOpen();
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          const res = await mutate?.mutateAsync({
            api: props?.createApi,
            data: values
          });
          if (res?.data?.status) {
            toast.success(res?.data?.message);
            handleOpen();
          } else {
            toast.error(res?.data?.message);
          }
        }
      } catch (error) {
        toast.error(error?.message);
      }
    }
  });

  const { handleSubmit } = formik;

  React.useEffect(() => {
    if (!props?.isEdit) {
      formik?.setValues({
        ...props?.formData?.reduce((acc, item) => {
          acc[item?.name] = '';
          return acc;
        }, {})
      });
    }
  }, [props?.open, props?.isEdit, props?.formData]);

  return (
    <>
      <Dialog open={props?.open} handler={handleOpen}>
        <DialogHeader className="text-base">
          {props?.isEdit ? 'Edit' : 'Create'}
        </DialogHeader>
        {/* line  */}
        <div className="border-t border-gray-200"></div>
        {props?.editData?.isLoading ? (
          <>
            <div className="flex justify-center items-center h-64">
              <div className="flex justify-center items-center">
                <RotatingLoader />
              </div>
            </div>
          </>
        ) : (
          <FormProvider formik={formik}>
            <DialogBody>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {props?.formData?.map((item, index) => (
                  <React.Fragment key={index}>
                    {item?.type === 'text' ||
                    item?.type === 'email' ||
                    item?.type === 'number' ? (
                      <TextField
                        name={item?.name}
                        label={item?.label}
                        formik={formik}
                        type={item?.type}
                        maxLength={item?.maxLength}
                      />
                    ) : null}
                    {/* if select filed */}
                    {item?.type === 'select' ? (
                      <SelectField
                        name={item?.name}
                        label={item?.isLabel ? item?.label : ''}
                        formik={formik}
                      >
                        <option value="">Select</option>
                        {item?.options?.map((option, index) => (
                          <option key={index} value={option?.value}>
                            {option?.label}
                          </option>
                        ))}
                      </SelectField>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="gradient"
                color="green"
                size="sm"
                loading={mutate?.isLoading}
                disabled={mutate?.isLoading}
              >
                <span>{props?.isEdit ? 'Update' : 'Create'}</span>
              </Button>
            </DialogFooter>
          </FormProvider>
        )}
      </Dialog>
    </>
  );
};

export default React.memo(CustomForms);
