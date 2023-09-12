export type ArticleAttributes = {
  slug: string;
  title: string;
  description: string;
};

export type AttributeSlug = Omit<
  Omit<ArticleAttributes, 'title'>,
  'description'
>;

export type Articles = {
  data: {
    id: number;
    attributes: AttributeSlug;
  }[];
};

export async function generateStaticParams() {
  const articlesSlugs: Omit<Articles, 'id'> = await fetch(
    `${process.env.ARTICLES_API_BASE_URL}/articles?fields[0]=slug`,
  ).then((res) => res.json());

  return articlesSlugs.data.map(({ attributes: { slug } }) => ({ slug }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Article: {params.slug}</div>;
}
