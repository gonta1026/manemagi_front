import { TUser } from '../../types/User';
import { USERFORM } from '../../const/form/user';
import {
  blankCheckMessage,
  emailFormatCheckMessage,
  rangeCheckMessage,
  hankakuEngNumCheckMessage,
  sameCheckMessage,
} from '../';

export const signupAndLoginValidate = (
  values: TUser,
  errors: TUser,
  targetForm: 'signup' | 'login',
) => {
  const { NAME, EMAIL, PASSWORD, PASSWORD_CONFIRM } = USERFORM;
  /******** 名前 ********/
  if (targetForm === 'signup') {
    errors.name = blankCheckMessage(values.name, NAME.LABEL);
  }
  /******** メールアドレス ********/
  errors.email = blankCheckMessage(values.email, EMAIL.LABEL);
  errors.email = emailFormatCheckMessage(values.email, EMAIL.LABEL);
  /******** パスワード ********/
  errors.password = blankCheckMessage(values.password, PASSWORD.LABEL);
  errors.password = rangeCheckMessage(values.password, PASSWORD.LABEL, 4, 30);
  errors.password = hankakuEngNumCheckMessage(values.password, PASSWORD.LABEL);
  /******** パスワードの再確認 ********/
  errors.passwordConfirm = blankCheckMessage(values.passwordConfirm, PASSWORD_CONFIRM.LABEL);
  errors.passwordConfirm = rangeCheckMessage(values.passwordConfirm, PASSWORD_CONFIRM.LABEL, 4, 30);
  errors.passwordConfirm = hankakuEngNumCheckMessage(
    values.passwordConfirm,
    PASSWORD_CONFIRM.LABEL,
  );
  errors.passwordConfirm = sameCheckMessage(
    values.passwordConfirm,
    PASSWORD_CONFIRM.LABEL,
    values.password,
    PASSWORD.LABEL,
  );

  return errors;
};
