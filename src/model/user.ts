export type TUser = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type TLoginUser = Omit<TUser, 'name' | 'passwordConfirmation'>;

export type TLoginUserOrUser = TLoginUser | TUser;

export type TUserFormError = Record<keyof TUser, string>;
