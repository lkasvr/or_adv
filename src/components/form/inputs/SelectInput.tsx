import { useField } from 'formik';
import { ReactNode } from 'react';

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
        className="block mb-2 text-sm font-medium text-gray-400"
      >
        {label}
      </label>
      <select
        className="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-transparent sm:text-md focus:ring-secondary/70 focus:border-secondary/70 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-secondary/70 dark:focus:border-secondary/70"
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
