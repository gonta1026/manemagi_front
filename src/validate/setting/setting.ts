import { TSetting, TSettingFormError } from '../../types/Setting';
import { SETTING_FORM } from '../../const/form/setting';
import { validMaxNum, validNum } from '../';
import { lineToken } from '../message';
export const settingsValidate = (values: TSetting, errors: TSettingFormError) => {
  const { LINE_NOTICE_TOKEN, IS_USE_LINE } = SETTING_FORM;
  const { MAX_50 } = validNum;
  /******************
   * LINEトークン
   ******************/
  if (validMaxNum.check(values.lineNoticeToken, MAX_50)) {
    errors.lineNoticeToken = validMaxNum.message(LINE_NOTICE_TOKEN.LABEL, MAX_50);
  }
  // NOTE 複合的な処理なので現状は当ファイルに記述
  if (values.isUseLine && values.lineNoticeToken === '') {
    errors.lineNoticeToken = lineToken(IS_USE_LINE.LABEL, LINE_NOTICE_TOKEN.LABEL);
  }
  return errors;
};
