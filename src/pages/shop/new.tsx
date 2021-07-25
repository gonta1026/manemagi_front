import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
/* const */
import { SHOPFORM } from '../../const/form/shop';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField, LabelAndTextArea } from '../../components/common/molecules';
import BaseModal from '../../components/common/modal/BaseModal';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
  BaseLink,
} from '../../components/common/uiParts/atoms';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
/* page */
import { page } from '../../pageMap';
/* reducks */
import { createShop, fetchShops } from '../../reducks/services/Shop';
/* types */
import { TShop, TShopForm, TShopFormError } from '../../types/Shop';
/* validate */
import { shopNewValidate } from '../../validate/shop/new';

const NewShop = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [shops, setShops] = useState<TShop[]>([]);
  const [isErrorDisplay, setIsErrorDisplay] = useState<boolean>(true);
  const toastActions = useToastAction();
  const dispatch = useDispatch();
  const validate = (values: TShopForm) => {
    let errors = {} as TShopFormError;

    const shopNames = [] as string[];
    shops.forEach((shop) => {
      shopNames.push(shop.name);
    });
    errors = shopNewValidate(values, errors, shopNames);
    return errors;
  };

  const formik = useFormik<TShopForm>({
    initialValues: {
      name: '',
      description: '',
    },
    validate,
    onSubmit: async () => {
      setIsErrorDisplay(false);
      setOpen(true);
    },
  });
  // formik用のクラス等に移動をさせる可能性あり。
  type TFormik = typeof formik;
  const formikFieldInit = (
    formik: TFormik,
    setIsErrorDisplay: React.Dispatch<React.SetStateAction<boolean>>,
    formIds: string[],
  ) => {
    formIds.forEach((formId) => {
      formik.setFieldValue(formId, '');
      // NOTE 時間差にしないとエラーが消えなかったため。setTimeoutを使用
      setTimeout(() => {
        formik.setFieldError(formId, '');
        formik.setFieldTouched(formId, false);
      }, 10);
      setIsErrorDisplay(true);
    });
  };

  useEffect(() => {
    fetchShopsAndSetShops();
  }, []);

  const fetchShopsAndSetShops = async () => {
    const response: any = await dispatch(fetchShops());
    if (response.payload.status === 'success') {
      const shops: TShop[] = response.payload.data.shops;
      setShops(shops);
    }
  };

  const { name, description } = formik.values;

  return (
    <CommonWrapTemplate toastActions={toastActions}>
      <BaseModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          const response: any = await dispatch(createShop(formik.values));
          setOpen(false);
          if (response.payload.status === 'success') {
            formikFieldInit(formik, setIsErrorDisplay, [SHOPFORM.NAME.ID, SHOPFORM.DESCRIPTION.ID]);
            const { handleToastOpen } = toastActions;
            handleToastOpen({
              message: `お店の${name}を登録しました！`,
            });
            fetchShopsAndSetShops(); // 再取得とstateのセット
          }
        }}
      >
        <dl>
          <dt>{SHOPFORM.NAME.LABEL}：</dt>
          <dd>{name}</dd>
          <dt>{SHOPFORM.DESCRIPTION.LABEL}：</dt>
          <dd>{description}</dd>
        </dl>
      </BaseModal>
      <BasePageTitle className={'my-5'}>{page.shop.register.name()}</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          id={SHOPFORM.NAME.ID}
          label={SHOPFORM.NAME.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={'九州スーパー（50文字まで）'}
          required
          value={name}
          wrapClass="base-vertical-item"
        >
          {isErrorDisplay && formik.errors.name && formik.touched.name && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.name}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <LabelAndTextArea
          id={SHOPFORM.DESCRIPTION.ID}
          label={SHOPFORM.DESCRIPTION.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={'生鮮品が安い、家のすぐ近くにある。（300文字まで）'}
          value={description}
          wrapClass="base-vertical-item"
        />

        <div className="base-vertical-item flex justify-center">
          <BaseButton color={'primary'} type={'submit'} variant={'contained'}>
            登録
          </BaseButton>
        </div>
        <hr className="my-5" />
        <div className="base-vertical-item flex justify-center">
          <BaseLink pathname={page.top.link()}>
            <BaseButton color={'secondary'} variant={'contained'}>
              {page.top.name()}へ戻る
            </BaseButton>
          </BaseLink>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default NewShop;
