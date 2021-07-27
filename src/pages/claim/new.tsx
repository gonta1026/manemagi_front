import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle, BaseButton } from '../../components/common/uiParts/atoms';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchNoClaimShoppings } from '../../reducks/services/Claim';
/* types */
import { TShopping } from '../../types/Shopping';
import { formatDay } from '../../utils/FormatDate';

const ClaimNew = (): JSX.Element => {
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const [cheacks, setCheacks] = useState<number[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchShoppingsAndSetShops();
  }, []);

  const fetchShoppingsAndSetShops = async () => {
    const response: any = await dispatch(fetchNoClaimShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      setShopping(shoppings);
    }
  };

  const handleChecks = (shoppingId: number) => {
    if (cheacks.includes(shoppingId)) {
      const newChecks = cheacks.filter((cheack) => shoppingId !== cheack);
      setCheacks(newChecks);
    } else {
      setCheacks([...cheacks, shoppingId]);
    }
  };

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>{page.claim.register.name()}</BasePageTitle>
      <p>一旦一覧画面を作成、これからどのようにカスタマイズするか等を検討。</p>
      <p>ソート機能、絞り込み機能、ページネーション、表示件数の制御をできたら入れたい。</p>
      <BaseButton className={'mt-5'} color={'primary'} variant={'contained'}>
        請求
      </BaseButton>
      <ul className="py-4">
        {shoppings.map((shopping, index) => (
          <li key={index} className={'border-t-2 p-3'}>
            <input type="checkbox" name="" id="" onChange={() => handleChecks(shopping.id!)} />
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
