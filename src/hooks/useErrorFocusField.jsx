import isObject from 'lodash/isObject';

// This hook is used to focus on the first error field when the form is submitted and there are errors.
const useErrorAutoFocusField = () => {
  const getFirstErrorKey = (object, keys = []) => {
    const firstErrorKey = Object?.keys(object)[0];
    if (isObject(object[firstErrorKey])) {
      return getFirstErrorKey(object[firstErrorKey], [...keys, firstErrorKey]);
    }
    return [...keys, firstErrorKey].join('.');
  };

  const AutoFocusErrorField = ({ formik }) => {
    if (!formik?.isValid && formik?.submitCount !== 0 && formik?.isSubmitting) {
      const firstErrorKey = getFirstErrorKey(formik?.errors);
      if (window.document.getElementsByName(firstErrorKey)?.length) {
        window.document.getElementsByName(firstErrorKey)[0]?.focus();
      }
    }
  };

  return {
    AutoFocusErrorField
  };
};

export default useErrorAutoFocusField;
