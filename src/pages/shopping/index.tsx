import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
/* components */
import CommonWrapTemplate from '../../components/common/layout/CommonWrapTemplate';
import { BasePageTitle, LineNotice, BaseLinkButton } from '../../components/common/uiParts';
import { ShoppingCardWrapper, ConfirmDeleteShoppingModal } from '../../components/pages/common';
/* customHook */
import { useToastAction, useShop, useShopping } from '../../customHook';
/* pageMap */
import { page } from '../../pageMap';
/* types */
import { TShoppingNullable, initialShopping } from '../../model/shopping';
import { settingAndUser } from '../../model/setting';
/* utils */
import { formatPriceYen, ommisionText } from '../../utils/function';
import { formatDay } from '../../utils/FormatDate';
/* modules */
import Notice from '../../modules/Notice';

const Shopping = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLineNotice, setIsLineNotice] = useState<boolean>(false);
  const [modalShopping, setModalShopping] = useState<TShoppingNullable>(initialShopping);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

  const { settingState } = useSelector((state: { settingState: settingAndUser }) => state);

  const toastActions = useToastAction();
  const { shops, fetchShopsAndSet } = useShop();
  const { shoppings, fetchShoppingsAndSet, deleteShoppingAndSet } = useShopping();

  useEffect(() => {
    fetchShoppingsAndSet();
    fetchShopsAndSet();
    Notice.pageMovedNotice(toastActions);
  }, []);

  useEffect(() => {
    setIsLineNotice(settingState.user.setting.isUseLine);
  }, [settingState]);

  return (
    <CommonWrapTemplate {...{ isLoading, toastActions }}>
      <ConfirmDeleteShoppingModal
        open={deleteModalOpen}
        handleClose={() => setDeleteModalOpen(false)}
        handleOk={async () => {
          setIsLoading(true);
          await deleteShoppingAndSet(modalShopping, isLineNotice, toastActions);
          setDeleteModalOpen(false);
          setIsLoading(false);
        }}
        isLineNotice={isLineNotice}
        modalShopping={modalShopping}
        modaltitle={'??????'}
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
            isEditShow={false}
            isDeleteShow={shopping.claimId === null}
            onClick={() => {
              setModalShopping(shopping);
              setDeleteModalOpen(true);
            }}
          >
            <div className="flex justify-between">
              <div className="left">
                <div>???????????????{formatDay(shopping.date!)}</div>
                <div>?????????{formatPriceYen(shopping.price)}</div>
                <div>?????????{ommisionText(shopping.description, 20)}</div>
              </div>
              <div className="right">
                <LineNotice
                  isLineNotice={shopping.isLineNoticed}
                  text={shopping.isLineNoticed ? '??????????????????' : '??????????????????'}
                />
              </div>
            </div>
          </ShoppingCardWrapper>
        ))}
      </div>
      <div className="mt-10 text-center">
        <BaseLinkButton pathname={page.top.link()} customType={'arrowBack'}>
          {page.top.name()}?????????
        </BaseLinkButton>
      </div>
    </CommonWrapTemplate>
  );
};

export default Shopping;
