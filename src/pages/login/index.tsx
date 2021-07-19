import React from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField } from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
} from '../../components/common/uiParts/atoms';
/* const */
import { USERFORM } from '../../const/form/user';
/* reducks */
import { loginUser } from '../../reducks/services/User';
/* types */
import { TLoginUser } from '../../types/User';
/* utils */
import LocalStorage from '../../utils/LocalStorage';
/* validate */
import { signupAndLoginValidate } from '../../validate/user/signupAndLogin';
import { validateMessage } from '../../validate/message';

const Login = (): JSX.Element => {
  const { EMAIL_OR_PASSWORD } = validateMessage;
  const router = useRouter();
  const dispatch = useDispatch();
  const validate = (values: TLoginUser) => {
    let errors = {} as TLoginUser;
    errors = signupAndLoginValidate(values, errors);
    return errors;
  };

  const formik = useFormik<TLoginUser>({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: async (values) => {
      const { email, password } = values;
      const response: any = await dispatch(
        loginUser({
          email,
          password,
        }),
      );
      if (response.payload.data.id) {
        const storage = new LocalStorage();
        storage.setItemAtNotice({ key: 'loginedNotice', noticeMessage: 'ログインしました！' });
        router.push('/shop/new');
        // TODO トップページ？へリダイレクトをさせる予定。とりあえずはお店の登録画面に遷移させておく
      }
      if (response.payload.data.status === 401) {
        formik.setFieldError(USERFORM.PASSWORD.ID, EMAIL_OR_PASSWORD);
      }
    },
  });

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>ログイン</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={USERFORM.EMAIL.ID}
          label={USERFORM.EMAIL.LABEL}
          focus
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        >
          {formik.errors.email && formik.touched.email && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.email}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={USERFORM.PASSWORD.ID}
          label={USERFORM.PASSWORD.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        >
          {formik.errors.password && formik.touched.password && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.password}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <div className="base-vertical-item flex justify-center">
          <BaseButton
            color={'primary'}
            onClick={() => console.log('click')}
            type={'submit'}
            variant={'contained'}
          >
            ログイン
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default Login;
