/* サンプルファイル */
export type TPost = {
  id: string | null;
  body: string | null;
  title: Date | null;
  userId: Date | null;
};

export type TPostState = {
  post: TPost | null;
  posts: TPost[] | null;
};
