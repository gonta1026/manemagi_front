import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import {
  BasePageTitle,
  BaseButton,
  BaseCheckBox,
  ConfirmModal,
  IsUseLineHelper,
} from '../../components/common/uiParts';
import { LabelAndSwitch, LabelAndCheckBox } from '../../components/common/uiParts';
/* const */
import { SHOPPING_FORM } from '../../const/form/shopping';
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
import { formatPriceYen, ommisionText, totalSumPrice } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
import { noticeStorageValues } from '../../modules/Notice';
import Notice from '../../modules/Notice';

const ClaimNew = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [checkShoppings, setCheckShoppings] = useState<TShopping[]>([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const toastActions = useToastAction();

  useEffect(() => {
    fetchShoppingsAndSetShops();
  }, []);

  useEffect(() => {
    formik.setFieldValue(SHOPPING_FORM.IS_LINE_NOTICE.ID, settingState.user?.setting.isUseLine);
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
    const exitShopping = checkShoppings.find(
      (cheack) => JSON.stringify(cheack) === JSON.stringify(shopping),
    );
    if (exitShopping) {
      const newChecks = checkShoppings.filter(
        (cheack) => JSON.stringify(cheack) !== JSON.stringify(shopping),
      );
      setCheckShoppings(newChecks);
    } else {
      setCheckShoppings([...checkShoppings, shopping]);
    }
  };

  const isAllChecked = () => checkShoppings.length === formik.values.shoppings.length;

  const handleAllCheck = () => {
    if (isAllChecked()) {
      setCheckShoppings([]);
    } else {
      setCheckShoppings(formik.values.shoppings);
    }
  };

  return (
    <CommonWrapTemplate {...{ isLoading, toastActions }}>
      <ConfirmModal
        focus
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={async () => {
          setIsLoading(true);
          const shoppingIds = checkShoppings.map((shopping) => shopping.id!);
          const response: any = await dispatch(
            createClaim({ shoppingIds: shoppingIds, isLineNotice: true }),
          );
          if (response.payload.status === 'success') {
            Notice.setItemAtPageMoveNotice(noticeStorageValues.claimedNotice);
            router.push(page.claim.list.link());
          } else {
            const { handleToastOpen } = toastActions;
            handleToastOpen({
              message: `買い物の更新に失敗しました。`,
              severity: 'error',
            });
            setIsLoading(false);
            setOpen(false);
          }
        }}
        modaltitle={'請求'}
      >
        <ul className={'space-y-2'}>
          {checkShoppings.map((shopping, index) => (
            <li key={index}>
              <h3 className={'font-bold mt-4 text-center'}>{index + 1}件目</h3>
              <dl className={'list'}>
                <dt>{SHOPPING_FORM.PRICE.LABEL}</dt>
                <dd>{formatPriceYen ? formatPriceYen(shopping.price) : ''}</dd>
              </dl>
              <dl className={'list'}>
                <dt>{SHOPPING_FORM.DATE.LABEL}</dt>
                <dd>{formatDay(shopping.date!)}</dd>
              </dl>
              <dl className={'list'}>
                <dt>{SHOPPING_FORM.DESCRIPTION.LABEL}</dt>
                <dd>{shopping.description}</dd>
              </dl>
              <dl className={'list'}>
                <dt>{SHOPPING_FORM.IS_LINE_NOTICE.LABEL}</dt>
                <dd>{shopping.isLineNotice ? '通知済み' : '未通知'}</dd>
              </dl>
            </li>
          ))}
        </ul>
        <p className={'text-right mt-2'}>
          合計金額：
          {formatPriceYen ? formatPriceYen(totalSumPrice(checkShoppings, 'price')) : ''}
        </p>
      </ConfirmModal>
      <BasePageTitle className={'my-5'}>{page.claim.register.name()}</BasePageTitle>
      <div className="mt-5">
        請求予定金額：
        {formatPriceYen ? formatPriceYen(totalSumPrice(checkShoppings, 'price')) : ''}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap items-center">
          <LabelAndCheckBox
            control={<BaseCheckBox checked={isAllChecked()} onChange={handleAllCheck} />}
            label="まとめてチェック"
          />
          {/* LINE通知(isLineNotice) */}
          <LabelAndSwitch
            className={'base-vertical-item'}
            checked={formik.values.isLineNotice}
            disabled={!settingState.user?.setting.isUseLine}
            helperText={!settingState.user?.setting.isUseLine && <IsUseLineHelper />}
            onChange={() =>
              formik.setFieldValue(SHOPPING_FORM.IS_LINE_NOTICE.ID, !formik.values.isLineNotice)
            }
            id={CLAIM_FORM.IS_LINE_NOTICE.ID}
            label={`${CLAIM_FORM.IS_LINE_NOTICE.LABEL}${formik.values.isLineNotice ? 'ON' : 'OFF'}`}
          />
        </div>

        <div className="flex justify-center mt-3">
          <BaseButton
            type={'submit'}
            disabled={checkShoppings.length === 0}
            onClick={() => setOpen(true)}
          >
            請求確認
          </BaseButton>
        </div>
        <ul className="py-4">
          {formik.values.shoppings.map((shopping, index) => (
            <li key={index} className={'border-t-2 p-3'}>
              <label className="flex items-center" htmlFor={`check-${index}`}>
                <div>
                  <BaseCheckBox
                    checked={checkShoppings.some(
                      (cheackShopping) => cheackShopping.id === shopping.id,
                    )}
                    onChange={() => handleChecks(shopping)}
                    id={`check-${index}`}
                  />
                </div>
                <div>
                  <div>買い物日：{formatDay(shopping.date!)}</div>
                  <div>金額：{formatPriceYen(shopping.price)})</div>
                  <div>LINE通知：{shopping.isLineNotice ? '通知済' : '未通知'}</div>
                  <div>
                    説明：{shopping.description ? ommisionText(shopping.description, 20) : 'なし'}
                  </div>
                </div>
              </label>
            </li>
          ))}
        </ul>
      </form>
    </CommonWrapTemplate>
  );
};

export default ClaimNew;
