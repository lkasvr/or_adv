export type SubCategories = {
  data: SubCategory[];
};

export type SubCategory = {
  id: number;
  attributes: {
    name: string;
    displayName: string;
    slug: string;
  };
};
