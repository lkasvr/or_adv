import { useField } from 'formik';
import React from 'react';

import { FieldInputProps } from './types';

interface ITextArea extends FieldInputProps {
  maxCharacters: number;
  rows?: number;
  cols?: number;
}

const TextArea = ({ label, maxCharacters, ...props }: ITextArea) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;
  const filedLength =
    typeof field?.value?.length === 'number' ? field.value.length : 0;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    helpers.setTouched(true);
    const { value } = event.target;
    if (value.length > maxCharacters)
      return setValue(value.substring(0, maxCharacters));
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
        className="block w-full p-4 text-gray-300 border border-gray-600 rounded-lg bg-transparent sm:text-md focus:ring-primary/70 focus:border-primary/70 placeholder-gray-500"
        {...field}
        {...props}
        onChange={handleChange}
      />
      <div
        className={`mt-1 ml-4 text-md
            ${
              filedLength === maxCharacters
                ? 'text-red-600/70'
                : 'text-gray-500'
            }
            `}
      >
        {meta?.touched && !meta.error ? (
          `${filedLength} de ${maxCharacters}`
        ) : (
          <span className="text-red-600/70 text-xs">{meta.error}</span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
