import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
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
} from '../../components/common/uiParts/atoms';
import ConfirmModal from '../../components/common/modal/ConfirmModal';
import { IsUseLineHelper } from '../../components/pages/common';
/* const */
import { SHOPPINGFORM } from '../../const/form/shopping';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchShops } from '../../reducks/services/Shop';
import { createShopping } from '../../reducks/services/Shopping';
/* types */
import { TShoppingForm, TShoppingFormError } from '../../types/Shopping';
import { TShop } from '../../types/Shop';
import { settingAndUser } from '../../types/Setting';
/* utils */
import { formatDay } from '../../utils/FormatDate';
import { isEmpty, formatPriceYen } from '../../utils/function';
import LocalStorage from '../../utils/LocalStorage';
/* validate */
import { shoppingValidate } from '../../validate/shopping/new';
/* utils */

const ShoppingNew = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [shops, setShops] = useState<TShop[]>([]);
  const dispatch = useDispatch();
  const toastActions = useToastAction();
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
    fetchShopsAndSetShops();
  }, []);

  useEffect(() => {
    formik.setFieldValue(SHOPPINGFORM.IS_LINE_NOTICE.ID, settingState.user?.setting.isUseLine);
    // NOTE setFieldValueでIS_LINE_NOTICEをセットしたことによってエラーがセットされてしまうため、下記で無理やりエラーを削除
    setTimeout(() => {
      formik.setFieldError(SHOPPINGFORM.PRICE.ID, '');
      formik.setFieldError(SHOPPINGFORM.SHOP_ID.ID, '');
      formik.setFieldError;
    }, 100);
  }, [settingState]);

  const fetchShopsAndSetShops = async () => {
    const response: any = await dispatch(fetchShops());
    if (response.payload.status === 'success') {
      const shops: TShop[] = response.payload.data.shops;
      setShops(shops);
    }
  };

  return (
    <CommonWrapTemplate>
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          const response: any = await dispatch(createShopping(formik.values));
          setOpen(false);
          if (response.payload.status === 'success') {
            const storage = new LocalStorage();
            storage.setItemAtPageMoveNotice('shoppingedNotice');
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
          <dt>{SHOPPINGFORM.PRICE.LABEL}</dt>
          <dd>{formatPriceYen ? formatPriceYen(formik.values.price) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.DATE.LABEL}</dt>
          <dd>{formik.values.date}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.SHOP_ID.LABEL}</dt>
          <dd>{shops.find((shop) => shop.id === formik.values.shopId)?.name}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.DESCRIPTION.LABEL}</dt>
          <dd>{formik.values.description}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.IS_LINE_NOTICE.LABEL}</dt>
          <dd>{formik.values.isLineNotice ? '通知する' : '通知しない'}</dd>
        </dl>
      </ConfirmModal>
      <BasePageTitle className={'my-5'}>{page.shopping.register.name()}</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        {/* 金額(price) */}
        <LabelAndTextField
          id={SHOPPINGFORM.PRICE.ID}
          label={SHOPPINGFORM.PRICE.LABEL}
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
          id={SHOPPINGFORM.DATE.ID}
          label={SHOPPINGFORM.DATE.LABEL}
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
          id={SHOPPINGFORM.SHOP_ID.ID}
          label={SHOPPINGFORM.SHOP_ID.LABEL}
          onChange={(e: any) => {
            formik.setFieldValue(SHOPPINGFORM.SHOP_ID.ID, e.target.value);
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
          id={SHOPPINGFORM.DESCRIPTION.ID}
          label={SHOPPINGFORM.DESCRIPTION.LABEL}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.description ?? ''}
          wrapClass="base-vertical-item"
        />

        {/* LINE通知(isLineNotice) */}
        <LabelAndSwitch
          className={'base-vertical-item'}
          checked={formik.values.isLineNotice}
          disabled={!settingState.user?.setting.isUseLine}
          helperText={!settingState.user?.setting.isUseLine && <IsUseLineHelper />}
          onChange={() =>
            formik.setFieldValue(SHOPPINGFORM.IS_LINE_NOTICE.ID, !formik.values.isLineNotice)
          }
          id={SHOPPINGFORM.IS_LINE_NOTICE.ID}
          label={`${SHOPPINGFORM.IS_LINE_NOTICE.LABEL}${formik.values.isLineNotice ? 'ON' : 'OFF'}`}
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
