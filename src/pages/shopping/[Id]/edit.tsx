import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../../components/common/layout/CommonWrapTemplate';
import {
  BaseErrorMessagesWrapper,
  BasePageTitle,
  BaseLink,
  BaseButton,
  ConfirmModal,
  IsUseLineHelper,
} from '../../../components/common/uiParts';
import {
  LabelAndSelect,
  LabelAndTextField,
  LabelAndTextArea,
  LabelAndSwitch,
} from '../../../components/common/uiParts';
/* const */
import { SHOPPING_FORM } from '../../../form/shopping';
/* customHook */
import { useShop, useToastAction } from '../../../customHook/';
/* pageMap */
import { page } from '../../../pageMap';
/* reducks */
import { fetchEditShopping, updateShopping } from '../../../reducks/services/Shopping';
/* types */
import { TShopping, TShoppingForm, TShoppingFormError } from '../../../model/shopping';
import { settingAndUser } from '../../../model/setting';
/* utils */
import { formatDay } from '../../../utils/FormatDate';
import { isEmpty, formatPriceYen } from '../../../utils/function';
/* modules */
import { noticeStorageValues } from '../../../modules/Notice';
import Notice from '../../../modules/Notice';
/* validate */
import { shoppingValidate } from '../../../validate/shopping/new';

const ShoppingEdit = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toastActions = useToastAction();
  const { shops, fetchShopsAndSet } = useShop();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    fetchShopsAndSet();
    fetchShoppingAndSetShopping();
  }, [router]);

  const fetchShoppingAndSetShopping = async () => {
    if (router.query.Id) {
      const response: any = await dispatch(fetchEditShopping(router.query.Id as string));
      if (response.payload.status === 'success') {
        const shopping: TShopping = response.payload.data;
        formik.setFieldValue(SHOPPING_FORM.PRICE.ID, shopping.price);
        formik.setFieldValue(SHOPPING_FORM.DATE.ID, formatDay(shopping.date as Date));
        formik.setFieldValue(SHOPPING_FORM.DESCRIPTION.ID, shopping.description);
        formik.setFieldValue(SHOPPING_FORM.IS_LINE_NOTICE.ID, shopping.isLineNotice);
        formik.setFieldValue(SHOPPING_FORM.SHOP_ID.ID, shopping.shopId);
      }
    }
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
    <CommonWrapTemplate {...{ isLoading }}>
      <ConfirmModal
        focus
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          setIsLoading(true);
          const response: any = await dispatch(
            updateShopping({ ShoppingForm: formik.values, id: router.query.Id as string }),
          );
          if (response.payload.status === 'success') {
            Notice.setItemAtPageMoveNotice(noticeStorageValues.shoppingUpdatedNotice);
            router.push(page.shopping.show.link(router.query.Id as string));
          } else {
            const { handleToastOpen } = toastActions;
            handleToastOpen({
              message: `??????????????????????????????????????????`,
              severity: 'error',
            });
            setIsLoading(false);
          }
        }}
        modaltitle={'??????'}
      >
        <dl className={'list'}>
          <dt>{SHOPPING_FORM.PRICE.LABEL}</dt>
          <dd>{formatPriceYen(formik.values.price)}</dd>
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
          <dd>{formik.values.isLineNotice ? '????????????' : '???????????????'}</dd>
        </dl>
      </ConfirmModal>
      <BasePageTitle className={'my-5'}>{page.shopping.edit.name()}</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        {/* ??????(price) */}
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
        {/* ????????????(date) */}
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
        {/* ??????(shopId)) */}
        <LabelAndSelect
          className="base-vertical-item"
          helperText={
            <>
              {page.shop.register.name()}???
              <BaseLink pathname={page.shop.register.link()}>?????????</BaseLink>????????????
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
        {/* ??????(description)) */}
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

        {/* LINE??????(isLineNotice) */}
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

        <div className="base-vertical-item text-center">
          <BaseButton type={'submit'} disabled={!isEmpty(formik.errors)}>
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

export default ShoppingEdit;
