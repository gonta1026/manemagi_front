import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { LabelAndTextField } from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
  BaseLink,
} from '../../components/common/uiParts';
/* const */
import { USER_FORM } from '../../const/form/user';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { loginUser } from '../../reducks/services/User';
/* types */
import { TLoginUser, TUserFormError } from '../../types/User';
/* utils */
import { noticeStorageValues } from '../../modules/Notice';
import Notice from '../../modules/Notice';
/* validate */
import { signupAndLoginValidate } from '../../validate/user/signupAndLogin';
import { emailOrPassword } from '../../validate/message';

const Login = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const validate = (values: TLoginUser) => {
    let errors = {} as TUserFormError;
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
      setIsLoading(true);
      const response: any = await dispatch(
        loginUser({
          email,
          password,
        }),
      );
      if (response.payload.id) {
        Notice.setItemAtPageMoveNotice(noticeStorageValues.loginedNotice);
        router.push(page.top.link());
      }
      if (response.payload.status === 401) {
        formik.setFieldError(USER_FORM.PASSWORD.ID, emailOrPassword());
      }
      setIsLoading(false);
    },
  });

  useEffect(() => {
    formik.setFieldValue(USER_FORM.EMAIL.ID, process.env.LOGIN_EMAIL || '');
    formik.setFieldValue(USER_FORM.PASSWORD.ID, process.env.LOGIN_PASSWORD || '');
  }, []);

  return (
    <CommonWrapTemplate {...{ isLoading }}>
      <BasePageTitle className={'my-5'}>{page.login.name()}</BasePageTitle>
      <p>テストユーザー情報</p>
      <ul>
        <li>email：test@example.com</li>
        <li>password：11111111</li>
      </ul>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={USER_FORM.EMAIL.ID}
          label={USER_FORM.EMAIL.LABEL}
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
          id={USER_FORM.PASSWORD.ID}
          label={USER_FORM.PASSWORD.LABEL}
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
        <p className={'text-right'}>
          <BaseLink className="mt-2 text-blue-500 text-sm" pathname={page.signup.link()}>
            {page.signup.name()}はこちら
          </BaseLink>
        </p>

        <div className="base-vertical-item flex justify-center">
          <BaseButton variant={'contained'} type={'submit'}>
            {page.login.name()}
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default Login;
