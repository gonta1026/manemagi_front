import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../../components/common/layout/CommonWrapTemplate';
import { BasePageTitle } from '../../../components/common/uiParts';
import { ExecutionAndBackButtons } from '../../../components/common/molecules';
/* customHook */
import useToastAction from '../../../customHook/useToastAction';
/* pageMap */
import { page } from '../../../pageMap';
/* reducks */
import { fetchShops } from '../../../reducks/services/Shop';
import { fetchShopping } from '../../../reducks/services/Shopping';
/* types */
import { TShopping } from '../../../types/Shopping';
import { TShop } from '../../../types/Shop';
/* utils */
import LocalStorage, { noticeStorageValues, storageKeys } from '../../../modules/LocalStorage';
import { formatPriceYen, ommisionText } from '../../../utils/function';
import { formatDay } from '../../../utils/FormatDate';

const ShoppingShow = (): JSX.Element => {
  const [shopping, setShopping] = useState<TShopping>({
    id: null,
    price: null,
    date: null,
    description: '',
    isLineNotice: false,
    shopId: null,
    claimId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
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
    const targetNotice = storage.getStorageItem(storageKeys.pageMoveNotice)!;
    const { shoppingUpdatedNotice } = noticeStorageValues;
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
      <ul className="py-4">
        <li className={'p-3'}>
          <div>金額：{formatPriceYen ? formatPriceYen(shopping.price) : ''}</div>
          <div>日付：{formatDay(shopping.date!)}</div>
          <div>お店：{shops.find((shop) => shop.id === shopping.shopId)?.name}</div>
          <div>説明：{shopping.description ? ommisionText(shopping.description, 20) : 'なし'}</div>
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
