import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import {
  LabelAndTextField,
  LabelAndTextArea,
  LabelAndSelect,
  LabelAndSwitch,
  ExecutionAndBackButtons,
} from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseErrorMessagesWrapper,
  BaseLink,
  ConfirmModal,
  IsUseLineHelper,
} from '../../components/common/uiParts';
//customHook */
import { useToastAction, useShop } from '../../customHook';
/* const */
import { SHOPPING_FORM } from '../../const/form/shopping';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { createShopping } from '../../reducks/services/Shopping';
/* types */
import { TShoppingForm, TShoppingFormError } from '../../types/Shopping';
import { settingAndUser } from '../../types/Setting';
/* utils */
import { formatDay } from '../../utils/FormatDate';
import { isEmpty, formatPriceYen } from '../../utils/function';
import { noticeStorageValues } from '../../modules/LocalStorage';
import Notice from '../../modules/Notice';
/* validate */
import { shoppingValidate } from '../../validate/shopping/new';

const ShoppingNew = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);

  const toastActions = useToastAction();
  const { shops, fetchShopsAndSet } = useShop();

  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const validate = (values: TShoppingForm) => {
    let errors = {} as TShoppingFormError;
    errors = shoppingValidate(values, errors);
    return errors;
  };

  const formik = useFormik<TShoppingForm>({
    initialValues: {
      price: null,
      date: formatDay(new Date()),
      description: '',
      isLineNotice: false,
      shopId: null,
    },
    validate,
    onSubmit: () => setOpen(true),
  });

  useEffect(() => {
    fetchShopsAndSet();
  }, []);

  useEffect(() => {
    formik.setFieldValue(SHOPPING_FORM.IS_LINE_NOTICE.ID, settingState.user?.setting.isUseLine);
    // NOTE setFieldValueでIS_LINE_NOTICEをセットしたことによってエラーがセットされてしまうため、下記で無理やりエラーを削除
    setTimeout(() => {
      formik.setFieldError(SHOPPING_FORM.PRICE.ID, '');
      formik.setFieldError(SHOPPING_FORM.SHOP_ID.ID, '');
      formik.setFieldError;
    }, 100);
  }, [settingState]);

  return (
    <CommonWrapTemplate>
      <ConfirmModal
        focus
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          const response: any = await dispatch(createShopping(formik.values));
          setOpen(false);
          if (response.payload.status === 'success') {
            const notice = new Notice();
            notice.setItemAtPageMoveNotice(noticeStorageValues.shoppingedNotice);
            router.push(page.top.link());
          } else {
            const { handleToastOpen } = toastActions;
            handleToastOpen({
              message: `買い物の登録に失敗しました。`,
              severity: 'error',
            });
          }
        }}
      >
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.PRICE.LABEL}</dt>
          <dd>{formatPriceYen ? formatPriceYen(formik.values.price) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.DATE.LABEL}</dt>
          <dd>{formik.values.date}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.SHOP_ID.LABEL}</dt>
          <dd>{shops.find((shop) => shop.id === formik.values.shopId)?.name}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.DESCRIPTION.LABEL}</dt>
          <dd>{formik.values.description}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.IS_LINE_NOTICE.LABEL}</dt>
          <dd>{formik.values.isLineNotice ? '通知する' : '通知しない'}</dd>
        </dl>
      </ConfirmModal>
      <BasePageTitle className={'my-5'}>{page.shopping.register.name()}</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        {/* 金額(price) */}
        <LabelAndTextField
          id={SHOPPING_FORM.PRICE.ID}
          label={SHOPPING_FORM.PRICE.LABEL}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          type={'number'}
          value={formik.values.price ? formik.values.price : ''}
          wrapClass="base-vertical-item"
        >
          {formik.errors.price && formik.touched.price && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.price}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>
        {/* 買い物日(date) */}
        <LabelAndTextField
          id={SHOPPING_FORM.DATE.ID}
          label={SHOPPING_FORM.DATE.LABEL}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          required
          type={'date'}
          value={formik.values.date ?? ''}
          wrapClass="base-vertical-item"
        >
          {formik.errors.date && formik.touched.date && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.date}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>
        {/* お店(shopId)) */}
        <LabelAndSelect
          className="base-vertical-item"
          helperText={
            <>
              {page.shop.register.name()}は
              <BaseLink pathname={page.shop.register.link()}>こちら</BaseLink>で登録。
            </>
          }
          id={SHOPPING_FORM.SHOP_ID.ID}
          label={SHOPPING_FORM.SHOP_ID.LABEL}
          onChange={(e: any) => {
            formik.setFieldValue(SHOPPING_FORM.SHOP_ID.ID, e.target.value);
          }}
          options={shops}
          required
          value={formik.values.shopId ?? ''}
        />
        {formik.errors.shopId && formik.touched.shopId && (
          <BaseErrorMessagesWrapper>
            <li>{formik.errors.shopId}</li>
          </BaseErrorMessagesWrapper>
        )}
        {/* 説明(description)) */}
        <LabelAndTextArea
          id={SHOPPING_FORM.DESCRIPTION.ID}
          label={SHOPPING_FORM.DESCRIPTION.LABEL}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description ?? ''}
          wrapClass="base-vertical-item"
        >
          {formik.errors.description && formik.touched.description && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.description}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextArea>

        {/* LINE通知(isLineNotice) */}
        <LabelAndSwitch
          className={'base-vertical-item'}
          checked={formik.values.isLineNotice}
          disabled={!settingState.user?.setting.isUseLine}
          helperText={!settingState.user?.setting.isUseLine && <IsUseLineHelper />}
          onChange={() =>
            formik.setFieldValue(SHOPPING_FORM.IS_LINE_NOTICE.ID, !formik.values.isLineNotice)
          }
          id={SHOPPING_FORM.IS_LINE_NOTICE.ID}
          label={`${SHOPPING_FORM.IS_LINE_NOTICE.LABEL}${
            formik.values.isLineNotice ? 'ON' : 'OFF'
          }`}
        />
        <ExecutionAndBackButtons
          backPathname={page.top.link()}
          backName={`${page.top.name()}へ戻る`}
          className={'base-vertical-item'}
          nextName={'確認'}
          disabledExecution={!isEmpty(formik.errors) && formik.submitCount > 0}
        />
      </form>
    </CommonWrapTemplate>
  );
};

export default ShoppingNew;
