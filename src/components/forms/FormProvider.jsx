import { FormikProvider, Form } from 'formik';
import PropType from 'prop-types';

// This component is used to provide the formik context to the form and its children.
// It also handles the form submission.

FormProvider.propTypes = {
  formik: PropType.object.isRequired,
  children: PropType.node.isRequired,
  className: PropType.string
};

export default function FormProvider({ children, formik, className }) {
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik?.handleSubmit} className={className}>
        {children}
      </Form>
    </FormikProvider>
  );
}
