import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../../components/common/template/CommonWrapTemplate';
import { BasePageTitle } from '../../../components/common/uiParts/atoms';
import { ExecutionAndBackButtons } from '../../../components/common/molecules';
/* customHook */
import useToastAction from '../../../customHook/useToastAction';
/* pageMap */
import { page } from '../../../pageMap';
/* reducks */
import { fetchShops } from '../../../reducks/services/Shop';
import { fetchShopping } from '../../../reducks/services/Shopping';
/* types */
import { TShopping, shoppingInit } from '../../../types/Shopping';
import { TShop } from '../../../types/Shop';
/* utils */
import LocalStorage from '../../../utils/LocalStorage';
import { formatPriceYen } from '../../../utils/function';

const ShoppingShow = (): JSX.Element => {
  const [shopping, setShopping] = useState<TShopping>(shoppingInit);
  const [shops, setShops] = useState<TShop[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const toastActions = useToastAction();

  useEffect(() => {
    shoppingedUpdateNotice();
    fetchShopsAndSetShops();
  }, []);

  useEffect(() => {
    fetchShoppingAndSetShopping();
  }, [router]);

  const fetchShoppingAndSetShopping = async () => {
    if (router.query.Id) {
      const response: any = await dispatch(fetchShopping(router.query.Id as string));
      if (response.payload.status === 'success') {
        const shopping: TShopping = response.payload.data;
        setShopping(shopping);
      }
    }
  };

  const fetchShopsAndSetShops = async () => {
    const response: any = await dispatch(fetchShops());
    const shops: TShop[] = response.payload.data.shops;
    setShops(shops);
  };

  const shoppingedUpdateNotice = () => {
    const storage = new LocalStorage();
    const targetNotice = storage.getItem('pageMoveNotice')!;
    const { shoppingUpdatedNotice } = LocalStorage.noticeKey;
    let message = '';
    switch (targetNotice) {
      case shoppingUpdatedNotice:
        message = '買い物の更新をしました！';
        break;
    }
    storage.afterPageMoveNotice(() =>
      toastActions.handleToastOpen({
        message,
      }),
    );
  };

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <BasePageTitle className={'my-5'}>{page.shopping.show.name()}</BasePageTitle>
      <p>一旦一覧画面を作成、これからどのようにカスタマイズするか等を検討している。</p>
      <ul className="py-4">
        <li className={'p-3'}>
          <div>金額：{formatPriceYen(shopping.price)}</div>
          <div>日付：{shopping.date}</div>
          <div>お店：{shops.find((shop) => shop.id === shopping.shopId)?.name}</div>
          <div>説明：{shopping.description}</div>
          <div>ライン通知：{shopping.isLineNotice ? '通知済み' : '未通知'}</div>
        </li>
      </ul>
      <ExecutionAndBackButtons
        backPathname={page.shopping.list.link()}
        backName={`${page.shopping.list.name()}へ戻る`}
        nextPathname={page.shopping.edit.link(router.query.Id as string)}
        nextName={'編集'}
        nextCustomType={'edit'}
      />
    </CommonWrapTemplate>
  );
};

export default ShoppingShow;
