export type TUser = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type TUserState = {
  post: TUser | null;
  posts: TUser[] | null;
};
