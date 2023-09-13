import qs from 'qs';

import { ArticlesSlug } from '../domain/Articles';

const query = qs.stringify({ fields: ['slug'] }, { encodeValuesOnly: true });

export async function generateStaticParams() {
  const articlesSlugs: Omit<ArticlesSlug, 'id'> = await fetch(
    `${process.env.ARTICLES_API_BASE_URL}/articles?${query}`,
  ).then((res) => res.json());

  return articlesSlugs.data.map(({ attributes: { slug } }) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <div className="px-28">My Article: {params.slug}</div>;
}
