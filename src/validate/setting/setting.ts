import { TSetting } from '../../types/Setting';
import { SETTINGFORM } from '../../const/form/setting';

export const settingsValidate = (values: TSetting, errors: TSetting) => {
  const { LINE_NOTICE_TOKEN, IS_USE_LINE } = SETTINGFORM;
  /******************
   * LINEトークン
   ******************/
  //   仮で空白NGのバリデージョンを設置
  if (values.isUseLine && values.lineNoticeToken === '') {
    errors.lineNoticeToken =
      IS_USE_LINE.LABEL + 'をONにしている際は' + LINE_NOTICE_TOKEN.LABEL + 'を入力してください。';
  }
  return errors;
};
