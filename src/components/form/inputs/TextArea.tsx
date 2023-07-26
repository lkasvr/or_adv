import { useField } from 'formik';

import { FieldInputProps } from './types';

interface ITextArea extends FieldInputProps {
  rows?: number;
  cols?: number;
}

const TextArea = ({ label, ...props }: ITextArea) => {
  const [field, meta] = useField(props);
  return (
    <div className={props.wraperClass}>
      <label
        htmlFor={props.id ?? props.name}
        className="block mb-2 text-sm font-medium text-gray-400"
      >
        {label}
      </label>
      <textarea
        className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default TextArea;
