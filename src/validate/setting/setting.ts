import { TSetting } from '../../types/Setting';
import { SETTINGFORM } from '../../const/form/setting';
import { validMaxNum } from '../';
import { lineToken } from '../message';
export const settingsValidate = (values: TSetting, errors: TSetting) => {
  const { LINE_NOTICE_TOKEN, IS_USE_LINE } = SETTINGFORM;
  /******************
   * LINEトークン
   ******************/
  const manNum100 = 100;
  if (validMaxNum.check(values.lineNoticeToken, manNum100)) {
    errors.lineNoticeToken = validMaxNum.message(LINE_NOTICE_TOKEN.LABEL, manNum100);
  }
  // NOTE 複合的な処理なので現状は当ファイルに記述
  if (values.isUseLine && values.lineNoticeToken === '') {
    errors.lineNoticeToken = lineToken(IS_USE_LINE.LABEL, LINE_NOTICE_TOKEN.LABEL);
  }
  return errors;
};
