import StrapiRestAPIResponseError from '@/app/api/_responses-types/Errors';
import { createAlert } from '@/store/appSlice';
import { Session } from 'next-auth';
import React, { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { ActionMeta, SingleValue, MultiValue } from 'react-select';
import CreatableSelect from 'react-select/creatable';

import { resetStringToCompare } from '../../inputs/utils/formatters';

export type CategoryOrSubCategory = {
  id: number;
  attributes: {
    displayName: string;
  };
};

export type OptionType = {
  value: number;
  label: string;
  isCreatedNow?: boolean;
};

interface BaseProps {
  className?: string;
  endpoint: string;
  options: MultiValue<OptionType>;
  setOptions: Dispatch<SetStateAction<MultiValue<OptionType>>>;
  placeholder?: string;
  session: Session | null;
  isLoading: boolean;
  isMulti?: boolean;
}

type SingleProps = BaseProps & {
  isMulti?: false;
  selectedOption: SingleValue<OptionType>;
  setSelectedOption: Dispatch<SetStateAction<SingleValue<OptionType>>>;
  selectedOptions?: never;
  setSelectedOptions?: never;
};

type MultiProps = BaseProps & {
  isMulti: true;
  selectedOptions: MultiValue<OptionType>;
  setSelectedOptions: Dispatch<SetStateAction<MultiValue<OptionType>>>;
  selectedOption?: never;
  setSelectedOption?: never;
};

type Props<SelectType> = SelectType extends 'Multi' ? MultiProps : SingleProps;

const CreateSelect = <SelectType extends 'Multi' | undefined = undefined>({
  className,
  endpoint,
  options,
  selectedOption,
  selectedOptions,
  setOptions,
  setSelectedOption,
  setSelectedOptions,
  placeholder,
  session,
  isLoading,
  isMulti = false,
}: Props<SelectType>) => {
  const dispatch = useDispatch();

  const handleChange = (
    value: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>,
  ) => {
    if (!setSelectedOption) return;
    const { action, removedValues } = actionMeta;

    if (action === 'select-option') setSelectedOption(value);

    if (
      removedValues &&
      (action === 'remove-value' ||
        action === 'pop-value' ||
        action === 'clear')
    ) {
      setSelectedOption(value);

      setOptions([
        ...options.filter(({ value, isCreatedNow }) => {
          if (isCreatedNow && value === removedValues[0].value) {
            deleteOption(value);
            return false;
          }

          return true;
        }),
      ]);
    }
  };

  const handleMultiChange = (
    values: MultiValue<OptionType>,
    actionMeta: ActionMeta<OptionType>,
  ) => {
    if (!selectedOptions) return;
    const { action, removedValue, removedValues } = actionMeta;

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

    if (action === 'clear' && setSelectedOptions) {
      removedValues.forEach(({ value, isCreatedNow }) => {
        if (isCreatedNow) deleteOption(value);
      });

      setSelectedOptions([]);
    }
  };

  const onCreateOption = async (inputValue: string) => {
    try {
      if (
        options.some((option) =>
          resetStringToCompare(option.label).includes(
            resetStringToCompare(inputValue),
          ),
        )
      )
        throw new Error('Opção já existente.', { cause: 'duplicate-option' });

      const response = await fetch(`/api/${endpoint}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ data: { displayName: inputValue } }),
      });
      const newCategoryOrSubCategory:
        | { data: CategoryOrSubCategory }
        | StrapiRestAPIResponseError = await response.json();

      if (!newCategoryOrSubCategory.data)
        throw new StrapiRestAPIResponseError(newCategoryOrSubCategory.error);

      const {
        id,
        attributes: { displayName },
      } = newCategoryOrSubCategory.data;

      setOptions((prevOptions) => [
        ...prevOptions,
        { value: id, label: displayName, isCreatedNow: true },
      ]);

      if (setSelectedOption)
        setSelectedOption({
          value: id,
          label: displayName,
          isCreatedNow: true,
        });

      if (setSelectedOptions) {
        setSelectedOptions((prevOptions) => [
          ...prevOptions,
          { value: id, label: displayName, isCreatedNow: true },
        ]);
      }

      dispatch(
        createAlert({
          title: `${displayName}`,
          message:
            endpoint === 'sub-categories'
              ? 'Subcategoria criada com sucesso!'
              : 'Categoria criada com sucesso!',
          type: 'success',
        }),
      );
    } catch (e: unknown) {
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

      if (e instanceof Error && e.cause === 'duplicate-option')
        return dispatch(
          createAlert({
            title: 'Operação Negada',
            message: e.message,
            type: 'error',
          }),
        );
    }
  };

  const deleteOption = async (id: number) => {
    try {
      const response = await fetch(`/api/${endpoint}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ id }),
      });

      const deletedCategoryOrSubCategory:
        | { data: CategoryOrSubCategory }
        | StrapiRestAPIResponseError = await response.json();

      if (!deletedCategoryOrSubCategory.data)
        throw new StrapiRestAPIResponseError(
          deletedCategoryOrSubCategory.error,
        );

      if (deletedCategoryOrSubCategory.data?.id) {
        const {
          attributes: { displayName },
        } = deletedCategoryOrSubCategory.data;
        dispatch(
          createAlert({
            title: `${displayName}`,
            message:
              endpoint === 'sub-categories'
                ? 'Subcategoria deletada com sucesso!'
                : 'Categoria deletada com sucesso!',
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

  if (isMulti)
    return (
      <CreatableSelect
        className={className}
        placeholder={placeholder ?? 'Selecione as opções...'}
        isMulti
        onCreateOption={onCreateOption}
        options={options}
        onChange={handleMultiChange}
        value={selectedOptions}
        backspaceRemovesValue
        hideSelectedOptions
        isLoading={isLoading}
      />
    );

  if (!isMulti)
    return (
      <CreatableSelect
        className={className}
        placeholder={placeholder ?? 'Selecione as opções...'}
        onCreateOption={onCreateOption}
        options={options}
        onChange={handleChange}
        value={selectedOption}
        backspaceRemovesValue
        hideSelectedOptions
        isClearable
        isLoading={isLoading}
      />
    );
};

export default CreateSelect;
