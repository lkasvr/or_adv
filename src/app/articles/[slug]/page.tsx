import Article from '@/components/Article';
import type { Metadata } from 'next'; // ResolvingMetadata
import qs from 'qs';

import { ArticlesSlug } from '../domain/Articles';
import { getArticle } from '../utils/get-article';

const query = qs.stringify({ fields: ['slug'] }, { encodeValuesOnly: true });

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  //parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const article = await getArticle(slug);

  // optionally access and extend (rather than replace) parent metadata
  //const previousImages = (await parent).openGraph?.images ?? [];

  const { title, description, authors, metadata } = article.attributes;
  const { applicationName, creator, publisher, keywords } =
    metadata.data.attributes;

  return {
    applicationName,
    title: {
      absolute: title,
    },
    description,
    keywords: keywords?.split(','),
    authors: authors.data.map(({ attributes: { name, url } }) => ({
      name,
      url,
    })),
    creator,
    publisher,
    openGraph: {
      title,
      description,
      //images: ['/some-specific-page-image.jpg', ...previousImages],
      images: {
        url: '/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FlogoFb.2024f082.png&w=1920&q=75',
        width: 260,
        height: 149,
        alt: 'Logo Oliveira Rios Advogados',
      },
      locale: 'pt_BR',
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const articlesSlugs: Omit<ArticlesSlug, 'id'> = await fetch(
    `${process.env.ARTICLES_API_BASE_URL}/articles?${query}`,
  ).then((res) => res.json());

  return articlesSlugs.data.map(({ attributes: { slug } }) => ({ slug }));
}

export default function Page({ params }: Props) {
  return (
    <div className="mt-14 md:mt-0 pb-2 w-full h-full bg-white flex flex-col flex-nowrap rounded-3xl overflow-y-auto">
      <div className="px-28 py-12 ">
        <Article slug={params.slug} />
      </div>
      <hr className="mt-1 mb-6 ml-[25%] w-[50%] h-[1px] text-gray-400" />
    </div>
  );
}
