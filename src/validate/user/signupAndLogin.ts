import { TLoginUserOrUser, TUserFormError } from '../../types/User';
import { USER_FORM } from '../../const/form/user';
import {
  emailFormat,
  validRangePassword,
  validhankakuEngNum,
  validNotSame,
  validBlank,
  validMaxNum,
  validNum,
} from '../';

export const signupAndLoginValidate = <T>(values: TLoginUserOrUser, errors: TUserFormError): T => {
  const { NAME, EMAIL, PASSWORD, PASSWORD_CONFIRMATION } = USER_FORM;
  const { MAX_50, MAX_128, MAX_255, MIN_6 } = validNum;
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
  if (validRangePassword.check(values.password, MIN_6, MAX_128)) {
    errors.password = validRangePassword.message(PASSWORD.LABEL, MIN_6, MAX_128);
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
    if (validRangePassword.check(values.passwordConfirmation, MIN_6, MAX_128)) {
      errors.passwordConfirmation = validRangePassword.message(
        PASSWORD_CONFIRMATION.LABEL,
        MIN_6,
        MAX_128,
      );
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
