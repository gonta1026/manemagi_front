import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle } from '../../components/common/uiParts/atoms';
import { ShoppingCardWrapper } from '../../components/common/organisms';
import { LineNotice } from '../../components/pages/common';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchShoppings } from '../../reducks/services/Shopping';
/* types */
import { TShopping } from '../../types/Shopping';
/* utils */
import { formatPriceYen, ommisionText } from '../../utils/function';
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
      <div className="space-y-3">
        {shoppings.map((shopping, index) => (
          <ShoppingCardWrapper
            key={index}
            className={'border-t-2 p-3 relative'}
            detailPathName={page.shopping.show.link(shopping.id!.toString())}
            editPathName={page.shopping.edit.link(shopping.id!.toString())}
            isEditShow={shopping.claimId === null}
            isDeleteShow={shopping.claimId === null}
            onClick={() => console.log('click!')}
          >
            <div className="flex justify-between">
              <div className="left">
                <div>買い物日：{formatDay(shopping.date!)}</div>
                <div>金額：{formatPriceYen(shopping.price)}</div>
                <div>説明：{ommisionText(shopping.description, 20)}</div>
              </div>
              <div className="right">
                <LineNotice isLineNotice={shopping.isLineNotice} />
              </div>
            </div>
          </ShoppingCardWrapper>
        ))}
      </div>
    </CommonWrapTemplate>
  );
};

export default Shopping;
