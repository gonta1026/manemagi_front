import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle, BaseButton } from '../../components/common/uiParts/atoms';
import BaseModal from '../../components/common/modal/BaseModal';
/* const */
import { SHOPPINGFORM } from '../../const/form/shopping';
/* customHook */
import useToastAction from '../../customHook/useToastAction';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchNoClaimShoppings, createClaim } from '../../reducks/services/Claim';
/* types */
import { TShopping } from '../../types/Shopping';
import { formatDay } from '../../utils/FormatDate';
/* utils */
import LocalStorage from '../../utils/LocalStorage';

const ClaimNew = (): JSX.Element => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [shoppings, setShoppings] = useState<TShopping[]>([]);
  const [cheackShoppings, setCheackShoppings] = useState<TShopping[]>([]);
  const dispatch = useDispatch();
  const toastActions = useToastAction();

  useEffect(() => {
    fetchShoppingsAndSetShops();
  }, []);

  const fetchShoppingsAndSetShops = async () => {
    const response: any = await dispatch(fetchNoClaimShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      setShoppings(shoppings);
    }
  };

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
      <BaseModal
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
      >
        請求予定金額：{totalClaimPrice}
        <ul className={'space-y-2'}>
          {cheackShoppings.map((shopping, index) => (
            <li key={index}>
              <dl>
                <dt>{SHOPPINGFORM.PRICE.LABEL}：</dt>
                <dd>{shopping.price}</dd>
              </dl>
              <dl>
                <dt>{SHOPPINGFORM.DATE.LABEL}：</dt>
                <dd>{shopping.date}</dd>
              </dl>
              <dl>
                <dt>{SHOPPINGFORM.DESCRIPTION.LABEL}：</dt>
                <dd>{shopping.description}</dd>
              </dl>
              <dl>
                <dt>{SHOPPINGFORM.IS_LINE_NOTICE.LABEL}：</dt>
                <dd>{shopping.isLineNotice ? '通知済み' : '未通知'}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </BaseModal>
      <BasePageTitle className={'my-5'}>{page.claim.register.name()}</BasePageTitle>
      <p>一旦一覧画面を作成、これからどのようにカスタマイズするか等を検討。</p>
      <p>ソート機能、絞り込み機能、ページネーション、表示件数の制御をできたら入れたい。</p>
      <BaseButton
        className={'mt-5'}
        color={'primary'}
        disabled={cheackShoppings.length === 0}
        onClick={() => setOpen(true)}
        variant={'contained'}
      >
        請求確認
      </BaseButton>
      請求予定金額：{totalClaimPrice}
      <ul className="py-4">
        {shoppings.map((shopping, index) => (
          <li key={index} className={'border-t-2 p-3'}>
            <input type="checkbox" name="" id="" onChange={() => handleChecks(shopping)} />
            <div>買い物日：{formatDay(shopping.date!)}</div>
            <div>金額：{shopping.price}</div>
            <div>LINE通知：{shopping.isLineNotice ? '通知済' : '未通知'}</div>
            <div>説明：{shopping.description}</div>
          </li>
        ))}
      </ul>
    </CommonWrapTemplate>
  );
};

export default ClaimNew;
