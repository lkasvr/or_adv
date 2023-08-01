import { useField } from 'formik';
import React from 'react';

import { formatCNPJ, formatCPF } from '../utils/formatters';
import { FieldInputProps } from './types';

export const cpfCnpjRegExpMask =
  /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/;

const CPF_CNPJField = ({ label, ...props }: FieldInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) return setValue(formatCNPJ(value.substring(0, 14)));
    setValue(formatCPF(value));
  };

  return (
    <div className={`relative z-0 mb-4 group ${props.wraperclass}`}>
      <input
        className="block py-2.5 px-0 w-full text-gray-300 text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:border-secondary/75 focus:outline-none focus:ring-0 peer"
        placeholder=" "
        {...field}
        {...props}
        onChange={handleChange}
      />
      <label
        htmlFor={props.id ?? props.name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-secondary/75 peer-focus:dark:text-secondary/70 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="mt-1 text-red-600/70 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CPF_CNPJField;
