import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { SETTINGFORM } from '../../const/form/setting';
import useToastAction from '../../customHook/useToastAction';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField } from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
  BaseSwitch,
} from '../../components/common/uiParts/atoms';
import { settingsValidate } from '../../validate/setting/setting';
import { updateSetting } from '../../reducks/services/Setting';
import { TSetting, settingAndUser } from '../../types/Setting';

import FormControlLabel from '@material-ui/core/FormControlLabel';

const Setting = (): JSX.Element => {
  const router = useRouter();
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
      <BasePageTitle className={'my-5'}>LINE設定</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={SETTINGFORM.LINE_NOTICE_TOKEN.ID}
          label={SETTINGFORM.LINE_NOTICE_TOKEN.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lineNoticeToken ?? ''}
        >
          {formik.errors.lineNoticeToken && formik.touched.lineNoticeToken && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.lineNoticeToken}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <div className="base-vertical-item flex items-center">
          {/* FormControlLabelはコンポーネント化する */}
          <FormControlLabel
            control={
              <BaseSwitch
                checked={formik.values.isUseLine}
                color="primary"
                id={SETTINGFORM.IS_USE_LINE.ID}
                onChange={() => formik.setFieldValue('isUseLine', !formik.values.isUseLine)}
              />
            }
            label={`${SETTINGFORM.IS_USE_LINE.LABEL}${formik.values.isUseLine ? 'ON' : 'OFF'}`}
          />
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
      <hr className="my-5" />
      <div className="flex justify-center">
        <BaseButton
          color={'secondary'}
          onClick={() => {
            router.push('/shop/new');
          }} //本来はショップ一覧画面へ遷移
          type={'button'}
          variant={'contained'}
        >
          戻る
        </BaseButton>
      </div>
    </CommonWrapTemplate>
  );
};

export default Setting;
