export const validateMessage = {
  ONLYBIG: 'は全角文字のみ',
  ONLY_HIRAGANA: 'は ひらがな ',
  NO_FEATURE: 'には、未来の日付は入力できません。',
  MINI_NUM: 'は半角数字',
  MINI_ENG_NUM: 'は半額英数字のみ',
  EMAIL_FORMAT: 'に正しいメールアドレス',
  FORMAT: 'の形式に誤りがあります',
  PASSWORD_MESSAGE: 'は4～30桁の半角英数字で入力してください。',
  END_MESSAGE: 'を入力してください。',
  REGISTERED_PASSWORD: 'は既に登録されています。別のメールアドレスを入力してください。',
  EMAIL_OR_PASSWORD: 'メールアドレスもしくはパスワードが正しくありません。',
} as const;

export default { ...validateMessage };
