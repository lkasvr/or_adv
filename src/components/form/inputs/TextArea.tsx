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
    helpers.setTouched(true);
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
        className="block w-full p-4 text-gray-300 border border-gray-600 rounded-lg bg-transparent sm:text-md focus:ring-secondary/70 focus:border-secondary/70 placeholder-gray-500"
        {...field}
        {...props}
        onChange={handleChange}
      />
      <div
        className={`mt-1 ml-4 text-md
            ${field.value.length === 2000 ? 'text-red-600/70' : 'text-gray-500'}
            `}
      >
        {meta.touched && !meta.error ? (
          `${field.value.length} de 2000`
        ) : (
          <span className="text-red-600/70 text-xs">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
