import { TSettings } from '../../types/Settings';
import { SETTINGSFORM } from '../../const/form/settings';
import { validBlank } from '..';

export const settingsValidate = (values: TSettings, errors: TSettings) => {
  const { LINE_NOTICE_TOKEN } = SETTINGSFORM;
  /******************
   * LINEトークン
   ******************/
  //   仮で空白NGのバリデージョンを設置
  if (validBlank.check(values.lineNoticeToken)) {
    errors.lineNoticeToken = validBlank.message(LINE_NOTICE_TOKEN.LABEL);
  }

  return errors;
};
