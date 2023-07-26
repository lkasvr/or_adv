/* eslint-disable @typescript-eslint/no-explicit-any */
export type FieldInputProps = {
  id?: string;
  label: string;
  name: string;
  placeholder?: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  type?: string;
  multiple?: boolean;
  value?: string;
  wraperClass?: string;
};
