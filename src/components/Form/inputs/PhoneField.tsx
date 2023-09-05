import { useField } from 'formik';
import React from 'react';

import { formatBRPhoneNumber } from '../utils/formatters';
import { FieldInputProps } from './types';

export const phoneRegExpMask =
  /^\((?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\) (?:[2-8]|9[1-9])\d{3}-\d{4}$/;

const PhoneField = ({ label, ...props }: FieldInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(formatBRPhoneNumber(event.target.value));

  return (
    <div className={`relative z-0 mb-4 group ${props.wraperclass}`}>
      <input
        className="block py-2.5 px-0 w-full text-gray-300 text-sm bg-transparent border-0 border-b-2 appearance-none border-gray-600 focus:outline-none focus:ring-0 focus:border-secondary/70 peer"
        placeholder=" "
        {...field}
        {...props}
        onChange={handleChange}
      />
      <label
        htmlFor={props.id ?? props.name}
        className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
      {meta.touched && meta.error ? (
        <div className="mt-1 text-red-600/70 text-xs">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default PhoneField;
