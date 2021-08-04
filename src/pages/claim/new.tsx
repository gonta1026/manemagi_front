import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle, BaseButton } from '../../components/common/uiParts/atoms';
import { LabelAndSwitch } from '../../components/common/molecules/';
import ConfirmModal from '../../components/common/modal/ConfirmModal';
import { IsUseLineHelper } from '../../components/pages/common';
/* const */
import { SHOPPINGFORM } from '../../const/form/shopping';
import { CLAIM_FORM } from '../../const/form/claim';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchNoClaimShoppings, createClaim } from '../../reducks/services/Claim';
/* types */
import { TShopping } from '../../types/Shopping';
import { TClaimFormikForm } from '../../types/Claim';
import { settingAndUser } from '../../types/Setting';
/* utils */
import { formatDay } from '../../utils/FormatDate';
import { formatPriceYen, ommisionText, totalSumPrice } from '../../utils/function';
import LocalStorage from '../../utils/LocalStorage';

const ClaimNew = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [cheackShoppings, setCheackShoppings] = useState<TShopping[]>([]);
  const dispatch = useDispatch();
  const toastActions = useToastAction();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  useEffect(() => {
    fetchShoppingsAndSetShops();
  }, []);

  useEffect(() => {
    formik.setFieldValue(SHOPPINGFORM.IS_LINE_NOTICE.ID, settingState.user.setting.isUseLine);
  }, [settingState]);

  const fetchShoppingsAndSetShops = async () => {
    const response: any = await dispatch(fetchNoClaimShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      formik.setFieldValue('shoppings', shoppings);
    }
  };

  const formik = useFormik<TClaimFormikForm>({
    initialValues: {
      isLineNotice: false,
      shoppings: [],
    },
    onSubmit: () => setOpen(true),
  });

  const handleChecks = (shopping: TShopping) => {
    // NOTE JSON.stringifyでオブジェクトの比較をしている。
    const exitShopping = cheackShoppings.find(
      (cheack) => JSON.stringify(cheack) === JSON.stringify(shopping),
    );
    if (exitShopping) {
      const newChecks = cheackShoppings.filter(
        (cheack) => JSON.stringify(cheack) !== JSON.stringify(shopping),
      );
      setCheackShoppings(newChecks);
    } else {
      setCheackShoppings([...cheackShoppings, shopping]);
    }
  };

  const totalClaimPrice = (() => {
    return cheackShoppings.reduce((accumulator, shopping) => {
      return shopping.price! + accumulator;
    }, 0);
  })();

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          const shoppingIds = cheackShoppings.map((shopping) => shopping.id!);
          const response: any = await dispatch(
            createClaim({ shoppingIds: shoppingIds, isLineNotice: true }),
          );
          if (response.payload.status === 'success') {
            const storage = new LocalStorage();
            storage.setItemAtPageMoveNotice(LocalStorage.noticeKey.claimedNotice);
            router.push(page.top.link());
          } else {
            const { handleToastOpen } = toastActions;
            handleToastOpen({
              message: `買い物の更新に失敗しました。`,
              severity: 'error',
            });
          }
        }}
        modaltitle={'請求'}
      >
        <ul className={'space-y-2'}>
          {cheackShoppings.map((shopping, index) => (
            <li key={index}>
              <h3 className={'font-bold mt-4 text-center'}>{index + 1}件目</h3>
              <dl className={'list'}>
                <dt>{SHOPPINGFORM.PRICE.LABEL}</dt>
                <dd>{formatPriceYen ? formatPriceYen(shopping.price) : ''}</dd>
              </dl>
              <dl className={'list'}>
                <dt>{SHOPPINGFORM.DATE.LABEL}</dt>
                <dd>{shopping.date}</dd>
              </dl>
              <dl className={'list'}>
                <dt>{SHOPPINGFORM.DESCRIPTION.LABEL}</dt>
                <dd>{shopping.description}</dd>
              </dl>
              <dl className={'list'}>
                <dt>{SHOPPINGFORM.IS_LINE_NOTICE.LABEL}</dt>
                <dd>{shopping.isLineNotice ? '通知済み' : '未通知'}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <p className={'text-right mt-2'}>
          合計金額：
          {formatPriceYen ? formatPriceYen(totalSumPrice(cheackShoppings, 'totalPrice')) : ''}
        </p>
      </ConfirmModal>
      <BasePageTitle className={'my-5'}>{page.claim.register.name()}</BasePageTitle>
      <p>一旦一覧画面を作成、これからどのようにカスタマイズするか等を検討。</p>
      <p>ソート機能、絞り込み機能、ページネーション、表示件数の制御をできたら入れたい。</p>
      <div className="mt-5">
        請求予定金額：
        {formatPriceYen ? formatPriceYen(totalSumPrice(cheackShoppings, 'totalPrice')) : ''}
      </div>
      <BaseButton
        className={'mt-5'}
        type={'submit'}
        disabled={cheackShoppings.length === 0}
        onClick={() => setOpen(true)}
      >
        請求確認
      </BaseButton>
      <form className="base-vertical-20" onSubmit={formik.handleSubmit}>
        {/* LINE通知(isLineNotice) */}
        <LabelAndSwitch
          className={'base-vertical-item'}
          checked={formik.values.isLineNotice}
          disabled={!settingState.user.setting.isUseLine}
          helperText={!settingState.user.setting.isUseLine && <IsUseLineHelper />}
          onChange={() =>
            formik.setFieldValue(SHOPPINGFORM.IS_LINE_NOTICE.ID, !formik.values.isLineNotice)
          }
          id={CLAIM_FORM.IS_LINE_NOTICE.ID}
          label={`${CLAIM_FORM.IS_LINE_NOTICE.LABEL}${formik.values.isLineNotice ? 'ON' : 'OFF'}`}
        />
        <ul className="py-4">
          {formik.values.shoppings.map((shopping, index) => (
            <li key={index} className={'border-t-2 p-3'}>
              <input type="checkbox" name="" id="" onChange={() => handleChecks(shopping)} />
              <div>買い物日：{formatDay(shopping.date!)}</div>
              <div>金額：{formatPriceYen(shopping.price)})</div>
              <div>LINE通知：{shopping.isLineNotice ? '通知済' : '未通知'}</div>
              <div>
                説明：{shopping.description ? ommisionText(shopping.description, 20) : 'なし'}
              </div>
            </li>
          ))}
        </ul>
      </form>
    </CommonWrapTemplate>
  );
};

export default ClaimNew;
