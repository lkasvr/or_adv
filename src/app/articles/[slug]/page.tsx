import Article from '@/components/Article';
import type { Metadata, ResolvingMetadata } from 'next';
import qs from 'qs';

import { ArticlesSlug } from '../domain/Articles';
import { getArticle } from '../utils/get-article';

const query = qs.stringify({ fields: ['slug'] }, { encodeValuesOnly: true });

const baseUrl =
  process.env.DEVAPI_BASE_URL ?? process.env.ARTICLES_API_BASE_URL;

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params;

  const article = await getArticle(slug);

  const previousImages = (await parent).openGraph?.images ?? [];

  const { title, description, authors, metadata, coverImage, updatedAt } =
    article.attributes;
  const {
    keywords,
    robots: { index, follow, noimageindex, maxSnippet },
  } = metadata;

  const { thumbnail } = coverImage.data.attributes.formats;

  return {
    title: {
      absolute: title,
    },
    description,
    keywords: keywords?.split(','),
    authors: authors.data.map(({ attributes: { name, url } }) => ({
      name,
      url,
    })),
    publisher: authors.data[0].attributes.name,
    openGraph: {
      title,
      description,
      authors: authors.data.map(({ attributes: { name } }) => name),
      publishedTime: updatedAt,
      images: [
        {
          url: thumbnail.url,
          width: thumbnail.width,
          height: thumbnail.height,
          alt: 'Capa do Artigo',
        },
        ...previousImages,
      ],
      locale: 'pt_BR',
      type: 'article',
    },
    robots: {
      index,
      follow,
      nocache: false,
      'max-snippet': maxSnippet,
      'max-image-preview': 'large',
      'max-video-preview': 15,
      noimageindex,
      googleBot: {
        index,
        follow,
        noimageindex,
        nocache: false,
        'max-snippet': maxSnippet,
        'max-image-preview': 'large',
        'max-video-preview': 15,
      },
    },
  };
}

export async function generateStaticParams() {
  const articlesSlugs: Omit<ArticlesSlug, 'id'> = await fetch(
    `${baseUrl}/articles?${query}`,
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
