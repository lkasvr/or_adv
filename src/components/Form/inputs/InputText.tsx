import { useField } from 'formik';
import React from 'react';

import { FieldInputProps } from './types';

const InputText = ({ label, ...props }: FieldInputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={`relative z-0 mt-2 mb-1 group ${props.wraperclass}`}>
      <label
        htmlFor={props.id ?? props.name}
        className="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-primary/70 focus-within:ring-1 focus-within:ring-primary/70"
      >
        <span className="text-xs font-medium text-gray-700"> {label} </span>

        <input
          className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
          {...field}
          {...props}
        />
      </label>

      {meta.touched && meta.error ? (
        <div className="mt-1 text-red-600/70 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputText;
