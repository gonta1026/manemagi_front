import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../../components/common/template/CommonWrapTemplate';
import {
  BaseErrorMessagesWrapper,
  BasePageTitle,
  BaseLink,
} from '../../../components/common/uiParts/atoms';
import {
  LabelAndSelect,
  LabelAndTextField,
  LabelAndTextArea,
  LabelAndSwitch,
  ExecutionAndBackButtons,
} from '../../../components/common/molecules';
import ConfirmModal from '../../../components/common/modal/ConfirmModal';
import { IsUseLineHelper } from '../../../components/pages/common';
/* const */
import { SHOPPINGFORM } from '../../../const/form/shopping';
/* customHook */
import useToastAction from '../../../customHook/useToastAction';
/* pageMap */
import { page } from '../../../pageMap';
/* reducks */
import { fetchShops } from '../../../reducks/services/Shop';
import { fetchEditShopping, updateShopping } from '../../../reducks/services/Shopping';
/* types */
import { TShopping, TShoppingForm, TShoppingFormError } from '../../../types/Shopping';
import { TShop } from '../../../types/Shop';
import { settingAndUser } from '../../../types/Setting';

/* utils */
import { formatDay } from '../../../utils/FormatDate';
import LocalStorage from '../../../utils/LocalStorage';
import { isEmpty, formatPriceYen } from '../../../utils/function';
/* validate */
import { shoppingValidate } from '../../../validate/shopping/new';

const ShoppingEdit = (): JSX.Element => {
  const router = useRouter();
  const [shops, setShops] = useState<TShop[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const toastActions = useToastAction();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchShopsAndSetShops();
    fetchShoppingAndSetShopping();
  }, [router]);

  const fetchShoppingAndSetShopping = async () => {
    if (router.query.Id) {
      const response: any = await dispatch(fetchEditShopping(router.query.Id as string));
      if (response.payload.status === 'success') {
        const shopping: TShopping = response.payload.data;
        formik.setFieldValue(SHOPPINGFORM.PRICE.ID, shopping.price);
        formik.setFieldValue(SHOPPINGFORM.DATE.ID, formatDay(shopping.date as Date));
        formik.setFieldValue(SHOPPINGFORM.DESCRIPTION.ID, shopping.description);
        formik.setFieldValue(SHOPPINGFORM.IS_LINE_NOTICE.ID, shopping.isLineNotice);
        formik.setFieldValue(SHOPPINGFORM.SHOP_ID.ID, shopping.shopId);
      }
    }
  };
  const fetchShopsAndSetShops = async () => {
    const response: any = await dispatch(fetchShops());
    const shops: TShop[] = response.payload.data.shops;
    setShops(shops);
  };
  const validate = (values: TShoppingForm) => {
    let errors = {} as TShoppingFormError;
    errors = shoppingValidate(values, errors);
    return errors;
  };

  const formik = useFormik<TShoppingForm>({
    initialValues: {
      price: null,
      date: new Date(),
      description: '',
      isLineNotice: false,
      shopId: null,
    },
    validate,
    onSubmit: () => setOpen(true),
  });

  return (
    <CommonWrapTemplate>
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          const response: any = await dispatch(
            updateShopping({ ShoppingForm: formik.values, id: router.query.Id as string }),
          );
          if (response.payload.status === 'success') {
            const storage = new LocalStorage();
            storage.setItemAtPageMoveNotice(LocalStorage.noticeKey.shoppingUpdatedNotice);
            router.push(page.shopping.show.link(router.query.Id as string));
          } else {
            const { handleToastOpen } = toastActions;
            handleToastOpen({
              message: `買い物の更新に失敗しました。`,
              severity: 'error',
            });
          }
        }}
        modaltitle={'変更'}
      >
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.PRICE.LABEL}</dt>
          <dd>{formatPriceYen(formik.values.price)}</dd>
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
      <BasePageTitle className={'my-5'}>{page.shopping.edit.name()}</BasePageTitle>
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
          disabled={!settingState.user.setting.isUseLine}
          helperText={!settingState.user.setting.isUseLine && <IsUseLineHelper />}
          onChange={() =>
            formik.setFieldValue(SHOPPINGFORM.IS_LINE_NOTICE.ID, !formik.values.isLineNotice)
          }
          id={SHOPPINGFORM.IS_LINE_NOTICE.ID}
          label={`${SHOPPINGFORM.IS_LINE_NOTICE.LABEL}${formik.values.isLineNotice ? 'ON' : 'OFF'}`}
        />
        <ExecutionAndBackButtons
          backPathname={page.shopping.list.link()}
          backName={`${page.shopping.list.name()}へ戻る`}
          className={'base-vertical-item'}
          nextName={'確認'}
          disabledExecution={!isEmpty(formik.errors)}
        />
      </form>
    </CommonWrapTemplate>
  );
};

export default ShoppingEdit;
