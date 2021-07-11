import React from 'react';
import { useFormik } from 'formik';
import { loginUser } from '../../reducks/services/User';
import { useDispatch } from 'react-redux';
import { USERFORM } from '../../const/form/user';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField } from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
} from '../../components/common/uiParts/atoms';
import { signupAndLoginValidate } from '../../validate/user/signupAndLogin';
import { TUser } from '../../types/User';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const validate = (values: TUser) => {
    let errors = {} as TUser;
    errors = signupAndLoginValidate(values, errors, 'login');
    return errors;
  };

  const formik = useFormik<TUser>({
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
      if (response.payload.status === 'success') {
        console.log('ログイン成功です！');
        // TODO トップページへリダイレクトをさせる予定
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
