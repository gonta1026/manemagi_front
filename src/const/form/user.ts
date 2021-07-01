export const LABEL_NAMES = {
  NAME: '名前',
  EMAIL: 'メールアドレス',
  PASSWORD: 'パスワード',
  PASSWORD_CONFIRMATION: 'パスワードの再確認',
} as const;

export const USERFORM = {
  NAME: {
    LABEL: LABEL_NAMES.NAME,
    ID: 'name',
  },
  EMAIL: {
    LABEL: LABEL_NAMES.EMAIL,
    ID: 'email',
  },
  PASSWORD: {
    LABEL: LABEL_NAMES.PASSWORD,
    ID: 'password',
  },
  PASSWORD_CONFIRMATION: {
    LABEL: LABEL_NAMES.PASSWORD_CONFIRMATION,
    ID: 'passwordConfirmation',
  },
} as const;
