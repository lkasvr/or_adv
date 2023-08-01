import { useField } from 'formik';
import React, { ReactNode } from 'react';

import { FieldInputProps } from './types';

interface ISelectInput extends FieldInputProps {
  children: Iterable<ReactNode>;
}

const SelectInput = ({ label, children, ...props }: ISelectInput) => {
  const [field, meta] = useField(props);
  return (
    <div className={props.wraperclass}>
      <label
        htmlFor={props.id ?? props.name}
        className="block mb-2 text-sm font-medium text-gray-500"
      >
        {label}
      </label>
      <select
        className="block w-full p-1 text-gray-300 border border-gray-600 rounded-lg bg-transparent sm:text-md focus:ring-secondary/70 focus:border-secondary/70 dark:placeholder-gray-500"
        {...field}
        {...props}
      >
        {children}
      </select>
      {meta.touched && meta.error ? (
        <div className="mt-1 text-red-600/70 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectInput;
