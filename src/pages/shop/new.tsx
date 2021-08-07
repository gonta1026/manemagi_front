import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
/* const */
import { SHOPFORM } from '../../const/form/shop';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import {
  LabelAndTextField,
  LabelAndTextArea,
  ExecutionAndBackButtons,
} from '../../components/common/molecules';
import ConfirmModal from '../../components/common/modal/ConfirmModal';
import { BasePageTitle, BaseErrorMessagesWrapper } from '../../components/common/uiParts/atoms';
/* page */
import { page } from '../../pageMap';
/* reducks */
import { createShop, fetchShops } from '../../reducks/services/Shop';
/* types */
import { TShop, TShopForm, TShopFormError } from '../../types/Shop';
/* utils */
import LocalStorage from '../../utils/LocalStorage';
import { isEmpty } from '../../utils/function';

/* validate */
import { shopNewValidate } from '../../validate/shop/new';

const NewShop = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [shops, setShops] = useState<TShop[]>([]);
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
      setOpen(true);
    },
  });

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
    <CommonWrapTemplate>
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          const response: any = await dispatch(createShop(formik.values));
          setOpen(false);
          if (response.payload.status === 'success') {
            const storage = new LocalStorage();
            storage.setItemAtPageMoveNotice('createdShopNotice');
            router.push(page.top.link());
          }
        }}
      >
        <dl className={'list'}>
          <dt>{SHOPFORM.NAME.LABEL}</dt>
          <dd>{name}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPFORM.DESCRIPTION.LABEL}</dt>
          <dd>{description}</dd>
        </dl>
      </ConfirmModal>
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
          {formik.errors.name && formik.touched.name && (
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

        <ExecutionAndBackButtons
          backPathname={page.top.link()}
          backName={`${page.top.name()}へ戻る`}
          className={'base-vertical-item'}
          nextName={'確認'}
          disabledExecution={!isEmpty(formik.errors)}
        />
      </form>
    </CommonWrapTemplate>
  );
};

export default NewShop;
