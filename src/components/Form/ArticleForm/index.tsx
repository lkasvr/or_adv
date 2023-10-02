'use client';
import { Category } from '@/app/api/categories/domain';
import { SubCategory } from '@/app/api/sub-categories/domain';
import { SessionContext } from '@/providers/UserSessionProvider';
import React, { useContext } from 'react';
import { MultiValue, SingleValue } from 'react-select';
import useSWR from 'swr';
import * as Yup from 'yup';

import Form from '../';
import {
  getCategories,
  getSubCategories,
} from '../../Article/Search/filters/utils/fetchers';
import TinyMCE from '../../RichTextEditor';
import InputText from '../inputs/InputText';
import CreateSelect, { OptionType } from './CustomInputs/CreateSelect';

function ArticleForm() {
  const session = useContext(SessionContext);

  const categories = useSWR<Category[]>('/api/categories', getCategories);
  const subCategories = useSWR<SubCategory[]>(
    '/api/sub-categories',
    getSubCategories,
  );

  const [categoryOptions, setCategoryOptions] = React.useState<
    MultiValue<OptionType>
  >([]);
  const [selectedCategoryOption, setSelectedCategoryOption] =
    React.useState<SingleValue<OptionType>>(null);

  const [subCategoryOptions, setSubCategoryOptions] = React.useState<
    MultiValue<OptionType>
  >([]);
  const [selectedSubCategoryOptions, setSelectedSubCategoryOptions] =
    React.useState<MultiValue<OptionType>>([]);

  React.useEffect(() => {
    const { data, error } = categories;
    if (data && !error)
      setCategoryOptions(
        data.map(({ id, attributes: { displayName } }) => ({
          value: id,
          label: displayName,
        })),
      );
  }, [categories.isLoading]);

  React.useEffect(() => {
    const { data, error } = subCategories;
    if (data && !error)
      setSubCategoryOptions(
        data.map(({ id, attributes: { displayName } }) => ({
          value: id,
          label: displayName,
        })),
      );
  }, [subCategories.isLoading]);

  const [title, setTitle] = React.useState('');

  const validationYupSchema = Yup.object();

  const handleSubmit = () => {};

  return (
    <Form
      initialValues={{}}
      onSubmit={handleSubmit}
      validationSchema={validationYupSchema}
      classStyles="w-full flex flex-row flex-wrap gap-2 justify-center scrollbar-none"
    >
      <section className="w-full flex flex-row flex-nowrap justify-between gap-1">
        <div className="w-[48%] flex flex-wrap gap-2">
          <InputText
            label="Título"
            name="title"
            type="text"
            wraperclass="w-full"
            onInputChange={(e) => setTitle(e.target.value)}
          />
          <CreateSelect
            className="w-full z-10"
            endpoint="categories"
            options={categoryOptions}
            setOptions={setCategoryOptions}
            selectedOption={selectedCategoryOption}
            setSelectedOption={setSelectedCategoryOption}
            placeholder={
              !categories.isLoading && categories.error
                ? 'Algo deu errado ...'
                : 'Selecione uma categoria ...'
            }
            session={session}
            isLoading={categories.isLoading}
          />
          <CreateSelect<'Multi'>
            className="w-full z-[8]"
            endpoint="sub-categories"
            isMulti
            options={subCategoryOptions}
            selectedOptions={selectedSubCategoryOptions}
            setOptions={setSubCategoryOptions}
            setSelectedOptions={setSelectedSubCategoryOptions}
            placeholder={
              !subCategories.data && subCategories.error
                ? 'Algo deu errado ...'
                : 'Selecione uma subcategoria ...'
            }
            session={session}
            isLoading={subCategories.isLoading}
          />
        </div>
        <div className="p-12 w-[48%] bg-slate-50 border border-dashed rounded-3xl flex flex-row flex-wrap justify-center items-center overflow-hidden scrollbar-none">
          {title ? (
            <h3 className={'text-3xl font-medium text-gray-900'}>{title}</h3>
          ) : (
            <span className="text-base text-slate-400">
              Veja aqui o título do seu artigo...
            </span>
          )}
        </div>
      </section>
      <InputText
        label="Descrição"
        name="description"
        type="text"
        wraperclass="w-full"
      />
      <button
        aria-label="Help"
        title="Help"
        type="button"
        className="tox-tbtn"
        aria-disabled="false"
      >
        <span className="tox-icon tox-tbtn__icon-wrap">
          <svg width="24" height="24" focusable="false">
            <g fillRule="evenodd">
              <path d="M12 5.5a6.5 6.5 0 0 0-6 9 6.3 6.3 0 0 0 1.4 2l1 1a6.3 6.3 0 0 0 3.6 1 6.5 6.5 0 0 0 6-9 6.3 6.3 0 0 0-1.4-2l-1-1a6.3 6.3 0 0 0-3.6-1ZM12 4a7.8 7.8 0 0 1 5.7 2.3A8 8 0 1 1 12 4Z"></path>
              <path
                d="M9.6 9.7a.7.7 0 0 1-.7-.8c0-1.1 1.5-1.8 3.2-1.8 1.8 0 3.2.8 3.2 2.4 0 1.4-.4 2.1-1.5 2.8-.2 0-.3.1-.3.2a2 2 0 0 0-.8.8.8.8 0 0 1-1.4-.6c.3-.7.8-1 1.3-1.5l.4-.2c.7-.4.8-.6.8-1.5 0-.5-.6-.9-1.7-.9-.5 0-1 .1-1.4.3-.2 0-.3.1-.3.2v-.2c0 .4-.4.8-.8.8Z"
                fillRule="nonzero"
              ></path>
              <circle cx="12" cy="16" r="1"></circle>
            </g>
          </svg>
        </span>
      </button>
      <TinyMCE />
    </Form>
  );
}

export default ArticleForm;
