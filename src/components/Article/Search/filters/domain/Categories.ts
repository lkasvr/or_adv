export type Categories = {
  data: Category[];
};

export type Category = {
  id: string;
  attributes: {
    slug: string;
    displayName: string;
    icon: {
      name: string;
      lib: string;
    };
  };
};
