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
  BaseLink,
} from '../../components/common/uiParts/atoms';
/* const */
import { USERFORM } from '../../const/form/user';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { loginUser } from '../../reducks/services/User';
/* types */
import { TLoginUser } from '../../types/User';
/* utils */
import LocalStorage from '../../utils/LocalStorage';
/* validate */
import { signupAndLoginValidate } from '../../validate/user/signupAndLogin';
import { emailOrPassword } from '../../validate/message';

const Login = (): JSX.Element => {
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
        storage.setItemAtPageMoveNotice(LocalStorage.noticeKey.loginedNotice);
        router.push(page.top.link());
      }
      if (response.payload.data.status === 401) {
        formik.setFieldError(USERFORM.PASSWORD.ID, emailOrPassword());
      }
    },
  });

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>{page.login.name()}</BasePageTitle>
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
        <BaseLink
          className="block mt-2 text-right text-blue-500 text-sm"
          pathname={page.signup.link()}
        >
          {page.signup.name()}はこちら
        </BaseLink>

        <div className="base-vertical-item flex justify-center">
          <BaseButton
            color={'primary'}
            onClick={() => console.log('click')}
            type={'submit'}
            variant={'contained'}
          >
            {page.login.name()}
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default Login;
