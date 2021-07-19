import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { createShop, fetchShops } from '../../reducks/services/Shop';
import { useDispatch } from 'react-redux';
import { SHOPFORM } from '../../const/form/shop';
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { LabelAndTextField, LabelAndTextArea } from '../../components/common/molecules';
import BaseModal from '../../components/common/modal/BaseModal';
import {
  BasePageTitle,
  BaseButton,
  BaseErrorMessagesWrapper,
} from '../../components/common/uiParts/atoms';
import { shopNewValidate } from '../../validate/shop/new';
import { TShop, TShopForm } from '../../types/Shop';
import useToastAction from '../../customHook/useToastAction';
import LocalStorage from '../../utils/LocalStorage';

const NewShop = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [shopNames, setShopNames] = useState<string[]>([]);
  const [isErrorDisplay, setIsErrorDisplay] = useState<boolean>(true);
  const toastActions = useToastAction();
  const dispatch = useDispatch();
  const validate = (values: TShopForm) => {
    let errors = {} as TShopForm;
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
        setIsErrorDisplay(true);
      }, 10);
    });
  };

  useEffect(() => {
    const loginedNotice = 'loginedNotice'; // TODO 共通の場所におく？
    const storage = new LocalStorage();
    const successLoginMessage = storage.getItem(loginedNotice);
    if (successLoginMessage) {
      storage.loginedNotice(loginedNotice, () =>
        toastActions.handleToastOpen({
          message: successLoginMessage,
        }),
      );
    }
    (async () => {
      const response: any = await dispatch(fetchShops());
      const shops: TShop[] = response.payload.data.shops;
      const shopNames = [] as string[];
      shops.forEach((shop) => {
        shopNames.push(shop.name);
      });
      setShopNames(shopNames);
    })();
  }, []);
  const { name, description } = formik.values;

  return (
    <CommonWrapTemplate toastActions={toastActions}>
      <BaseModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          const response: any = await dispatch(
            createShop({
              name,
              description,
            }),
          );
          setOpen(false);
          if (response.payload.status === 'SUCCESS') {
            formikFieldInit(formik, setIsErrorDisplay, [SHOPFORM.NAME.ID, SHOPFORM.DESCRIPTION.ID]);
            const { handleToastOpen } = toastActions;
            handleToastOpen({
              message: `お店の${name}を登録しました！`,
            });
          }
        }}
      >
        <h4 className={'font-bold text-center'}>入力確認</h4>
        <dl>
          <dt>
            {SHOPFORM.NAME.LABEL}：{name}
          </dt>
          <dd>
            {SHOPFORM.DESCRIPTION.LABEL}：{description}
          </dd>
        </dl>
      </BaseModal>
      <BasePageTitle className={'my-5'}>お店登録</BasePageTitle>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        <LabelAndTextField
          wrapClass="base-vertical-item"
          id={SHOPFORM.NAME.ID}
          label={SHOPFORM.NAME.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={name}
        >
          {isErrorDisplay && formik.errors.name && formik.touched.name && (
            <BaseErrorMessagesWrapper>
              <li>{formik.errors.name}</li>
            </BaseErrorMessagesWrapper>
          )}
        </LabelAndTextField>

        <LabelAndTextArea
          wrapClass="base-vertical-item"
          id={SHOPFORM.DESCRIPTION.ID}
          label={SHOPFORM.DESCRIPTION.LABEL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={description}
        />

        <div className="base-vertical-item flex justify-center">
          <BaseButton color={'primary'} type={'submit'} variant={'contained'}>
            登録
          </BaseButton>
        </div>
        <hr className="my-5" />
        <div className="base-vertical-item flex justify-center">
          <BaseButton
            color={'secondary'}
            onClick={() => {
              formik.setFieldTouched(SHOPFORM.NAME.ID, false);
              router.push('/');
            }} // 本来はショップ一覧画面へ遷移
            type={'button'}
            variant={'contained'}
          >
            ショップ一覧画面
          </BaseButton>
        </div>
      </form>
    </CommonWrapTemplate>
  );
};

export default NewShop;
