import React from 'react';
import { getIn } from 'formik';
import PropType from 'prop-types';

// This component is used to create a select field in the form.
// It also handles the form submission.

SelectField.propTypes = {
  name: PropType.string.isRequired,
  label: PropType.string,
  formik: PropType.object,
  isDynamic: PropType.bool,
  selectedText: PropType.string,
  isRequiredLabel: PropType.bool,
  children: PropType.node.isRequired
};

export default function SelectField({
  label,
  name = '',
  formik,
  selectedText,
  isDynamic,
  isRequiredLabel = false,
  children,
  ...props
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-600 text-sm mb-1">
        {label}{' '}
        {/* {isRequiredLabel && <span className="text-red-600 text-lg ">*</span>} */}
      </label>
      <select
        name={name}
        value={formik?.values[name] ?? undefined}
        onChange={(e) => {
          formik?.setFieldValue(name, e.target.value);
          formik?.setFieldValue(
            selectedText,
            e.target.options[e.target.selectedIndex].text === 'Select'
              ? ''
              : e.target.options[e.target.selectedIndex].text
          );
          return formik?.handleChange(e);
        }}
        className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 darks:text-gray-300 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600"
        {...props}
      >
        {children}
      </select>
      <span className="text-red-600 text-xs">
        {isDynamic
          ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
          : formik?.touched[name] && formik?.errors[name]
          ? formik?.errors[name]
          : null}
      </span>
    </div>
  );
}
