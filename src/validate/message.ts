const endMessage = 'を入力してください。';
export const blank = (label: string) => label + endMessage;
export const passwordRangeAndHankakuEngNum = (label: string) =>
  label + 'は4～30桁の半角英数字' + endMessage;
export const hankakuEngNum = (label: string) => label + 'は半額英数字のみ' + endMessage;
export const notSame = (label01: string, label02: string) =>
  `${label01}は${label02}と同じにしてください。`;
export const format = (label: string) => `${label}の形式に誤りがあります`;
export const emailOrPassword = () => `メールアドレスもしくはパスワードが正しくありません。`;
export const registerdColumn = (name: string, label: string) =>
  `${name}は既に登録されています。別の${label + endMessage}`;
