import { useField } from 'formik';
import React from 'react';

import { FieldInputProps } from './types';

interface ITextArea extends FieldInputProps {
  rows?: number;
  cols?: number;
}

const TextArea = ({ label, ...props }: ITextArea) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (value.length > 2000) return setValue(value.substring(0, 2000));
    setValue(value);
  };

  return (
    <div className={props.wraperclass}>
      <label
        htmlFor={props.id ?? props.name}
        className="block mb-2 text-sm font-medium text-gray-400"
      >
        {label}
      </label>
      <textarea
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...field}
        {...props}
        onChange={handleChange}
      />
      {meta.touched && !meta.error ? (
        <div
          className={`mt-1 ml-4 text-sm
            ${field.value.length === 2000 ? 'text-red-600/70' : 'text-gray-500'}
            `}
        >
          {field.value.length} de 2000
        </div>
      ) : (
        <div className="mt-1 text-red-600/70 text-xs">{meta.error}</div>
      )}
    </div>
  );
};

export default TextArea;
