// form
import { useFormContext, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import {
  customInputValidation,
  InputValidationType
} from '@/utils/customInputValidation';

// ----------------------------------------------------------------------

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: string;
  label?: string;
  isDynamic?: boolean;
  inputValidation?: InputValidationType;
  className?: string;
};

const RHFTextField = ({
  name,
  label,
  isDynamic,
  inputValidation,
  className,
  ...other
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <div className="mb-1">
            <label htmlFor={name} className="block text-gray-600 text-sm mb-1">
              {label} {error && <span className="text-red-400">*</span>}
            </label>
            <input
              {...field}
              value={
                typeof field.value === 'number' && field.value === 0
                  ? ''
                  : field.value
              }
              ref={ref}
              className={twMerge(
                // if error, border-red-400 else border-gray-300
                `rounded-md w-full leading-5 relative py-2 px-4 text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 darks:text-gray-300 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600` +
                  (error
                    ? ' border-red-400 focus:border-red-400 darks:border-red-400'
                    : ' focus:border-gray-400 darks:focus:border-gray-600'),
                className
              )}
              onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (inputValidation) {
                  customInputValidation(e, inputValidation);
                }
              }}
              {...other}
            />
            {error && (
              <span className="text-red-400 text-xs">{error.message}</span>
            )}
          </div>
        </>
      )}
    />
  );
};

RHFTextField.displayName = 'RHFTextField';

export default RHFTextField;

// w-full leading-5 relative py-2 px-4 rounded text-gray-800 bg-white border border-gray-300 overflow-x-auto focus:outline-none focus:border-gray-400 focus:ring-0 darks:text-gray-300 darks:bg-gray-700 darks:border-gray-700 darks:focus:border-gray-600
