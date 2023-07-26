import { useField } from 'formik';

import { FieldInputProps } from './types';

const PhoneField = ({ label, ...props }: FieldInputProps) => {
  const [field, meta, helpers] = useField(props);
  const { setValue } = helpers;

  const formatBRPhoneNumber = (value: string) => {
    const digits = !value ? '' : value.replace(/[^\d]/g, '');
    if (!digits || digits.length < 2) return value;
    const cut = digits.length === 10 ? 6 : 7;
    const max = digits.length > 11 ? 11 : digits.length;
    // eslint-disable-next-line prettier/prettier
    return `(${digits.substring(0, 2)}) ${digits.substring(2, cut)}${digits.length >= 7 ? '-' : ''}${digits.substring(cut, max)}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(formatBRPhoneNumber(event.target.value));

  return (
    <div className={`relative z-0 mb-4 group ${props.wraperclass}`}>
      <input
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-secondary/75 focus:outline-none focus:ring-0 focus:border-secondary/70 peer"
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

export default PhoneField;
