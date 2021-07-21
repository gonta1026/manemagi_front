import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField, LabelAndSwitch } from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
  BaseLink,
} from '../../components/common/uiParts/atoms';
/* const */
import { SETTINGFORM } from '../../const/form/setting';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { updateSetting } from '../../reducks/services/Setting';
/* types */
import { TSetting, settingAndUser } from '../../types/Setting';
/* validate */
import { settingsValidate } from '../../validate/setting/setting';

const Setting = (): JSX.Element => {
  const dispatch = useDispatch();
  const toastActions = useToastAction();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);
  const validate = (values: TSetting) => {
    let errors = {} as TSetting;
    errors = settingsValidate(values, errors);
    return errors;
  };

  useEffect(() => {
    formik.setFieldValue(SETTINGFORM.IS_USE_LINE.ID, settingState.user.setting.isUseLine);
    formik.setFieldValue(
      SETTINGFORM.LINE_NOTICE_TOKEN.ID,
      settingState.user.setting.lineNoticeToken,
    );
  }, [settingState]);

  const formik = useFormik<TSetting>({
    initialValues: {
      isUseLine: false,
      lineNoticeToken: '',
    },
    validate,
    onSubmit: async (values) => {
      const { isUseLine, lineNoticeToken } = values;
      const response: any = await dispatch(
        updateSetting({
          isUseLine,
          lineNoticeToken,
        }),
      );
      if (response.payload.status === 'SUCCESS') {
        const { handleToastOpen } = toastActions;
        handleToastOpen({
          message: `LINE設定を更新しました！`,
          autoHideDuration: 3000,
        });
      }
      if (response.payload.data.status === 401) {
        formik.setFieldError(
          SETTINGFORM.LINE_NOTICE_TOKEN.ID,
          'LINEトークンを再確認してください。',
        );
      }
    },
  });

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <BasePageTitle className={'my-5'}>{page.setting.edit.name()}</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={SETTINGFORM.LINE_NOTICE_TOKEN.ID}
          label={SETTINGFORM.LINE_NOTICE_TOKEN.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lineNoticeToken ?? ''}
          focus
        >
          {formik.errors.lineNoticeToken && formik.touched.lineNoticeToken && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.lineNoticeToken}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>
        {/* LINEのデフォルト通知（isUseLine）*/}
        <LabelAndSwitch
          className={'base-vertical-item flex items-center'}
          checked={formik.values.isUseLine}
          onChange={() => formik.setFieldValue('isUseLine', !formik.values.isUseLine)}
          id={SETTINGFORM.IS_USE_LINE.ID}
          label={`${SETTINGFORM.IS_USE_LINE.LABEL}${formik.values.isUseLine ? 'ON' : 'OFF'}`}
        />
        <div className="base-vertical-item flex justify-center">
          <BaseButton color={'primary'} type={'submit'} variant={'contained'}>
            更新
          </BaseButton>
        </div>
        <hr className="my-5" />
        <div className="flex justify-center">
          <BaseLink pathname={page.shop.register.link()}>
            <BaseButton color={'secondary'} variant={'contained'}>
              {page.shop.register.name()}へ戻る
            </BaseButton>
          </BaseLink>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default Setting;
