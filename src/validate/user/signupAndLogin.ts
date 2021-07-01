import { TUser } from '../../types/User';
import { USERFORM } from '../../const/form/user';
import { emailFormat, validRange, validhankakuEngNum, validSame, validBlank } from '../';

export const signupAndLoginValidate = (
  values: TUser,
  errors: TUser,
  targetForm: 'signup' | 'login',
) => {
  const { NAME, EMAIL, PASSWORD, PASSWORD_CONFIRM } = USERFORM;
  /******************
   *      名前
   ******************/
  if (targetForm === 'signup' && validBlank.check(values.name)) {
    errors.name = validBlank.message(NAME.LABEL);
  }
  /******************
   *  メールアドレス
   ******************/
  if (validBlank.check(values.email)) {
    errors.email = validBlank.message(EMAIL.LABEL);
  }
  if (emailFormat.check(values.email)) {
    errors.email = emailFormat.message(EMAIL.LABEL);
  }
  /******************
   *    パスワード
   ******************/
  if (validBlank.check(values.password)) {
    errors.password = validBlank.message(PASSWORD.LABEL);
  }
  if (validRange.check(values.password, 4, 30)) {
    errors.password = validRange.message(PASSWORD.LABEL);
  }
  if (validhankakuEngNum.check(values.password)) {
    errors.password = validhankakuEngNum.message(PASSWORD.LABEL);
  }
  /******************
   * パスワードの再確認
   ******************/
  if (validBlank.check(values.passwordConfirm)) {
    errors.passwordConfirm = validBlank.message(PASSWORD_CONFIRM.LABEL);
  }
  if (validRange.check(values.passwordConfirm, 4, 30)) {
    errors.passwordConfirm = validRange.message(PASSWORD_CONFIRM.LABEL);
  }
  if (validSame.check(values.passwordConfirm, values.password)) {
    errors.passwordConfirm = validSame.message(PASSWORD_CONFIRM.LABEL, PASSWORD.LABEL);
  }
  return errors;
};
