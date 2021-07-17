import { TSetting } from '../../types/Setting';
import { SETTINGSFORM } from '../../const/form/settings';
// import { validBlank } from '..';

export const settingsValidate = (values: TSetting, errors: TSetting) => {
  const { LINE_NOTICE_TOKEN } = SETTINGSFORM;
  // TODO: コンソール削除
  console.log(values);
  console.log(LINE_NOTICE_TOKEN);
  /******************
   * LINEトークン
   ******************/
  //   仮で空白NGのバリデージョンを設置
  // if (validBlank.check(values.line_notice_token)) {
  //   errors.line_notice_token = validBlank.message(LINE_NOTICE_TOKEN.LABEL);
  // }

  return errors;
};
