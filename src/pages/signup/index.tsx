import React from 'react';
import { useFormik } from 'formik';
import {
  BasePageTitle,
  BaseButton,
  BaseTextField,
  BaseErrorMessagesWrapper,
} from '../../components/common/uiParts/atoms';
import { BaseContainer } from '../../components/common/uiParts/layout';
import { USERFORM } from '../../const/form/user';
import { TUser } from '../../types/User';
import { signupAndLoginValidate } from '../../validate/user/signupAndLogin';

const SignUp = (): JSX.Element => {
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
      passwordConfirm: '',
    },
    validate,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <BaseContainer>
      <BasePageTitle className={'my-5'}>新規登録</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <div className="base-vertical-item">
          <BaseTextField
            id={USERFORM.NAME.ID}
            label={USERFORM.NAME.LABEL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.touched.name && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.name}</li>
            </BaseErrorMessagesWrapper>
          )}
        </div>

        <div className="base-vertical-item">
          <BaseTextField
            id={USERFORM.EMAIL.ID}
            label={USERFORM.EMAIL.LABEL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.email}</li>
            </BaseErrorMessagesWrapper>
          )}
        </div>

        <div className="base-vertical-item">
          <BaseTextField
            id={USERFORM.PASSWORD.ID}
            label={USERFORM.PASSWORD.LABEL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.password}</li>
            </BaseErrorMessagesWrapper>
          )}
        </div>

        <div className="base-vertical-item">
          <BaseTextField
            id={USERFORM.PASSWORD_CONFIRM.ID}
            label={USERFORM.PASSWORD_CONFIRM.LABEL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirm}
          />
          {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.passwordConfirm}</li>
            </BaseErrorMessagesWrapper>
          )}
        </div>

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
    </BaseContainer>
  );
};

export default SignUp;
