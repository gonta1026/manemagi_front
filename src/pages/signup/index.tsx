import React, { useState } from 'react';
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
import { signupUser } from '../../reducks/services/User';
/* types */
import { TUser, TUserFormError } from '../../types/User';
/* utils */
import LocalStorage from '../../utils/LocalStorage';
/* validate */
import { signupAndLoginValidate } from '../../validate/user/signupAndLogin';

const SignUp = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const validate = (values: TUser) => {
    let errors = {} as TUserFormError;
    errors = signupAndLoginValidate(values, errors);
    return errors;
  };

  const formik = useFormik<TUser>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate,
    onSubmit: async (values) => {
      const { name, email, password, passwordConfirmation } = values;
      setIsLoading(true);
      const response: any = await dispatch(
        signupUser({
          name,
          email,
          password,
          passwordConfirmation,
        }),
      );
      if (response.payload.status === 422) {
        formik.setFieldError(USERFORM.EMAIL.ID, 'こちらのメールアドレスは既に登録されています。');
      }
      if (response.payload.status === 'success') {
        const storage = new LocalStorage();
        storage.setItemAtPageMoveNotice(LocalStorage.noticeKey.signUpedNotice);
        router.push(page.top.link());
      }
      setIsLoading(false);
    },
  });

  return (
    <CommonWrapTemplate {...{ isLoading }}>
      <BasePageTitle className={'my-5'}>{page.signup.name()}</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={USERFORM.NAME.ID}
          label={USERFORM.NAME.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        >
          {formik.errors.name && formik.touched.name && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.name}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

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

        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={USERFORM.PASSWORD_CONFIRMATION.ID}
          label={USERFORM.PASSWORD_CONFIRMATION.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
        >
          {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.passwordConfirmation}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <BaseLink
          className="block mt-2 text-right text-blue-500 text-sm"
          pathname={page.login.link()}
        >
          {page.login.name()}はこちら
        </BaseLink>

        <div className="base-vertical-item flex justify-center">
          <BaseButton variant={'contained'} type={'submit'}>
            {page.signup.name()}
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default SignUp;
