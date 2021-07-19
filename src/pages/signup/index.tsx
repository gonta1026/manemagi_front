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
import { signupUser } from '../../reducks/services/User';
/* types */
import { TUser } from '../../types/User';
/* utils */
import LocalStorage from '../../utils/LocalStorage';
/* validate */
import { signupAndLoginValidate } from '../../validate/user/signupAndLogin';

const SignUp = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const validate = (values: TUser) => {
    let errors = {} as TUser;
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
      const response: any = await dispatch(
        signupUser({
          name,
          email,
          password,
          passwordConfirmation,
        }),
      );
      if (response.payload.status === 'success') {
        const storage = new LocalStorage();
        storage.setItemAtNotice({
          key: 'loginedNotice',
          noticeMessage: 'ユーザー登録をしログインしました！',
        });
        router.push('/shop/new');
        // TODO トップページ？へリダイレクトをさせる予定。とりあえずはお店の登録画面に遷移させておく
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
          focus
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
