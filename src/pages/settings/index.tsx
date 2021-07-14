import React from 'react';
import { useFormik } from 'formik';
import { updateSettings } from '../../reducks/services/Settings';
import { useDispatch } from 'react-redux';
import { SETTINGSFORM } from '../../const/form/settings';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField } from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
  BaseSwitch,
} from '../../components/common/uiParts/atoms';
import { settingsValidate } from '../../validate/settings/setting';
import { TSettings } from '../../types/Settings';

const Settings = (): JSX.Element => {
  const dispatch = useDispatch();
  const validate = (values: TSettings) => {
    let errors = {} as TSettings;
    errors = settingsValidate(values, errors);
    return errors;
  };

  const formik = useFormik<TSettings>({
    initialValues: {
      isUseLine: true,
      lineNoticeToken: '',
    },
    validate,
    onSubmit: async (values) => {
      const { isUseLine, lineNoticeToken } = values;
      const response: any = await dispatch(
        updateSettings({
          isUseLine,
          lineNoticeToken,
        }),
      );
      if (response.payload.status === 'success') {
        console.log('LINE設定の更新完了!');
      }
    },
  });

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>LINE設定</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={SETTINGSFORM.LINE_NOTICE_TOKEN.ID}
          label={SETTINGSFORM.LINE_NOTICE_TOKEN.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required={true}
          value={formik.values.lineNoticeToken}
        >
          {formik.errors.lineNoticeToken && formik.touched.lineNoticeToken && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.lineNoticeToken}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <div className="base-vertical-item flex items-center">
          <BaseSwitch
            checked={formik.values.isUseLine}
            color="primary"
            onChange={() => formik.setFieldValue('isUseLine', !formik.values.isUseLine)}
          />
          <p className="ml-2">LINE通知{formik.values.isUseLine ? 'ON' : 'OFF'}</p>
        </div>

        <div className="base-vertical-item flex justify-center">
          <BaseButton
            color={'primary'}
            onClick={() => console.log('click')}
            type={'submit'}
            variant={'contained'}
          >
            更新
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default Settings;
