export type SubCategories = {
  data: SubCategory[];
};

export type SubCategory = {
  id: string;
  attributes: {
    name: string;
    displayName: string;
    slug: string;
  };
};
