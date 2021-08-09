import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
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
import { LABEL_SHOPPING } from '../../const/form/shopping';
/* customHook */
import useToastAction from '../../customHook/useToastAction';

const Shopping = (): JSX.Element => {
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const [shops, setShops] = useState<TShop[]>([]);
  const [modalShopping, setModalShopping] = useState<TShopping>();
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const toastActions = useToastAction();

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
      const { handleToastOpen } = toastActions;
      if (response.payload.status === 'success') {
        fetchShoppingsAndSetShops();
        setOpen(false);

        handleToastOpen({
          message: `買い物を削除しました。`,
          severity: 'success',
        });
      } else {
        handleToastOpen({
          message: `削除に失敗しました。`,
          severity: 'error',
        });
      }
    }
  };

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <ConfirmModal
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={() => deleteShoppingAndSetShopping()}
        modaltitle="削除"
      >
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.PRICE}</dt>
          <dd>{modalShopping?.price ? formatPriceYen(modalShopping.price) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.DATE}</dt>
          <dd>{modalShopping?.date ? formatDay(modalShopping.date) : ''}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.SHOP_ID}</dt>
          <dd>
            {modalShopping?.shopId ? shops.find(({ id }) => id === modalShopping.shopId)?.name : ''}
          </dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.DESCRIPTION}</dt>
          <dd>{modalShopping?.description ? modalShopping.description : 'なし'}</dd>
        </dl>
        <dl className={'list'}>
          <dt>{LABEL_SHOPPING.IS_LINE_NOTICE}</dt>
          <dd>{modalShopping?.isLineNotice ? '通知する' : '通知しない'}</dd>
        </dl>
      </ConfirmModal>
      <BasePageTitle className={'my-5'}>{page.shopping.list.name()}</BasePageTitle>
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
