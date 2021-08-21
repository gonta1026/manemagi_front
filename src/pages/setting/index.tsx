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
import { SETTING_FORM } from '../../const/form/setting';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
/* utils */
import { isEmpty } from '../../utils/function';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { updateSetting } from '../../reducks/services/Setting';
/* types */
import { TSetting, settingAndUser, TSettingFormError } from '../../model/setting';
/* validate */
import { settingsValidate } from '../../validate/setting/setting';

const Setting = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toastActions = useToastAction();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);
  const validate = (values: TSetting) => {
    let errors = {} as TSettingFormError;
    errors = settingsValidate(values, errors);
    return errors;
  };

  useEffect(() => {
    formik.setFieldValue(SETTING_FORM.IS_USE_LINE.ID, settingState.user?.setting.isUseLine);
    const lineNoticeToken = settingState.user?.setting.lineNoticeToken || '';
    formik.setFieldValue(SETTING_FORM.LINE_NOTICE_TOKEN.ID, lineNoticeToken);
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
      if (response.payload.status === 'success') {
        const { handleToastOpen } = toastActions;
        handleToastOpen({
          message: `${page.setting.edit.name()}を更新しました！`,
          autoHideDuration: 3000,
        });
      }
      if (response.payload.data.status === 401) {
        formik.setFieldError(
          SETTING_FORM.LINE_NOTICE_TOKEN.ID,
          'LINEトークンを再確認してください。',
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
        で{SETTING_FORM.LINE_NOTICE_TOKEN.LABEL}を取得してください。
      </>
    );
  })();

  const isUseLineHelperText = (() => {
    return (
      <>
        こちらをONにしておくと買い物登録、請求登録のデフォルトの送信設定がONになります。
        <br />
        なお、ONにしていても登録時にLINE送信設定はOFFヘ変更可能です。
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
        {/* LINEトークン（lineNoticeToken）*/}
        <LabelAndTextField
          helperText={tokenHelperText}
          id={SETTING_FORM.LINE_NOTICE_TOKEN.ID}
          label={SETTING_FORM.LINE_NOTICE_TOKEN.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={'cyttLYOIg3Z...（100文字まで）'}
          value={formik.values.lineNoticeToken ?? ''}
          wrapClass="base-vertical-item"
        >
          {formik.errors.lineNoticeToken && formik.touched.lineNoticeToken && (
            <BaseErrorMessagesWrapper>
              <li className="mt-1">{formik.errors.lineNoticeToken}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>
        {/* LINEのデフォルト通知（isUseLine）*/}
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
            ※こちらのユーザーアカウントは共通の動作確認用のアカウントになるためラインの通知を行うことは出来ません。
          </p>
        )}
        <div className="base-vertical-item text-center">
          <BaseButton type={'submit'} disabled={isDisabled()}>
            確認
          </BaseButton>
          <hr className="my-5" />

          <BaseButton
            customType={'arrowBack'}
            onClick={() => {
              router.back();
            }}
          >
            前に戻る
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default Setting;
