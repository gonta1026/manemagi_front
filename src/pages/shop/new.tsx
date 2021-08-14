import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
/* const */
import { SHOP_FORM } from '../../const/form/shop';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { useShop } from '../../customHook';
import {
  LabelAndTextField,
  LabelAndTextArea,
  ExecutionAndBackButtons,
} from '../../components/common/molecules';
import {
  BasePageTitle,
  BaseErrorMessagesWrapper,
  ConfirmModal,
} from '../../components/common/uiParts';
/* page */
import { page } from '../../pageMap';
/* reducks */
import { createShop } from '../../reducks/services/Shop';
/* types */
import { TShopForm, TShopFormError } from '../../types/Shop';
/* utils */
import { isEmpty } from '../../utils/function';
import { noticeStorageValues } from '../../modules/LocalStorage';
import Notice from '../../modules/Notice';
/* validate */
import { shopNewValidate } from '../../validate/shop/new';

const NewShop = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { shops, fetchShopsAndSet } = useShop();

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
    onSubmit: () => {
      setOpen(true);
    },
  });

  useEffect(() => {
    fetchShopsAndSet();
  }, []);

  const handleCreateShop = async () => {
    const response: any = await dispatch(createShop(formik.values));
    setOpen(false);
    if (response.payload.status === 'success') {
      const storage = new LocalStorage();
      storage.setItemAtPageMoveNotice('createdShopNotice');
      router.push(page.top.link());
    }
  };

  const { name, description } = formik.values;

  return (
    <CommonWrapTemplate>
      <ConfirmModal
        focus
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={handleCreateShop}
      >
        <dl className={'list'}>
          <dt>{SHOP_FORM.NAME.LABEL}</dt>
          <dd>{name}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOP_FORM.DESCRIPTION.LABEL}</dt>
          <dd>{description}</dd>
        </dl>
      </ConfirmModal>
      <BasePageTitle className={'my-5'}>{page.shop.register.name()}</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          id={SHOP_FORM.NAME.ID}
          label={SHOP_FORM.NAME.LABEL}
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
          id={SHOP_FORM.DESCRIPTION.ID}
          label={SHOP_FORM.DESCRIPTION.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={'生鮮品が安い、家のすぐ近くにある。（300文字まで）'}
          value={description}
          wrapClass="base-vertical-item"
        >
          {formik.errors.description && formik.touched.description && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.description}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextArea>

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
