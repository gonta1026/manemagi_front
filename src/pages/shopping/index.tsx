import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';

import { BasePageTitle, LineNotice } from '../../components/common/uiParts';
import { ShoppingCardWrapper, ConfirmDeleteShoppingModal } from '../../components/pages/common';
/* pageMap */
import { page } from '../../pageMap';
/* reducks */
import { fetchShoppings, deleteShopping } from '../../reducks/services/Shopping';
import { fetchShops } from '../../reducks/services/Shop';
/* types */
import { TShopping } from '../../types/Shopping';
import { TShop } from '../../types/Shop';
import { settingAndUser } from '../../types/Setting';
/* utils */
import { formatPriceYen, ommisionText } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
/* customHook */
import useToastAction from '../../customHook/useToastAction';

const Shopping = (): JSX.Element => {
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const [shoppings, setShopping] = useState<TShopping[]>([]);
  const [shops, setShops] = useState<TShop[]>([]);
  const [modalShopping, setModalShopping] = useState<TShopping>();
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const toastActions = useToastAction();

  useEffect(() => {
    fetchShoppingsAndSet();
    fetchShopsAndSet();
  }, []);

  useEffect(() => {
    setIsLineNotice(settingState.user.setting.isUseLine);
  }, [settingState]);

  const fetchShoppingsAndSet = async () => {
    const response: any = await dispatch(fetchShoppings());
    if (response.payload.status === 'success') {
      const shoppings: TShopping[] = response.payload.data;
      setShopping(shoppings);
    }
  };

  const fetchShopsAndSet = async () => {
    const response: any = await dispatch(fetchShops());
    if (response.payload.status === 'success') {
      const shops: TShop[] = response.payload.data.shops;
      setShops(shops);
    }
  };

  const deleteShoppingAndSet = async () => {
    if (modalShopping?.id) {
      const shoppingId = String(modalShopping.id);
      const response: any = await dispatch(
        deleteShopping({
          id: shoppingId,
          data: { isLineNotice: isLineNotice },
        }),
      );

      const { handleToastOpen } = toastActions;
      if (response.payload.status === 'success') {
        fetchShoppingsAndSet();
        setDeleteModalOpen(false);

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
      <ConfirmDeleteShoppingModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleOk={() => deleteShoppingAndSet()}
        isLineNotice={isLineNotice}
        modalShopping={modalShopping}
        modaltitle={'削除'}
        onChangeLineNotice={() => setIsLineNotice(!isLineNotice)}
        shops={shops}
        isUseLineAtSetting={settingState.user.setting.isUseLine}
      />

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
              setDeleteModalOpen(true);
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
