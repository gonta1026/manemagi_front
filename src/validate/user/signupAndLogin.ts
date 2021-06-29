import { TUser } from '../../types/User';
import { validateMessage } from '../message';
import { validHankakuEngNum, validEmail } from '../regExp';
import { USERFORM } from '../../const/form/user';

export const signupAndLoginValidate = (
  values: TUser,
  errors: TUser,
  targetForm: 'signup' | 'login',
) => {
  const { END_MESSAGE, FORMAT, MINI_ENG_NUM, PASSWORD_MESSAGE } = validateMessage;

  /******** 名前 ********/
  if (!values.name && targetForm === 'signup') {
    errors.name = USERFORM.NAME.LABEL + END_MESSAGE;
  }

  /******** メールアドレス ********/
  if (!values.email) {
    errors.email = USERFORM.PASSWORD_CONFIRM.LABEL + END_MESSAGE;
  } else if (!validEmail.test(values.email) && values.email) {
    errors.email = USERFORM.PASSWORD_CONFIRM.LABEL + FORMAT;
  }

  /******** パスワード ********/
  if (!values.password) {
    errors.password = USERFORM.PASSWORD.LABEL + END_MESSAGE;
  } else if (values.password.length < 4 || values.password.length > 30) {
    errors.password = USERFORM.PASSWORD.LABEL + PASSWORD_MESSAGE;
  } else if (!validHankakuEngNum.test(values.password)) {
    errors.password = USERFORM.PASSWORD.LABEL + END_MESSAGE;
  }

  /******** パスワードの再確認 ********/
  if (!values.passwordConfirm && targetForm === 'signup') {
    errors.passwordConfirm = USERFORM.PASSWORD_CONFIRM.LABEL + END_MESSAGE;
  } else if (values.passwordConfirm.length < 4 || values.passwordConfirm.length > 30) {
    errors.passwordConfirm = USERFORM.PASSWORD_CONFIRM.LABEL + PASSWORD_MESSAGE;
  } else if (!validHankakuEngNum.test(values.passwordConfirm)) {
    errors.passwordConfirm = USERFORM.PASSWORD_CONFIRM.LABEL + MINI_ENG_NUM + END_MESSAGE;
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm =
      USERFORM.PASSWORD_CONFIRM.LABEL + 'は' + USERFORM.PASSWORD.LABEL + 'と同じにしてください。';
  }

  return errors;
};
