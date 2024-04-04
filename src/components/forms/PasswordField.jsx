import React from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { getIn } from 'formik';
import PropType from 'prop-types';

// This component is used to create a password field in the form.
// It also handles the form submission.

PasswordField.propTypes = {
  name: PropType.string.isRequired,
  label: PropType.string,
  formik: PropType.object,
  isRequiredLabel: PropType.bool,
  isDynamic: PropType.bool,
  className: PropType.string,
  onInput: PropType.func
};

export default function PasswordField({
  formik,
  label,
  name,
  disabled = false,
  className = '',
  isRequiredLabel,
  onInput,
  isDynamic = false,
  ...props
}) {
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="mb-4">
      <div className="relative">
        <label htmlFor={name} className="block text-gray-600 text-sm mb-1">
          {label}
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          id={name}
          {...(formik && formik?.getFieldProps(name))}
          className="w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 darks:text-gray-300 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600"
          placeholder={label}
          {...props}
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6">
          {showPassword ? (
            <AiFillEye
              className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <AiFillEyeInvisible
              className="cursor-pointer text-gray-500 hover:text-gray-700 w-5 h-5"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
      </div>
      <span className="text-red-600  text-xs">
        {isDynamic
          ? getIn(formik?.touched, name) && getIn(formik?.errors, name)
          : formik?.touched[name] && formik?.errors[name]}
      </span>
    </div>
  );
}
