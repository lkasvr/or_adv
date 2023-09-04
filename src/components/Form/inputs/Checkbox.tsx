import { useField } from 'formik';
import React from 'react';

import { FieldInputProps } from './types';

const Checkbox = ({ label, ...props }: FieldInputProps) => {
  const [field, meta] = useField(props);
  return (
    <div className={`relative z-0 mt-2 mb-1 group ${props.wraperclass}`}>
      <input
        className="text-gray-300 text-sm bg-transparent"
        type="checkbox"
        placeholder=" "
        {...field}
        {...props}
      />
      <label
        htmlFor={props.id ?? props.name}
        className="ml-1 text-xs text-gray-400"
      >
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="mt-1 text-red-600/70 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default Checkbox;
