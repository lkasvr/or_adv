import StrapiRestAPIResponseError from '@/app/api/Errors';
import { SubCategory } from '@/app/api/sub-categories/domain';
import { createAlert } from '@/store/appSlice';
import { Session } from 'next-auth';
import React from 'react';
import { useDispatch } from 'react-redux';
import { MultiValue, ActionMeta } from 'react-select';
import CreatableSelect from 'react-select/creatable';

export type CreatableSelectOption = {
  value: string;
  label: string;
  isCreatedNow?: boolean;
};

export type CreatableSelectOptions = MultiValue<CreatableSelectOption>;
export type CreatableSelectActionType = ActionMeta<CreatableSelectOption>;

interface Props {
  endpoint: string;
  options: CreatableSelectOptions;
  selectedOptions: CreatableSelectOptions;
  setOptions: (
    options:
      | CreatableSelectOptions
      | ((prevOptions: CreatableSelectOptions) => CreatableSelectOptions),
  ) => void;
  setSelectedOptions: (
    options:
      | CreatableSelectOptions
      | ((prevOptions: CreatableSelectOptions) => CreatableSelectOptions),
  ) => void;
  placeholder?: string;
  session: Session | null;
  isLoading: boolean;
  isMulti: boolean;
}

const CreateSelect = ({
  endpoint,
  options,
  selectedOptions,
  setOptions,
  setSelectedOptions,
  placeholder,
  session,
  isLoading, //isMulti = false,
}: Props) => {
  const dispatch = useDispatch();

  const handleChange = (
    values: CreatableSelectOptions,
    actionType: CreatableSelectActionType,
  ) => {
    const { action, removedValue, removedValues } = actionType;
    if (action === 'select-option') setSelectedOptions([...values]);

    if (action === 'remove-value' || action === 'pop-value') {
      setSelectedOptions([
        ...selectedOptions.filter(({ value }) => value !== removedValue.value),
      ]);

      setOptions([
        ...options.filter(({ value, isCreatedNow }) => {
          if (isCreatedNow && value === removedValue.value) {
            deleteOption(value);
            return false;
          }

          return true;
        }),
      ]);
    }

    if (action === 'clear') {
      removedValues.forEach(({ value, isCreatedNow }) => {
        if (isCreatedNow) deleteOption(value);
      });

      setSelectedOptions([]);
    }
  };

  const onCreateOption = async (inputValue: string) => {
    options.forEach((option) => {
      const value = option.value;
    });

    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ data: { name: inputValue } }),
      });
      const newSubCategory: { data: SubCategory } | StrapiRestAPIResponseError =
        await response.json();

      if (!newSubCategory.data)
        throw new StrapiRestAPIResponseError(newSubCategory.error);

      const {
        id,
        attributes: { displayName },
      } = newSubCategory.data;

      setOptions((prevOptions) => [
        ...prevOptions,
        { value: id, label: displayName, isCreatedNow: true },
      ]);

      setSelectedOptions((prevOptions) => [
        ...prevOptions,
        { value: id, label: displayName, isCreatedNow: true },
      ]);

      dispatch(
        createAlert({
          title: `${displayName}`,
          message: 'Subcategoria criada com sucesso!',
          type: 'success',
        }),
      );
    } catch (e: unknown) {
      console.warn(e);
      if (
        e instanceof StrapiRestAPIResponseError &&
        e.error?.name === 'UnauthorizedError'
      ) {
        const { error } = e;
        return dispatch(
          createAlert({
            title: `Operação Negada (${error?.status})`,
            message: 'Usuário não autenticado ou sessão expirada',
            type: 'error',
          }),
        );
      }
    }
  };

  const deleteOption = async (id: string) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ id }),
      });

      const deletedSubCategory:
        | { data: SubCategory }
        | StrapiRestAPIResponseError = await response.json();

      if (!deletedSubCategory.data)
        throw new StrapiRestAPIResponseError(deletedSubCategory.error);

      if (deletedSubCategory.data?.id) {
        const {
          attributes: { displayName },
        } = deletedSubCategory.data;
        dispatch(
          createAlert({
            title: `${displayName}`,
            message: 'Subcategoria deletada com sucesso.',
            type: 'success',
          }),
        );

        return true;
      }

      return false;
    } catch (e: unknown) {
      console.warn(e);
      if (
        e instanceof StrapiRestAPIResponseError &&
        e.error?.name === 'UnauthorizedError'
      ) {
        const { error } = e;
        dispatch(
          createAlert({
            title: `Operação Negada (${error?.status})`,
            message: 'Usuário não autenticado ou sessão expirada',
            type: 'error',
          }),
        );
        return false;
      }
    }
  };
  return (
    <CreatableSelect
      placeholder={placeholder ?? 'Selecione as opções...'}
      isMulti
      onCreateOption={onCreateOption}
      options={options}
      onChange={handleChange}
      value={selectedOptions}
      backspaceRemovesValue
      hideSelectedOptions
      isLoading={isLoading}
    />
  );
};

export default CreateSelect;
