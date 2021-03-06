import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { LabelAndTextField, LabelAndSwitch, BaseButton } from '../../components/common/uiParts';
import { BasePageTitle, BaseErrorMessagesWrapper } from '../../components/common/uiParts';
/* const */
import { TestUser } from '../../const';
import { SETTING_FORM } from '../../form/setting';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
/* utils */
import { isEmpty } from '../../utils/function';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { updateSetting } from '../../reducks/services/Setting';
/* types */
import { TSettingFormik, settingAndUser, TSettingFormError } from '../../model/setting';
/* validate */
import { settingsValidate } from '../../validate/setting/setting';

const Setting = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toastActions = useToastAction();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);
  const validate = (values: TSettingFormik) => {
    let errors = {} as TSettingFormError;
    errors = settingsValidate(values, errors);
    return errors;
  };

  useEffect(() => {
    formik.setFieldValue(SETTING_FORM.IS_USE_LINE.ID, settingState.user?.setting.isUseLine);
    const lineNoticeToken = settingState.user?.setting.lineNoticeToken || '';
    formik.setFieldValue(SETTING_FORM.LINE_NOTICE_TOKEN.ID, lineNoticeToken);
  }, [settingState]);

  const formik = useFormik<TSettingFormik>({
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
      if (response.payload.status === 'success') {
        const { handleToastOpen } = toastActions;
        handleToastOpen({
          message: `${page.setting.edit.name()}????????????????????????`,
          autoHideDuration: 3000,
        });
      }
      if (response.payload.data.status === 401) {
        formik.setFieldError(
          SETTING_FORM.LINE_NOTICE_TOKEN.ID,
          'LINE?????????????????????????????????????????????',
        );
      }
    },
  });

  const tokenHelperText = (() => {
    return (
      <>
        <a href="https://notify-bot.line.me/ja/" target="_blank" rel="noopener noreferrer">
          LINE NOTIFY
        </a>
        ???{SETTING_FORM.LINE_NOTICE_TOKEN.LABEL}??????????????????????????????
      </>
    );
  })();

  const isUseLineHelperText = (() => {
    return (
      <>
        ????????????ON????????????????????????????????????????????????????????????????????????????????????ON??????????????????
        <br />
        ?????????ON??????????????????????????????LINE???????????????OFF????????????????????????
      </>
    );
  })();

  const isDisabled = () => {
    if (!isEmpty(formik.errors) || settingState.user.name === 'test') {
      return true;
    }
  };

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <BasePageTitle className={'my-5'}>{page.setting.edit.name()}</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        {/* LINE???????????????lineNoticeToken???*/}
        <LabelAndTextField
          helperText={tokenHelperText}
          id={SETTING_FORM.LINE_NOTICE_TOKEN.ID}
          label={SETTING_FORM.LINE_NOTICE_TOKEN.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={'cyttLYOIg3Z...???100???????????????'}
          value={formik.values.lineNoticeToken ?? ''}
          wrapClass="base-vertical-item"
        >
          {formik.errors.lineNoticeToken && formik.touched.lineNoticeToken && (
            <BaseErrorMessagesWrapper>
              <li className="mt-1">{formik.errors.lineNoticeToken}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>
        {/* LINE???????????????????????????isUseLine???*/}
        <LabelAndSwitch
          className={'base-vertical-item'}
          checked={formik.values.isUseLine}
          helperText={isUseLineHelperText}
          onChange={() => formik.setFieldValue('isUseLine', !formik.values.isUseLine)}
          id={SETTING_FORM.IS_USE_LINE.ID}
          label={`${SETTING_FORM.IS_USE_LINE.LABEL}${formik.values.isUseLine ? 'ON' : 'OFF'}`}
        />
        {settingState.user.email === TestUser.email && (
          <p className="text-red-500 text-xs">
            ????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
          </p>
        )}
        <div className="base-vertical-item text-center">
          <BaseButton type={'submit'} disabled={isDisabled()}>
            ??????
          </BaseButton>
          <hr className="my-5" />

          <BaseButton
            customType={'arrowBack'}
            onClick={() => {
              router.back();
            }}
          >
            ????????????
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default Setting;
