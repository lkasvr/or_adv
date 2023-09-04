import { useField } from 'formik';
import React, { ReactNode } from 'react';

import { FieldInputProps } from './types';

interface ISelectInput extends FieldInputProps {
  children: Iterable<ReactNode>;
}

const SelectInput = ({
  label,
  placeholder,
  children,
  ...props
}: ISelectInput) => {
  const [field, meta] = useField(props);
  return (
    <div className={props.wraperclass}>
      <label
        htmlFor={props.id ?? props.name}
        className="block mb-2 text-sm font-medium text-gray-400"
      >
        {label}
      </label>
      <select
        className={`block w-full p-1 border border-gray-600 rounded-lg bg-transparent text-sm focus:ring-secondary/70 focus:border-secondary/70 ${
          field.value === '' ? 'text-gray-500' : 'text-gray-300'
        }`}
        {...field}
        {...props}
      >
        <option value="" className="text-gray-500">
          {placeholder}
        </option>
        {children}
      </select>
      {meta.touched && meta.error ? (
        <div className="mt-1 text-red-600/70 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectInput;
