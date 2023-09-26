'use client';
import { StrapiRestAPIResponse } from '@/app/api/sub-categories/route';
import { StrapiRestAPIResponseError } from '@/app/api/types';
import { SessionContext } from '@/providers/UserSessionProvider';
import { createAlert } from '@/store/appSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import * as Yup from 'yup';

import Form from '.';
import { Categories } from '../Article/Search/filters/domain/Categories';
import { SubCategories } from '../Article/Search/filters/domain/SubCategories';
import TinyMCE from '../RichTextEditor';
import InputText from './inputs/InputText';
import TextArea from './inputs/TextArea';

interface Props {
  categories: Categories;
  subCategories: SubCategories;
}

function ArticleForm({ categories, subCategories }: Props) {
  const dispatch = useDispatch();
  const session = React.useContext(SessionContext);

  const onCreateOption = async (inputValue: string) => {
    try {
      const response = await fetch('/api/sub-categories', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        body: JSON.stringify({ name: inputValue }),
      });
      const newSubCategory: StrapiRestAPIResponse | StrapiRestAPIResponseError =
        await response.json();

      if (!newSubCategory?.data) throw newSubCategory;
      console.log(newSubCategory);
    } catch (error) {
      const {
        error: { name, message, status },
      } = error;
      dispatch(
        createAlert({
          title: `Erro ${name} (${status})`,
          message,
          type: 'error',
        }),
      );
    }
  };

  const validationYupSchema = Yup.object();

  const handleSubmit = () => {};

  return (
    <Form
      initialValues={{}}
      onSubmit={handleSubmit}
      validationSchema={validationYupSchema}
      classStyles="w-full flex flex-row flex-wrap justify-center scrollbar-none"
    >
      <InputText label="Título" name="lastName" type="text" />
      <CreatableSelect
        placeholder="Selecione uma sub-categoria ..."
        isMulti
        onCreateOption={onCreateOption}
        options={subCategories.map(({ attributes: { slug, displayName } }) => ({
          value: slug,
          label: displayName,
        }))}
      />
      <TextArea
        label="Descrição"
        name="description"
        type="text"
        placeholder="Digite sua mensagem ..."
        wraperclass="col-span-full w-full mt-2 justify-self-start flex flex-row flex-wrap text-white"
        rows={4}
        maxCharacters={255}
      />
      <TinyMCE />
    </Form>
  );
}

export default ArticleForm;
