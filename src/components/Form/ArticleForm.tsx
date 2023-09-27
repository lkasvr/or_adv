'use client';
import { SubCategory } from '@/app/api/sub-categories/domain';
import { SessionContext } from '@/providers/UserSessionProvider';
import React, { useContext } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';

import Form from '.';
import { getSubCategories } from '../Article/Search/filters/utils/fetchers';
import TinyMCE from '../RichTextEditor';
import CreateSelect, { CreatableSelectOptions } from './inputs/CreateSelect';
import InputText from './inputs/InputText';
import TextArea from './inputs/TextArea';

function ArticleForm() {
  const session = useContext(SessionContext);
  const { data, error, isLoading } = useSWR<SubCategory[]>(
    '/api/sub-categories',
    getSubCategories,
  );

  const [subCategoryOptions, setSubCategoryOptions] =
    React.useState<CreatableSelectOptions>([]);
  const [selectedSubCategoryOptions, setSelectedSubCategoryOptions] =
    React.useState<CreatableSelectOptions>([]);

  React.useEffect(() => {
    if (data && !error)
      setSubCategoryOptions(
        data.map(({ id, attributes: { displayName } }) => ({
          value: id,
          label: displayName,
        })),
      );
  }, [isLoading]);

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
      <CreateSelect
        endpoint="sub-categories"
        isMulti
        options={subCategoryOptions}
        selectedOptions={selectedSubCategoryOptions}
        setOptions={setSubCategoryOptions}
        setSelectedOptions={setSelectedSubCategoryOptions}
        placeholder={
          !isLoading && error
            ? 'Algo deu errado ...'
            : 'Selecione uma sub-categoria ...'
        }
        session={session}
        isLoading={isLoading}
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
