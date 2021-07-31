import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle, BaseLink, BaseButton } from '../../components/common/uiParts/atoms';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchShoppings } from '../../reducks/services/Shopping';
/* types */
import { TShopping } from '../../types/Shopping';
/* utils */
import { formatPriceYen } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';

const Shopping = (): JSX.Element => {
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchShoppingsAndSetShops();
  }, []);

  const fetchShoppingsAndSetShops = async () => {
    const response: any = await dispatch(fetchShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      setShopping(shoppings);
    }
  };

  return (
    <CommonWrapTemplate>
      <BasePageTitle className={'my-5'}>{page.shopping.list.name()}</BasePageTitle>
      <p>一旦一覧画面を作成、これからどのようにカスタマイズするか等を検討。</p>
      <p>ソート機能、絞り込み機能、ページネーション、表示件数の制御をできたら入れたい。</p>
      <ul className="py-4">
        {shoppings.map((shopping, index) => (
          <li key={index} className={'border-t-2 p-3'}>
            <div>買い物日：{formatDay(shopping.date!)}</div>
            <div>金額：{formatPriceYen(shopping.price)}</div>
            <div>LINE通知：{shopping.isLineNotice ? '通知済' : '未通知'}</div>
            <div>請求：{shopping.claimId ? '請求済' : '未請求'}</div>
            <div>説明：{shopping.description}</div>
            <div className={'mt-2 text-center'}>
              <BaseLink pathname={page.shopping.show.link(shopping.id!.toString())}>
                <BaseButton color={'primary'} variant={'contained'}>
                  詳細
                </BaseButton>
              </BaseLink>
              <BaseLink pathname={page.shopping.edit.link(shopping.id!.toString())}>
                <BaseButton className={'ml-5'} color={'primary'} variant={'contained'}>
                  編集
                </BaseButton>
              </BaseLink>
            </div>
          </li>
        ))}
      </ul>
    </CommonWrapTemplate>
  );
};

export default Shopping;
