import React from 'react';
import { getIn } from 'formik';
import PropType from 'prop-types';

// This component is used to create a text field in the form.

TextField.propTypes = {
  name: PropType.string.isRequired,
  label: PropType.string,
  formik: PropType.object,
  isDynamic: PropType.bool,
  isRequiredLabel: PropType.bool,
  className: PropType.string
};

export default function TextField({
  label,
  name,
  formik,
  isDynamic,
  isRequiredLabel = false,
  className,
  ...props
}) {
  return (
    <div className="mb-1">
      <label htmlFor={name} className="block text-gray-600 text-sm mb-1">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        {...(formik && formik?.getFieldProps(name))}
        className={`${className} w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 darks:text-gray-300 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600`}
        placeholder={label}
        {...props}
      />
      <span className="text-red-600  text-xs">
        {isDynamic
          ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
          : formik?.touched[name] && formik?.errors[name]}
      </span>
      {/* {formik?.errors[name] && formik?.touched[name] && (
        <p className="text-red-500 text-xs mt-1">{formik?.errors[name]}</p>
      )} */}
    </div>
  );
}
