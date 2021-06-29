export type TUser = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type TUserState = {
  post: TUser | null;
  posts: TUser[] | null;
};
