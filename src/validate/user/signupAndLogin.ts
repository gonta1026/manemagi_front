import { TLoginUserOrUser, TUserOrLoginUserFormError } from '../../types/User';
import { USER_FORM } from '../../const/form/user';
import {
  emailFormat,
  validRange,
  validhankakuEngNum,
  validNotSame,
  validBlank,
  validMaxNum,
  validNum,
} from '../';

export const signupAndLoginValidate = <T>(
  values: TLoginUserOrUser,
  errors: TUserOrLoginUserFormError,
): T => {
  const { NAME, EMAIL, PASSWORD, PASSWORD_CONFIRMATION } = USER_FORM;
  const { MAX_50, MAX_255 } = validNum;
  /******************
   *      名前
   ******************/
  if ('name' in values) {
    if (validBlank.check(values.name)) {
      errors.name = validBlank.message(NAME.LABEL);
    }
    if (validMaxNum.check(values.name, MAX_50)) {
      errors.name = validMaxNum.message(NAME.LABEL, MAX_50);
    }
  }
  /******************
   *  メールアドレス
   ******************/

  if (validBlank.check(values.email)) {
    errors.email = validBlank.message(EMAIL.LABEL);
  }
  if (validMaxNum.check(values.email, MAX_255)) {
    errors.email = validMaxNum.message(EMAIL.LABEL, MAX_255);
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
  if ('passwordConfirmation' in values) {
    if (validBlank.check(values.passwordConfirmation)) {
      errors.passwordConfirmation = validBlank.message(PASSWORD_CONFIRMATION.LABEL);
    }
    if (validRange.check(values.passwordConfirmation, 4, 30)) {
      errors.passwordConfirmation = validRange.message(PASSWORD_CONFIRMATION.LABEL);
    }
    if (validNotSame.check(values.passwordConfirmation, values.password)) {
      errors.passwordConfirmation = validNotSame.message(
        PASSWORD_CONFIRMATION.LABEL,
        PASSWORD.LABEL,
      );
    }
  }

  return errors as any;
};
