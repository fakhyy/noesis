export type NewThought = {
  title: string;
  content?: string;
  userId: string;
};

export type SearchQuery = {
  page: number;
  limit: number;
};
