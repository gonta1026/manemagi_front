import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/template/CommonWrapTemplate';
import { BasePageTitle } from '../../components/common/uiParts/atoms';
import { ShoppingCardWrapper } from '../../components/common/organisms';
import { LineNotice } from '../../components/pages/common';
import ConfirmModal from '../../components/common/modal/ConfirmModal';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchShoppings, deleteShopping } from '../../reducks/services/Shopping';
import { fetchShops } from '../../reducks/services/Shop';
/* types */
import { TShopping } from '../../types/Shopping';
import { TShop } from '../../types/Shop';
/* utils */
import { formatPriceYen, ommisionText } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
/* const */
import { SHOPPINGFORM } from '../../const/form/shopping';

const Shopping = (): JSX.Element => {
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const [shops, setShops] = useState<TShop[]>([]);
  const [modalShopping, setModalShopping] = useState<TShopping>();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchShoppingsAndSetShops();
    fetchShopsAndSetShops();
  }, []);

  const fetchShoppingsAndSetShops = async () => {
    const response: any = await dispatch(fetchShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      setShopping(shoppings);
    }
  };

  const fetchShopsAndSetShops = async () => {
    const response: any = await dispatch(fetchShops());
    if (response.payload.status === 'success') {
      const shops: TShop[] = response.payload.data.shops;
      setShops(shops);
    }
  };

  const deleteShoppingAndSetShopping = async () => {
    if (modalShopping?.id) {
      const shoppingId = String(modalShopping.id);
      const response: any = await dispatch(deleteShopping(shoppingId));
      if (response.payload.status === 'success') {
        setOpen(false);
        const newShoppings: TShopping[] = shoppings.filter(
          ({ id }) => id !== response.payload.data.id,
        );
        setShopping(newShoppings);
      }
    }
  };

  return (
    <CommonWrapTemplate>
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => deleteShoppingAndSetShopping()}
        modaltitle="削除"
      >
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.PRICE.LABEL}</dt>
          <dd>{modalShopping?.price ? formatPriceYen(modalShopping.price) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.DATE.LABEL}</dt>
          <dd>{modalShopping?.date ? formatDay(modalShopping.date) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.SHOP_ID.LABEL}</dt>
          <dd>
            {modalShopping?.shopId ? shops.find(({ id }) => id === modalShopping.shopId)?.name : ''}
          </dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.DESCRIPTION.LABEL}</dt>
          <dd>{modalShopping?.description ? modalShopping.description : 'なし'}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{SHOPPINGFORM.IS_LINE_NOTICE.LABEL}</dt>
          <dd>{modalShopping?.isLineNotice ? '通知する' : '通知しない'}</dd>
        </dl>
      </ConfirmModal>
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
            onClick={() => {
              setModalShopping(shopping);
              setOpen(true);
            }}
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
