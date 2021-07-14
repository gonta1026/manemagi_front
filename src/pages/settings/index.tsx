import React from 'react';
import { useFormik } from 'formik';
import { fetchSettingAndUser } from '../../reducks/services/Setting';
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
import { TSetting } from '../../types/Setting';

const Settings = (): JSX.Element => {
  const dispatch = useDispatch();
  const validate = (values: TSetting) => {
    let errors = {} as TSetting;
    errors = settingsValidate(values, errors);
    return errors;
  };

  const formik = useFormik<TSetting>({
    initialValues: {
      is_use_line: false,
      line_notice_token: '',
    },
    validate,
    onSubmit: async (values) => {
      // const { is_use_line, line_notice_token } = values;
      // const response: any = await dispatch(
      //   fetchSettingAndUser({
      //     is_use_line,
      //     line_notice_token,
      //   }),
      // );
      // if (response.payload.status === 'success') {
      //   console.log('LINE設定の更新完了!');
      // }
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
          value={formik.values.line_notice_token as string}
        >
          {formik.errors.line_notice_token && formik.touched.line_notice_token && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.line_notice_token}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <div className="base-vertical-item flex items-center">
          <BaseSwitch
            checked={formik.values.is_use_line}
            color="primary"
            onChange={() => formik.setFieldValue('is_use_line', !formik.values.is_use_line)}
          />
          <p className="ml-2">LINE通知{formik.values.is_use_line ? 'ON' : 'OFF'}</p>
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
