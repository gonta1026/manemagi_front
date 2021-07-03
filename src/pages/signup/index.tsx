import React from 'react';
import { useFormik } from 'formik';
import { signupUser } from '../../reducks/services/User';
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

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const validate = (values: TUser) => {
    let errors = {} as TUser;
    errors = signupAndLoginValidate(values, errors, 'signup');
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
      const response: any = await dispatch(
        signupUser({
          name,
          email,
          password,
          passwordConfirmation,
        }),
      );
      if (response.status === 200) {
        console.log('新規登録後のログイン成功です！');
        // TODO トップページへリダイレクトをさせる予定
      }
    },
  });

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>新規登録</BasePageTitle>
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

        <div className="base-vertical-item flex justify-center">
          <BaseButton
            color={'primary'}
            onClick={() => console.log('click')}
            type={'submit'}
            variant={'contained'}
          >
            登録
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default SignUp;
