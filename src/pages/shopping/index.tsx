import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { BasePageTitle, LineNotice } from '../../components/common/uiParts';
import { ShoppingCardWrapper, ConfirmDeleteShoppingModal } from '../../components/pages/common';
/* customHook */
import { useToastAction, useShop, useShopping } from '../../customHook';
/* pageMap */
import { page } from '../../pageMap';
/* types */
import { TShopping, initialShopping } from '../../types/Shopping';
import { settingAndUser } from '../../types/Setting';
/* utils */
import { formatPriceYen, ommisionText } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
/* modules */
import { storageKeys } from '../../modules/LocalStorage';
import Notice from '../../modules/Notice';

const Shopping = (): JSX.Element => {
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const [modalShopping, setModalShopping] = useState<TShopping>(initialShopping);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const toastActions = useToastAction();
  const { shops, fetchShopsAndSet } = useShop();
  const { shoppings, fetchShoppingsAndSet, deleteShoppingAndSet } = useShopping();

  useEffect(() => {
    fetchShoppingsAndSet();
    fetchShopsAndSet();
    pageMoveNotice();
  }, []);

  useEffect(() => {
    setIsLineNotice(settingState.user.setting.isUseLine);
  }, [settingState]);

  const pageMoveNotice = () => {
    const notice = new Notice();
    const targetNotice = notice.getStorageItem(storageKeys.pageMoveNotice)!;
    const message = notice.getNoticeMessage(targetNotice);
    notice.afterPageMoveNotice(() =>
      toastActions.handleToastOpen({
        message,
      }),
    );
  };

  return (
    <CommonWrapTemplate {...{ toastActions }}>
      <ConfirmDeleteShoppingModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleOk={async () => {
          await deleteShoppingAndSet(modalShopping, isLineNotice, toastActions);
          setDeleteModalOpen(false);
        }}
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
                <LineNotice
                  isLineNotice={shopping.isLineNoticed}
                  text={shopping.isLineNoticed ? '買い物通知済' : '買い物未通知'}
                />
              </div>
            </div>
          </ShoppingCardWrapper>
        ))}
      </div>
    </CommonWrapTemplate>
  );
};

export default Shopping;
